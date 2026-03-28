import { ArrowRight } from "lucide-react";
import imgBg from "../../assets/0a5bd322d24870990f2a0065fb0d695998499866.png";

export function ProfileEvalCTA({ onOpenModal }: { onOpenModal: () => void }) {
  return (
    <section style={{ position: "relative", overflow: "hidden" }}>
      {/* Full-bleed dark image */}
      <div
        style={{
          position: "relative",
          minHeight: "520px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Background image */}
        <img
          src={imgBg}
          alt="University architecture"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "brightness(0.3)",
          }}
        />

        {/* Overlay gradient */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to bottom, rgba(12,26,59,0.5) 0%, rgba(12,26,59,0.78) 100%)",
          }}
        />

        {/* Content */}
        <div
          style={{
            position: "relative",
            zIndex: 1,
            textAlign: "center",
            padding: "5rem 2rem",
            maxWidth: "720px",
          }}
        >
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.66rem",
              fontWeight: 600,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.45)",
              marginBottom: "1.75rem",
            }}
          >
            Begin Your Journey
          </p>

          <h2
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(2.25rem, 5vw, 3.75rem)",
              fontWeight: 700,
              color: "#fff",
              lineHeight: 1.1,
              letterSpacing: "-0.025em",
              marginBottom: "1.5rem",
            }}
          >
            Built for the{" "}
            <em style={{ fontStyle: "italic" }}>Architects</em>{" "}
            of Tomorrow.
          </h2>

          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "1rem",
              fontWeight: 400,
              color: "rgba(255,255,255,0.6)",
              lineHeight: 1.75,
              marginBottom: "2.75rem",
              maxWidth: "480px",
              margin: "0 auto 2.75rem",
            }}
          >
            We don't just find schools — we map your evolution into the global academic landscape.
          </p>

          <button
            onClick={onOpenModal}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.625rem",
              backgroundColor: "#4F46E5",
              color: "#fff",
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.8rem",
              fontWeight: 500,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              padding: "1rem 2rem",
              borderRadius: "6px",
              border: "none",
              cursor: "pointer",
              boxShadow: "0 4px 24px rgba(79,70,229,0.4)",
              transition: "all 0.2s",
            }}
            className="hover:bg-[#4338CA] hover:-translate-y-0.5"
          >
            Analyse My Profile
            <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </section>
  );
}