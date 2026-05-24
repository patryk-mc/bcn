import "server-only";
import fs from "node:fs";
import path from "node:path";

/**
 * Auto-detects a team member portrait in /public/team/.
 *
 * Drop a file at `public/team/<slug>.{jpg,jpeg,png,webp,avif}` (the slug
 * matches the team entry in src/lib/site.ts) and it shows up automatically.
 * No code change needed.
 *
 * If no file is found, the card falls back to the stylised gradient
 * monogram already coded in TeamPreview / About page.
 */
const TEAM_DIR = path.join(process.cwd(), "public", "team");
const EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp", ".avif"] as const;

export function getTeamPhoto(slug: string): string | null {
  if (!fs.existsSync(TEAM_DIR)) return null;
  for (const ext of EXTENSIONS) {
    const file = path.join(TEAM_DIR, `${slug}${ext}`);
    if (fs.existsSync(file)) {
      return `/team/${slug}${ext}`;
    }
  }
  return null;
}

export function teamWithPhotos<T extends { slug: string }>(
  team: readonly T[]
): Array<T & { photo: string | null }> {
  return team.map((m) => ({ ...m, photo: getTeamPhoto(m.slug) }));
}
