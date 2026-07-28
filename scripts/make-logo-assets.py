"""Build every logo asset the site uses from one brand image.

    python3 scripts/make-logo-assets.py path/to/brand-logo.png

The source is the flat brand file (navy artwork on a white background). This
script turns the white into transparency, keeps the enclosed white shapes (the
house, the sparkles) solid, and writes:

    public/logo/bcn-logo.png         lockup, for light backgrounds
    public/logo/bcn-logo-white.png   lockup, mono cut-out for dark backgrounds
    public/logo/bcn-mark.png         droplet only
    public/logo/bcn-mark-white.png   droplet only, mono
    src/app/icon.png                 favicon
    src/app/apple-icon.png           touch icon
    src/lib/logo-mark.ts             the mark inlined for the OG card

Needs pillow, numpy and scipy: pip3 install pillow numpy scipy
"""
import glob, os, sys
import numpy as np
from PIL import Image
from scipy import ndimage

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DEFAULT_SRC = sorted(glob.glob(os.path.join(ROOT, '..', 'Screenshot*.png')))
SRC = sys.argv[1] if len(sys.argv) > 1 else DEFAULT_SRC[-1]
print('source', SRC)
OUT = os.path.join(ROOT, 'public/logo')
APP = os.path.join(ROOT, 'src/app')
os.makedirs(OUT, exist_ok=True)

rgb = np.asarray(Image.open(SRC).convert('RGB')).astype(np.float64)

# white -> alpha, un-premultiplied so the navy keeps its saturation on edges
a = np.clip(255.0 - rgb.min(axis=2), 0, 255)
color = np.clip((rgb - (255.0 - a[..., None])) * (255.0 / np.maximum(a, 1e-6)[..., None]), 0, 255)
knock = Image.fromarray(np.dstack([color, a]).astype(np.uint8), 'RGBA')

bbox = knock.getbbox()
knock = knock.crop(bbox)
rgb_c = rgb[bbox[1]:bbox[3], bbox[0]:bbox[2]]
al = np.asarray(knock)[..., 3]

# holes = transparent pixels that are not connected to the border
transparent = al < 128
lab, n = ndimage.label(transparent)
border = set(lab[0].tolist()) | set(lab[-1].tolist()) | set(lab[:, 0].tolist()) | set(lab[:, -1].tolist())
border.discard(0)
holes = transparent & ~np.isin(lab, list(border))
print('components', n, 'hole px', int(holes.sum()))

def clean(alpha, cut):
    """Drop the screenshot's off-white cast, which reads as a grey box on tinted
    backgrounds, and rescale so the artwork keeps its edges."""
    return np.clip((alpha.astype(np.float64) - cut) * (255.0 / (255.0 - cut)), 0, 255).astype(np.uint8)


# solid version: holes painted back in with their original (white) pixels
solid = np.asarray(knock).astype(np.uint8).copy()
solid[..., 3] = clean(solid[..., 3], 14)
solid[..., :3][holes] = rgb_c[holes].astype(np.uint8)
solid[..., 3][holes] = 255
solid_img = Image.fromarray(solid, 'RGBA')

# mono white version: same silhouette, holes left transparent
white = np.dstack([np.full(al.shape + (3,), 255, np.uint8), clean(al, 32)]).astype(np.uint8)
white_img = Image.fromarray(white, 'RGBA')


def save(img, name, width=None, height=None):
    out = img
    if width and out.width != width:
        out = out.resize((width, max(1, round(out.height * width / out.width))), Image.LANCZOS)
    if height and out.height != height:
        out = out.resize((max(1, round(out.width * height / out.height)), height), Image.LANCZOS)
    out.save(os.path.join(OUT, name), optimize=True)
    print(name, out.size, os.path.getsize(os.path.join(OUT, name)) // 1024, 'KB')
    return out


full = save(solid_img, 'bcn-logo.png', width=1000)
save(white_img, 'bcn-logo-white.png', width=1000)

# --- the droplet mark on its own ---
on = al.max(axis=0) > 20
runs, start = [], None
for x, v in enumerate(on):
    if v and start is None:
        start = x
    if not v and start is not None:
        runs.append((start, x - 1)); start = None
if start is not None:
    runs.append((start, len(on) - 1))
m0, m1 = [r for r in runs if r[1] - r[0] > 3][0]


def square(img, size, pad=0.06, bg=None):
    m = img.crop((m0, 0, m1 + 1, img.height))
    m = m.crop(m.getbbox())
    side = round(max(m.size) * (1 + pad * 2))
    canvas = Image.new('RGBA', (side, side), bg or (0, 0, 0, 0))
    canvas.paste(m, ((side - m.width) // 2, (side - m.height) // 2), m)
    return canvas.resize((size, size), Image.LANCZOS)


mark = square(solid_img, 512)
mark.save(os.path.join(OUT, 'bcn-mark.png'), optimize=True)
square(white_img, 512).save(os.path.join(OUT, 'bcn-mark-white.png'), optimize=True)
print('bcn-mark.png / bcn-mark-white.png 512')

# favicon + apple touch icon
square(solid_img, 256, pad=0.10).save(os.path.join(APP, 'icon.png'), optimize=True)
square(solid_img, 180, pad=0.12, bg=(255, 255, 255, 255)).save(os.path.join(APP, 'apple-icon.png'), optimize=True)
print('app icons written')

# base64 of a small white mark, for the OG card (Satori has no filesystem)
small = square(white_img, 128)
import io, base64
buf = io.BytesIO(); small.save(buf, 'PNG', optimize=True)
b64 = base64.b64encode(buf.getvalue()).decode()
with open(os.path.join(ROOT, 'src/lib/logo-mark.ts'), 'w') as f:
    f.write('/**\n * The droplet mark as a data URI.\n *\n * The OG card is rendered by Satori, which has no filesystem and no access to\n * `/public`, so the mark has to travel with the code. Regenerated by\n * `scripts/make-logo-assets.py` — do not edit by hand.\n */\nexport const markDataUri =\n  "data:image/png;base64,' + b64 + '";\n')
print('logo-mark.ts', len(b64) // 1024, 'KB base64')
