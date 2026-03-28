import { useState } from "react";
import { Brain, Globe, Crosshair, Banknote, Clock, TrendingUp } from "lucide-react";

const features = [
  {
    label: "Profile Intelligence",
    title: "Beyond the transcript",
    description:
      "Our AI reads between the lines — understanding research interests, leadership patterns, and intellectual curiosity that grades alone cannot capture.",
    icon: Brain,
  },
  {
    label: "Global Database",
    title: "500+ institutions, mapped",
    description:
      "A living atlas of programs, professors, scholarships, and campus cultures across 40 countries — updated continuously with real admission outcomes.",
    icon: Globe,
  },
  {
    label: "Precision Matching",
    title: "Surgical fit, not guesswork",
    description:
      "Each recommendation is calibrated against thousands of historical acceptance patterns, financial aid data, and post-graduation career trajectories.",
    icon: Crosshair,
  },
  {
    label: "Scholarship Architecture",
    title: "Fund your ambition",
    description:
      "Our engine surfaces merit scholarships, government fellowships, and institutional grants you're statistically most likely to win.",
    icon: Banknote,
  },
  {
    label: "Deadline Intelligence",
    title: "Never miss a window",
    description:
      "Automated tracking of rolling admissions, early action, and scholarship cutoffs — delivered to your timeline, not a generic calendar.",
    icon: Clock,
  },
  {
    label: "Outcome Mapping",
    title: "Where alumni actually land",
    description:
      "Real career and salary data from graduates of each program, so you can evaluate long-term return on your academic investment.",
    icon: TrendingUp,
  },
];

export function Features() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="features" style={{ padding: "8rem 2rem", backgroundColor: "#F8FAFF" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>

        {/* Header */}
        <div style={{ marginBottom: "4rem", maxWidth: "560px" }}>
          <p style={{
            fontFamily: "'Inter', sans-serif", fontSize: "0.65rem",
            fontWeight: 500, letterSpacing: "0.16em",
            textTransform: "uppercase", color: "#94A3B8", marginBottom: "1.25rem",
          }}>
            Platform Capabilities
          </p>
          <h2 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(1.875rem, 3.5vw, 2.875rem)",
            fontWeight: 700, color: "#0F172A",
            lineHeight: 1.1, letterSpacing: "-0.025em", marginBottom: "1rem",
          }}>
            Engineered for the <em style={{ fontStyle: "italic", color: "#4F46E5" }}>exceptional</em>
          </h2>
          <p style={{
            fontFamily: "'Inter', sans-serif", fontSize: "0.95rem",
            fontWeight: 400, color: "#64748B", lineHeight: 1.75,
          }}>
            Every feature gives you an asymmetric advantage in a competitive global admissions landscape.
          </p>
        </div>

        {/* Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "1px",
          backgroundColor: "#E8EEF8",
          borderRadius: "16px",
          overflow: "hidden",
          border: "1px solid #E8EEF8",
        }} className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => {
            const isHov = hovered === i;
            const Icon = f.icon;
            return (
              <div
                key={i}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  padding: "2rem 1.875rem",
                  backgroundColor: isHov ? "#fff" : "#FAFBFF",
                  transition: "background 0.2s, box-shadow 0.2s",
                  cursor: "default",
                  position: "relative", overflow: "hidden",
                }}
              >
                {/* Hover glow */}
                <div style={{
                  position: "absolute", top: 0, left: 0, right: 0, height: "3px",
                  background: "linear-gradient(90deg, #4F46E5, rgba(79,70,229,0.25))",
                  opacity: isHov ? 1 : 0,
                  transition: "opacity 0.2s",
                }} />

                {/* Icon */}
                <div style={{
                  width: "40px", height: "40px", borderRadius: "10px",
                  backgroundColor: isHov ? "rgba(37,99,235,0.08)" : "rgba(37,99,235,0.06)",
                  border: `1px solid ${isHov ? "rgba(37,99,235,0.14)" : "transparent"}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  marginBottom: "1.25rem",
                  transition: "all 0.2s",
                }}>
                  <Icon size={17} color={isHov ? "#4F46E5" : "#94A3B8"} />
                </div>

                {/* Label */}
                <p style={{
                  fontFamily: "'Inter', sans-serif", fontSize: "0.62rem",
                  fontWeight: 500, letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: isHov ? "#4F46E5" : "#94A3B8",
                  marginBottom: "0.5rem",
                  transition: "color 0.2s",
                }}>
                  {f.label}
                </p>

                {/* Title */}
                <h3 style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: "1.05rem", fontWeight: 700,
                  color: isHov ? "#0F172A" : "#334155",
                  letterSpacing: "-0.015em", lineHeight: 1.3,
                  marginBottom: "0.75rem",
                  transition: "color 0.2s",
                }}>
                  {f.title}
                </h3>

                {/* Description */}
                <p style={{
                  fontFamily: "'Inter', sans-serif", fontSize: "0.84rem",
                  fontWeight: 400, color: "#64748B", lineHeight: 1.7,
                }}>
                  {f.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}