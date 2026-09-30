import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { RegistryBar } from "@/components/RegistryBar";
import { InteractiveStudio } from "@/components/InteractiveStudio";
import { Capabilities } from "@/components/Capabilities";
import { Architecture } from "@/components/Architecture";
import { Benchmark } from "@/components/Benchmark";
import { Quickstart } from "@/components/Quickstart";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-canvas-base text-ink">
      <Navbar />
      <Hero />
      <RegistryBar />
      <InteractiveStudio />
      <Capabilities />
      <Architecture />
      <Benchmark />
      <Quickstart />
      <Footer />
    </main>
  );
}
