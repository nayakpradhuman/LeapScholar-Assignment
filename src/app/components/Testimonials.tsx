import { useState, useEffect } from "react";
import { ArrowRight, ArrowLeft } from "lucide-react";
import imgPriya from "../../assets/cf36fbf68f90ca462bd94e8e8f08cf9410cf5d49.png";
import imgRahul from "../../assets/504ab95e90b01482ca411757191b7ae1c4a08bf4.png";
import imgAnanya from "../../assets/58d3517d79e8b7536bbb138ad12aee379503f9dc.png";

const testimonials = [
  {
    quote:
      "LeapAI didn't just give me a list — it explained precisely why each university fit my research interests in HCI. I got into my first choice at Purdue, fully funded.",
    name: "Priya Sharma",
    detail: "MS HCI · Purdue University",
    badge: "₹0 tuition",
    badgeColor: "#16A34A",
    badgeBg: "#F0FDF4",
    program: "Master of Science",
    field: "Human-Computer Interaction",
    avatar: imgPriya,
    country: "🇺🇸 United States",
    uni: "Purdue University",
    accentColor: "#2563EB",
  },
  {
    quote:
      "I wasn't considering Canada at all. The AI saw patterns in my work experience and suggested UToronto MBA. Best decision of my life. I start in September.",
    name: "Rahul Menon",
    detail: "MBA · University of Toronto",
    badge: "Class of 2026",
    badgeColor: "#7C3AED",
    badgeBg: "#F5F3FF",
    program: "Master of Business Administration",
    field: "Business & Strategy",
    avatar: imgRahul,
    country: "🇨🇦 Canada",
    uni: "University of Toronto",
    accentColor: "#4F46E5",
  },
  {
    quote:
      "My GRE wasn't strong. But LeapAI surfaced TU Munich — tuition-free, world-class, and a perfect research match. I never would have found it on my own.",
    name: "Ananya Iyer",
    detail: "MSc Data Science · TU Munich",
    badge: "Tuition-free",
    badgeColor: "#0EA5E9",
    badgeBg: "#F0F9FF",
    program: "Master of Science",
    field: "Data Science & AI",
    avatar: imgAnanya,
    country: "🇩🇪 Germany",
    uni: "TU Munich",
    accentColor: "#0EA5E9",
  },
];

export function Testimonials() {
  const [active, setActive] = useState(0);
  const [fading, setFading] = useState(false);
  const [dir, setDir] = useState<1 | -1>(1);

  const go = (i: number, direction: 1 | -1 = 1) => {
    if (i === active) return;
    setDir(direction);
    setFading(true);
    setTimeout(() => { setActive(i); setFading(false); }, 260);
  };

  const prev = () => go((active - 1 + testimonials.length) % testimonials.length, -1);
  const next = () => go((active + 1) % testimonials.length, 1);

  // Auto-advance
  useEffect(() => {
    const id = setInterval(() => next(), 5500);
    return () => clearInterval(id);
  }, [active]);

  const t = testimonials[active];

  return (
    <section id="testimonials" style={{ padding: "8rem 2rem", backgroundColor: "#F8FAFF" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "3.5rem", flexWrap: "wrap", gap: "1.5rem" }}>
          <div>
            <p style={{
              fontFamily: "'Inter', sans-serif", fontSize: "0.65rem",
              fontWeight: 500, letterSpacing: "0.16em",
              textTransform: "uppercase", color: "#94A3B8", marginBottom: "1rem",
            }}>
              The Archive
            </p>
            <h2 style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(1.875rem, 3.5vw, 2.75rem)",
              fontWeight: 700, color: "#0F172A",
              lineHeight: 1.1, letterSpacing: "-0.025em",
            }}>
              Stories of <em style={{ fontStyle: "italic", color: "#4F46E5" }}>deliberate ambition</em>
            </h2>
          </div>

          {/* Nav arrows */}
          <div style={{ display: "flex", gap: "0.625rem" }}>
            {[{ fn: prev, Icon: ArrowLeft }, { fn: next, Icon: ArrowRight }].map(({ fn, Icon }, i) => (
              <button key={i} onClick={fn} style={{
                all: "unset", cursor: "pointer",
                width: "42px", height: "42px", borderRadius: "50%",
                border: "1px solid #E2E8F0",
                backgroundColor: "#fff",
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "all 0.2s",
                boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
              }} className="hover:border-[#4F46E5] hover:bg-[#EEF2FF]">
                <Icon size={15} color="#64748B" />
              </button>
            ))}
          </div>
        </div>

        {/* Main panel */}
        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "2rem", alignItems: "stretch" }}
          className="grid-cols-1 lg:grid-cols-[1.2fr_1fr]">

          {/* ── Featured quote card ── */}
          <div style={{
            backgroundColor: "#fff",
            border: `1px solid ${t.accentColor}18`,
            borderRadius: "20px", overflow: "hidden",
            boxShadow: `0 8px 40px ${t.accentColor}0C`,
            display: "flex", flexDirection: "column",
            opacity: fading ? 0 : 1,
            transform: fading ? `translateX(${dir * 14}px)` : "translateX(0)",
            transition: "opacity 0.26s ease, transform 0.26s ease, border-color 0.4s",
          }}>
            {/* Top accent strip */}
            <div style={{
              height: "3px",
              background: `linear-gradient(90deg, ${t.accentColor}, ${t.accentColor}40)`,
            }} />

            <div style={{ flex: 1, padding: "2.25rem 2.25rem 2rem" }}>
              {/* Quote mark */}
              <div style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "5rem", lineHeight: 0.7,
                color: t.accentColor, opacity: 0.12,
                marginBottom: "1.25rem",
                userSelect: "none",
              }}>
                "
              </div>

              {/* Quote */}
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "1rem", fontWeight: 400,
                color: "#334155", lineHeight: 1.8,
                marginBottom: "2rem",
              }}>
                {t.quote}
              </p>

              {/* Author */}
              <div style={{ display: "flex", alignItems: "center", gap: "0.875rem" }}>
                <img src={t.avatar} alt={t.name} style={{
                  width: "48px", height: "48px", borderRadius: "50%",
                  objectFit: "cover",
                  border: `2px solid ${t.accentColor}22`,
                  flexShrink: 0,
                }} />
                <div style={{ flex: 1 }}>
                  <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.875rem", fontWeight: 500, color: "#0F172A" }}>
                    {t.name}
                  </p>
                  <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.72rem", fontWeight: 400, color: "#94A3B8" }}>
                    {t.detail}
                  </p>
                </div>
                <span style={{
                  fontFamily: "'Inter',sans-serif", fontSize: "0.68rem",
                  fontWeight: 500, color: t.badgeColor,
                  backgroundColor: t.badgeBg,
                  border: `1px solid ${t.badgeColor}22`,
                  borderRadius: "100px", padding: "0.3rem 0.75rem",
                  whiteSpace: "nowrap",
                }}>
                  {t.badge}
                </span>
              </div>
            </div>

            {/* Stats row */}
            <div style={{
              padding: "1.25rem 2.25rem 1.5rem",
              borderTop: "1px solid #F1F5F9",
              display: "flex", gap: "1.5rem", flexWrap: "wrap",
            }}>
              {[
                { label: "Country", val: t.country },
                { label: "University", val: t.uni },
                { label: "Program", val: t.program },
              ].map((s, i) => (
                <div key={i}>
                  <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.62rem", fontWeight: 400, color: "#94A3B8", marginBottom: "2px", letterSpacing: "0.06em", textTransform: "uppercase" }}>{s.label}</p>
                  <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.78rem", fontWeight: 500, color: "#334155" }}>{s.val}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Selector cards ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {testimonials.map((item, i) => {
              const isActive = i === active;
              return (
                <button
                  key={i}
                  onClick={() => go(i, i > active ? 1 : -1)}
                  style={{
                    all: "unset", cursor: "pointer",
                    padding: "1.25rem 1.5rem",
                    borderRadius: "14px",
                    border: `1px solid ${isActive ? item.accentColor + "28" : "#F1F5F9"}`,
                    backgroundColor: isActive ? "#fff" : "#FAFBFF",
                    display: "flex", gap: "1rem", alignItems: "center",
                    transition: "all 0.25s cubic-bezier(.22,1,.36,1)",
                    boxShadow: isActive ? `0 4px 20px ${item.accentColor}10` : "none",
                    position: "relative", overflow: "hidden",
                    textAlign: "left",
                  }}
                >
                  {/* Active indicator bar */}
                  <div style={{
                    position: "absolute", left: 0, top: "20%", bottom: "20%",
                    width: "3px", borderRadius: "100px",
                    backgroundColor: item.accentColor,
                    opacity: isActive ? 1 : 0,
                    transition: "opacity 0.25s",
                  }} />

                  <img src={item.avatar} alt={item.name} style={{
                    width: "40px", height: "40px", borderRadius: "50%",
                    objectFit: "cover", flexShrink: 0,
                    border: `2px solid ${isActive ? item.accentColor + "30" : "transparent"}`,
                    transition: "border-color 0.25s",
                  }} />

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{
                      fontFamily: "'Inter',sans-serif", fontSize: "0.82rem",
                      fontWeight: 500,
                      color: isActive ? "#0F172A" : "#94A3B8",
                      marginBottom: "2px",
                      transition: "color 0.25s",
                    }}>
                      {item.name}
                    </p>
                    <p style={{
                      fontFamily: "'Inter',sans-serif", fontSize: "0.7rem",
                      fontWeight: 400,
                      color: isActive ? "#64748B" : "#CBD5E1",
                      whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                      transition: "color 0.25s",
                    }}>
                      {item.field} · {item.country}
                    </p>
                  </div>

                  {isActive && (
                    <span style={{
                      fontFamily: "'Inter',sans-serif", fontSize: "0.64rem",
                      fontWeight: 500, color: item.accentColor,
                      backgroundColor: item.accentColor + "10",
                      borderRadius: "100px", padding: "0.25rem 0.6rem",
                      flexShrink: 0, animation: "arch-fade 0.3s ease",
                    }}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}

            {/* Progress indicator */}
            <div style={{ padding: "0.5rem 0.5rem 0", display: "flex", gap: "5px" }}>
              {testimonials.map((item, i) => (
                <button key={i} onClick={() => go(i, i > active ? 1 : -1)} style={{
                  all: "unset", cursor: "pointer",
                  height: "3px", flex: i === active ? 2 : 1,
                  borderRadius: "100px",
                  backgroundColor: i === active ? t.accentColor : "#E2E8F0",
                  transition: "all 0.4s cubic-bezier(.22,1,.36,1)",
                }} />
              ))}
            </div>

            {/* CTA */}
            <a href="#" style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              gap: "0.5rem", marginTop: "auto",
              padding: "0.875rem 1.5rem",
              borderRadius: "12px",
              border: "1px solid #E2E8F0",
              backgroundColor: "#fff",
              fontFamily: "'Inter',sans-serif", fontSize: "0.8rem",
              fontWeight: 500, color: "#334155",
              textDecoration: "none",
              transition: "all 0.2s",
              boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
            }} className="hover:border-[#4F46E5] hover:text-[#4F46E5] hover:bg-[#EEF2FF]">
              Read all success stories <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes arch-fade { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
      `}</style>
    </section>
  );
}