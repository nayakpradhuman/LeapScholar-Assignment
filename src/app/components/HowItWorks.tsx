import { useState, useEffect, useRef } from "react";

const steps = [
  {
    num: "01",
    tag: "Just Talk to It",
    title: "Tell Us Your Story",
    description:
      "No long forms. No confusing dropdowns. Just a friendly conversation — share your degree, dream countries, budget, and career goals in your own words.",
    stats: [
      { val: "5 min", label: "Average conversation" },
      { val: "8",     label: "Topics covered" },
    ],
  },
  {
    num: "02",
    tag: "Smart Matching",
    title: "AI Reads Your Profile",
    description:
      "The agent cross-references your story against thousands of global programs, real admit patterns, scholarship data, and cultural fit — instantly.",
    stats: [
      { val: "10K+", label: "Programs analysed" },
      { val: "50+",  label: "Countries covered" },
    ],
  },
  {
    num: "03",
    tag: "Your Results",
    title: "Your Shortlist, Delivered",
    description:
      "You get a personalised list of universities where you genuinely belong — matched to your profile and real chances of admission, not just global rankings.",
    stats: [
      { val: "91%", label: "Match accuracy" },
      { val: "3×",  label: "Faster than manual search" },
    ],
  },
];

export function HowItWorks() {
  const [active, setActive] = useState(0);
  const activeRef           = useRef(0);
  const sectionRef          = useRef<HTMLElement>(null);
  const [fading, setFading] = useState(false);

  const changeStep = (next: number) => {
    if (next === activeRef.current) return;
    setFading(true);
    setTimeout(() => {
      activeRef.current = next;
      setActive(next);
      setFading(false);
    }, 160);
  };

  useEffect(() => {
    const onScroll = () => {
      const section = sectionRef.current;
      if (!section) return;
      const rect      = section.getBoundingClientRect();
      const scrollable = section.offsetHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const progress = Math.max(0, Math.min(1, -rect.top / scrollable));
      const next     = Math.min(steps.length - 1, Math.floor(progress / (1 / steps.length)));
      changeStep(next);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const step = steps[active];

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      style={{ height: "300vh", position: "relative", backgroundColor: "#fff" }}
    >
      <div style={{
        position: "sticky", top: 0, height: "100vh",
        display: "flex", alignItems: "center",
        backgroundColor: "#fff",
      }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", width: "100%", padding: "0 2rem" }}>

          {/* Eyebrow */}
          <p style={{
            fontFamily: "'Inter', sans-serif", fontSize: "0.63rem",
            fontWeight: 500, letterSpacing: "0.16em",
            textTransform: "uppercase", color: "#94A3B8",
            marginBottom: "3.5rem",
          }}>
            How It Works
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6rem", alignItems: "center" }}
            className="grid-cols-1 lg:grid-cols-2">

            {/* ── Left: step list ── */}
            <div>
              {steps.map((s, i) => {
                const isActive = i === active;
                return (
                  <button
                    key={i}
                    onClick={() => changeStep(i)}
                    style={{
                      all: "unset", cursor: "pointer", display: "block", width: "100%",
                      padding: "1.5rem 0",
                      borderTop: "1px solid #E2E8F0",
                      ...(i === steps.length - 1 ? { borderBottom: "1px solid #E2E8F0" } : {}),
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "baseline", gap: "1.25rem" }}>
                      <span style={{
                        fontFamily: "'Inter', sans-serif", fontSize: "0.7rem",
                        fontWeight: 400, color: isActive ? "#4F46E5" : "#94A3B8",
                        letterSpacing: "0.06em", flexShrink: 0,
                        transition: "color 0.3s",
                      }}>
                        {s.num}
                      </span>
                      <div>
                        <p style={{
                          fontFamily: "'Playfair Display', Georgia, serif",
                          fontSize: isActive ? "1.5rem" : "1.1rem",
                          fontWeight: 700,
                          color: isActive ? "#0F172A" : "#94A3B8",
                          letterSpacing: "-0.02em", lineHeight: 1.2,
                          margin: 0,
                          transition: "all 0.3s ease",
                        }}>
                          {s.title}
                        </p>
                        {isActive && (
                          <p style={{
                            fontFamily: "'Inter', sans-serif", fontSize: "0.7rem",
                            fontWeight: 400, color: "#94A3B8",
                            marginTop: "0.25rem", marginBottom: 0,
                            letterSpacing: "0.04em",
                            animation: "hw-fade 0.3s ease",
                          }}>
                            {s.tag}
                          </p>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}

              {/* Progress */}
              <div style={{ display: "flex", gap: "5px", marginTop: "2rem" }}>
                {steps.map((_, i) => (
                  <div key={i} style={{
                    height: "2px",
                    width: i === active ? "24px" : "8px",
                    borderRadius: "100px",
                    backgroundColor: i === active ? "#4F46E5" : "#E2E8F0",
                    transition: "all 0.4s cubic-bezier(.22,1,.36,1)",
                  }} />
                ))}
              </div>
            </div>

            {/* ── Right: content ── */}
            <div style={{
              opacity: fading ? 0 : 1,
              transform: fading ? "translateY(10px)" : "translateY(0)",
              transition: "opacity 0.16s ease, transform 0.16s ease",
            }}>
              <h2 style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "clamp(2rem, 3.5vw, 2.75rem)",
                fontWeight: 700, color: "#0F172A",
                letterSpacing: "-0.025em", lineHeight: 1.15,
                marginBottom: "1.25rem", marginTop: 0,
              }}>
                {step.title}
              </h2>

              <p style={{
                fontFamily: "'Inter', sans-serif", fontSize: "1rem",
                fontWeight: 400, color: "#64748B", lineHeight: 1.8,
                marginBottom: "2.5rem", marginTop: 0, maxWidth: "400px",
              }}>
                {step.description}
              </p>

              {/* Two simple stats — no boxes, just text */}
              <div style={{ display: "flex", gap: "2.5rem" }}>
                {step.stats.map((s, i) => (
                  <div key={i}>
                    <p style={{
                      fontFamily: "'Playfair Display', Georgia, serif",
                      fontSize: "2rem", fontWeight: 700,
                      color: "#4F46E5", letterSpacing: "-0.03em",
                      margin: 0, lineHeight: 1,
                    }}>
                      {s.val}
                    </p>
                    <p style={{
                      fontFamily: "'Inter', sans-serif", fontSize: "0.72rem",
                      fontWeight: 400, color: "#94A3B8",
                      marginTop: "0.3rem", marginBottom: 0,
                    }}>
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

      <style>{`
        @keyframes hw-fade { from { opacity: 0; } to { opacity: 1; } }
      `}</style>
    </section>
  );
}