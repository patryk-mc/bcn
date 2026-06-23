import { Hero } from "@/components/home/Hero";
import { TrustStrip } from "@/components/home/TrustStrip";
import { ServicesOverview } from "@/components/home/ServicesOverview";
import { MissionValues } from "@/components/home/MissionValues";
import { VideoShowreel } from "@/components/home/VideoShowreel";
import { ProcessPreview } from "@/components/home/ProcessPreview";
import { TeamPreview } from "@/components/home/TeamPreview";
import { Testimonials } from "@/components/home/Testimonials";
import { BlogPreview } from "@/components/home/BlogPreview";
import { FinalCTA } from "@/components/home/FinalCTA";
import { FAQ } from "@/components/home/FAQ";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <ServicesOverview />
      <MissionValues />
      <VideoShowreel />
      <ProcessPreview />
      <TeamPreview />
      <Testimonials />
      <BlogPreview />
      <FinalCTA />
      <FAQ />
    </>
  );
}
