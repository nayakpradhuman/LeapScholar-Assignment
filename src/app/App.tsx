import { useState } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { LogoBar } from "./components/LogoBar";
import { HowItWorks } from "./components/HowItWorks";
import { Features } from "./components/Features";
import { Stats } from "./components/Stats";
import { Universities } from "./components/Universities";
import { Testimonials } from "./components/Testimonials";
import { ProfileEvalCTA } from "./components/ProfileEvalCTA";
import { Footer } from "./components/Footer";
import { FloatingCTA } from "./components/FloatingCTA";
import { ProfileEvalModal } from "./components/ProfileEvalModal";

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div
      style={{
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
        backgroundColor: "#fff",
        color: "#0F172A",
        overflowX: "clip",
        scrollBehavior: "smooth",
      }}
    >
      <Navbar onOpenModal={() => setModalOpen(true)} />
      <Hero onOpenModal={() => setModalOpen(true)} />
      <LogoBar />
      <HowItWorks />
      <Stats />
      <Features />
      <Universities />
      <Testimonials />
      <ProfileEvalCTA onOpenModal={() => setModalOpen(true)} />
      <Footer />
      <FloatingCTA onOpenModal={() => setModalOpen(true)} />

      {modalOpen && <ProfileEvalModal onClose={() => setModalOpen(false)} />}
    </div>
  );
}
