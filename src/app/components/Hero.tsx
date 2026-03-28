import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { AIAgentScreen } from "./AIAgentScreen";

export function Hero({ onOpenModal }: { onOpenModal: () => void }) {
  const [show, setShow] = useState(false);
  const glowRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 120);
    return () => clearTimeout(t);
  }, []);

  // Subtle mouse-tracking glow
  useEffect(() => {
    const section = sectionRef.current;
    const glow = glowRef.current;
    if (!section || !glow) return;

    const onMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      glow.style.left = `${x}px`;
      glow.style.top = `${y}px`;
      glow.style.opacity = "1";
    };
    const onLeave = () => { glow.style.opacity = "0"; };

    section.addEventListener("mousemove", onMove);
    section.addEventListener("mouseleave", onLeave);
    return () => {
      section.removeEventListener("mousemove", onMove);
      section.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        minHeight: "100vh",
        display: "flex", flexDirection: "column",
        justifyContent: "center", alignItems: "center",
        padding: "8rem 2rem 5rem",
        background: "#F8FAFF",
        position: "relative", overflow: "hidden",
      }}
    >
      {/* Subtle grid */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "linear-gradient(rgba(37,99,235,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.035) 1px, transparent 1px)",
        backgroundSize: "64px 64px", pointerEvents: "none",
      }} />

      {/* Mouse-tracking glow — very subtle */}
      <div
        ref={glowRef}
        style={{
          position: "absolute",
          width: "600px", height: "600px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(37,99,235,0.07) 0%, rgba(99,102,241,0.04) 40%, transparent 70%)",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
          opacity: 0,
          transition: "opacity 0.6s ease, left 0.08s linear, top 0.08s linear",
          zIndex: 0,
        }}
      />

      {/* Static ambient blobs */}
      <div style={{
        position: "absolute", top: "8%", right: "12%",
        width: "420px", height: "420px",
        background: "radial-gradient(ellipse, rgba(37,99,235,0.06) 0%, transparent 68%)",
        borderRadius: "50%", pointerEvents: "none",
        animation: "hero-breathe 6s ease-in-out infinite",
      }} />
      <div style={{
        position: "absolute", bottom: "10%", left: "6%",
        width: "300px", height: "300px",
        background: "radial-gradient(ellipse, rgba(99,102,241,0.05) 0%, transparent 68%)",
        borderRadius: "50%", pointerEvents: "none",
        animation: "hero-breathe 8s ease-in-out 2s infinite",
      }} />

      <div style={{ maxWidth: "1200px", width: "100%", margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "4rem", alignItems: "center" }}
          className="grid-cols-1 lg:grid-cols-[1fr_auto]"
        >
          {/* ── Left ── */}
          <div style={{ maxWidth: "560px" }}>
            {/* Eyebrow pill */}
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "0.5rem",
              backgroundColor: "rgba(37,99,235,0.07)", border: "1px solid rgba(37,99,235,0.13)",
              borderRadius: "100px", padding: "0.3rem 0.875rem", marginBottom: "1.75rem",
              opacity: show ? 1 : 0, transform: show ? "none" : "translateY(8px)",
              transition: "opacity 0.6s ease, transform 0.6s ease",
            }}>
              <span style={{
                width: "5px", height: "5px", borderRadius: "50%",
                backgroundColor: "#4F46E5", display: "inline-block",
                animation: "hero-dot-pulse 2.5s ease-in-out infinite",
              }} />
              <p style={{
                fontFamily: "'Inter', sans-serif", fontSize: "0.67rem",
                fontWeight: 500, letterSpacing: "0.12em",
                textTransform: "uppercase", color: "#4F46E5",
              }}>
                Evolution of Guidance
              </p>
            </div>

            {/* Headline — medium weight */}
            <h1 style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(2.6rem, 5.5vw, 4.5rem)",
              fontWeight: 700, lineHeight: 1.08,
              color: "#0F172A", letterSpacing: "-0.025em",
              marginBottom: "1.5rem",
              opacity: show ? 1 : 0, transform: show ? "none" : "translateY(18px)",
              transition: "opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s",
            }}>
              The New{" "}
              <em style={{ fontStyle: "italic", color: "#4F46E5" }}>Intelligence</em>
              {" "}of Ambition
            </h1>

            {/* Subtext — regular */}
            <p style={{
              fontFamily: "'Inter', sans-serif", fontSize: "1rem",
              fontWeight: 400, color: "#64748B", lineHeight: 1.8,
              maxWidth: "440px", marginBottom: "2.5rem",
              opacity: show ? 1 : 0, transform: show ? "none" : "translateY(18px)",
              transition: "opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s",
            }}>
              Our AI Architect deciphers your potential through sophisticated conversation — turning ambition into a precise, funded university shortlist.
            </p>

            {/* CTAs */}
            <div style={{
              display: "flex", alignItems: "center", gap: "1.25rem", flexWrap: "wrap",
              marginBottom: "2.75rem",
              opacity: show ? 1 : 0, transform: show ? "none" : "translateY(18px)",
              transition: "opacity 0.7s ease 0.3s, transform 0.7s ease 0.3s",
            }}>
              <button
                onClick={onOpenModal}
                style={{
                  display: "inline-flex", alignItems: "center", gap: "0.5rem",
                  backgroundColor: "#4F46E5", color: "#fff",
                  fontFamily: "'Inter', sans-serif", fontSize: "0.8rem",
                  fontWeight: 500, letterSpacing: "0.05em", textTransform: "uppercase",
                  padding: "0.875rem 1.75rem", borderRadius: "8px",
                  border: "none", cursor: "pointer",
                  boxShadow: "0 4px 20px rgba(37,99,235,0.28)",
                  transition: "all 0.2s cubic-bezier(.22,1,.36,1)",
                }}
                className="hover:bg-[#4338CA] hover:-translate-y-0.5 hover:shadow-indigo-300/40"
              >
                Analyse My Profile
              </button>
              <a href="#how-it-works" style={{
                display: "inline-flex", alignItems: "center", gap: "0.4rem",
                color: "#475569", fontFamily: "'Inter', sans-serif",
                fontSize: "0.82rem", fontWeight: 400, textDecoration: "none",
                transition: "color 0.15s",
              }} className="hover:text-[#4F46E5]">
                Explore the Archive <ArrowRight size={14} />
              </a>
            </div>

            {/* Trust indicators */}
            <div style={{
              display: "flex", gap: "1.75rem", flexWrap: "wrap",
              opacity: show ? 1 : 0,
              transition: "opacity 0.7s ease 0.5s",
            }}>
              {[
                { num: "50K+", label: "Students guided" },
                { num: "500+", label: "Global universities" },
                { num: "94%", label: "Admit rate" },
              ].map((s, i) => (
                <div key={i} style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                  <span style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: "1.4rem", fontWeight: 700,
                    color: "#1E40AF", letterSpacing: "-0.02em",
                  }}>
                    {s.num}
                  </span>
                  <span style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.72rem", fontWeight: 400, color: "#94A3B8",
                  }}>
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: AI Agent ── */}
          <div className="hidden lg:block" style={{ position: "relative" }}>
            {/* Soft glow behind white card */}
            <div style={{
              position: "absolute", top: "50%", left: "50%",
              transform: "translate(-50%,-50%)",
              width: "440px", height: "440px",
              background: "radial-gradient(ellipse, rgba(37,99,235,0.07) 0%, rgba(99,102,241,0.04) 40%, transparent 68%)",
              borderRadius: "50%", pointerEvents: "none",
              animation: "hero-breathe 5s ease-in-out infinite",
            }} />

            {/* Live badge */}
            <div style={{
              position: "absolute", top: "-18px", left: "50%",
              transform: "translateX(-50%)",
              display: "flex", alignItems: "center", gap: "0.45rem",
              backgroundColor: "#fff", border: "1px solid #E2E8F0",
              borderRadius: "100px", padding: "0.3rem 0.875rem",
              boxShadow: "0 2px 10px rgba(0,0,0,0.07)",
              whiteSpace: "nowrap", zIndex: 10,
              animation: "hero-float 3.5s ease-in-out 0.5s infinite",
            }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#22C55E", display: "inline-block", boxShadow: "0 0 5px #22C55E" }} />
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.66rem", fontWeight: 500, color: "#374151" }}>Live</span>
            </div>

            {/* Match badge */}
            <div style={{
              position: "absolute", top: "22%", right: "-22px", zIndex: 10,
              animation: "hero-float-r 3s ease-in-out 1s infinite",
            }}>
              <div style={{
                backgroundColor: "#fff", border: "1px solid #DBEAFE",
                borderRadius: "10px", padding: "0.45rem 0.75rem",
                boxShadow: "0 4px 14px rgba(37,99,235,0.12)",
                display: "flex", alignItems: "center", gap: "0.4rem",
              }}>
                <span style={{ width: "7px", height: "7px", borderRadius: "50%", backgroundColor: "#4F46E5", display: "inline-block" }} />
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.64rem", fontWeight: 500, color: "#4338CA" }}>94% Match</span>
              </div>
            </div>

            {/* Funded badge */}
            <div style={{
              position: "absolute", bottom: "26%", right: "-26px", zIndex: 10,
              animation: "hero-float-r 3.4s ease-in-out 0.3s infinite",
            }}>
              <div style={{
                backgroundColor: "#fff", border: "1px solid #D1FAE5",
                borderRadius: "10px", padding: "0.45rem 0.75rem",
                boxShadow: "0 4px 14px rgba(16,185,129,0.1)",
                display: "flex", alignItems: "center", gap: "0.4rem",
              }}>
                <span style={{ fontSize: "0.72rem" }}>🎓</span>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.64rem", fontWeight: 500, color: "#065F46" }}>Funded Admits</span>
              </div>
            </div>

            <AIAgentScreen />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes hero-dot-pulse {
          0%,100% { opacity: 1; transform: scale(1); }
          50%      { opacity: 0.5; transform: scale(0.8); }
        }
        @keyframes hero-breathe {
          0%,100% { transform: scale(1); opacity: 0.8; }
          50%      { transform: scale(1.08); opacity: 1; }
        }
        @keyframes hero-float {
          0%,100% { transform: translateX(-50%) translateY(0); }
          50%      { transform: translateX(-50%) translateY(-5px); }
        }
        @keyframes hero-float-r {
          0%,100% { transform: translateY(0); }
          50%      { transform: translateY(-6px); }
        }
      `}</style>
    </section>
  );
}