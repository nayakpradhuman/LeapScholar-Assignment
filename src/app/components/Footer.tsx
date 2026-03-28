import { useState } from "react";
import { ArrowRight, Twitter, Linkedin, Youtube, Instagram } from "lucide-react";
import { LeapLogoIcon } from "./LeapLogoIcon";

const NAV = [
  {
    heading: "Platform",
    links: ["AI Profile Evaluation", "University Matching", "Scholarship Search", "Visa Guidance"],
  },
  {
    heading: "Destinations",
    links: ["Study in USA", "Study in UK", "Study in Canada", "Study in Germany"],
  },
  {
    heading: "Company",
    links: ["Our Philosophy", "Counsellors", "Press & Media", "Careers"],
  },
  {
    heading: "Legal",
    links: ["Privacy Policy", "Terms of Use", "Cookie Policy", "Security"],
  },
];

const SOCIALS = [
  { Icon: Twitter, label: "Twitter" },
  { Icon: Linkedin, label: "LinkedIn" },
  { Icon: Youtube, label: "YouTube" },
  { Icon: Instagram, label: "Instagram" },
];

export function Footer() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setSent(true);
    setTimeout(() => setSent(false), 3000);
    setEmail("");
  }

  return (
    <footer
      style={{
        backgroundColor: "#fff",
        color: "#0F172A",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* ── Ambient background glows ── */}
      <div aria-hidden style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
      }}>
        {/* Left indigo glow */}
        <div style={{
          position: "absolute",
          top: "-80px", left: "-120px",
          width: "600px", height: "600px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(79,70,229,0.07) 0%, transparent 70%)",
          filter: "blur(1px)",
        }} />
        {/* Right subtle blue glow */}
        <div style={{
          position: "absolute",
          bottom: "0", right: "-100px",
          width: "500px", height: "400px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(37,99,235,0.05) 0%, transparent 70%)",
        }} />
        {/* Faint grid overlay */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `
            linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }} />
      </div>

      {/* ── Hero CTA band ── */}
      

      {/* ── Navigation grid ── */}
      <div
        style={{
          position: "relative", zIndex: 1,
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "4rem 2rem",
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "2rem",
        }}
        className="!grid-cols-2 md:!grid-cols-4"
      >
        {NAV.map(({ heading, links }) => (
          <div key={heading}>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.6rem", fontWeight: 700,
              letterSpacing: "0.16em", textTransform: "uppercase",
              color: "#94A3B8",
              marginBottom: "1.25rem",
            }}>
              {heading}
            </p>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {links.map(link => (
                <li key={link}>
                  <a
                    href="#"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.825rem",
                      color: "#64748B",
                      textDecoration: "none",
                      transition: "color 0.18s",
                      display: "inline-block",
                    }}
                    className="hover:!text-[#0F172A]"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* ── Bottom bar ── */}
      <div
        style={{
          position: "relative", zIndex: 1,
          borderTop: "1px solid #E2E8F0",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "1.75rem 2rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1.25rem",
          }}
        >
          {/* Left – brand */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
            <LeapLogoIcon size={24} />
            <span style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.78rem", fontWeight: 600,
              color: "#475569",
              letterSpacing: "-0.01em",
            }}>
              LeapScholar
            </span>
            <span style={{
              width: "3px", height: "3px", borderRadius: "50%",
              backgroundColor: "#CBD5E1",
              display: "inline-block",
              margin: "0 0.25rem",
            }} />
            <span style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.72rem",
              color: "#94A3B8",
            }}>
              © 2026 LeapScholar Technologies
            </span>
          </div>

          {/* Center – legal links */}
          <div
            style={{
              display: "flex", alignItems: "center", gap: "1.5rem",
              flexWrap: "wrap",
            }}
            className="hidden md:flex"
          >
            {["Privacy", "Terms", "Cookies"].map(label => (
              <a
                key={label}
                href="#"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.72rem",
                  color: "#94A3B8",
                  textDecoration: "none",
                  transition: "color 0.15s",
                }}
                className="hover:!text-[#475569]"
              >
                {label}
              </a>
            ))}
          </div>

          {/* Right – socials */}
          <div style={{ display: "flex", gap: "0.5rem" }}>
            {SOCIALS.map(({ Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                style={{
                  width: "34px", height: "34px",
                  borderRadius: "9px",
                  border: "1px solid #E2E8F0",
                  backgroundColor: "#F8FAFC",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "all 0.18s",
                }}
                className="hover:!border-indigo-200 hover:!bg-indigo-50"
              >
                <Icon size={13} color="#94A3B8" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ── Oversized watermark ── */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          bottom: "-20px",
          left: "50%",
          transform: "translateX(-50%)",
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: "clamp(5rem, 14vw, 11rem)",
          fontWeight: 900,
          fontStyle: "italic",
          letterSpacing: "-0.04em",
          color: "transparent",
          WebkitTextStroke: "1px rgba(0,0,0,0.04)",
          whiteSpace: "nowrap",
          userSelect: "none",
          pointerEvents: "none",
          zIndex: 0,
          lineHeight: 1,
        }}
      >
        LeapScholar
      </div>
    </footer>
  );
}