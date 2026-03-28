import { useState, useEffect } from "react";
import { Zap } from "lucide-react";

export function FloatingCTA({ onOpenModal }: { onOpenModal: () => void }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 500);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        bottom: "2rem",
        right: "2rem",
        zIndex: 100,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(16px) scale(0.9)",
        transition: "opacity 0.35s cubic-bezier(.22,1,.36,1), transform 0.35s cubic-bezier(.22,1,.36,1)",
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      <button
        onClick={onOpenModal}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.5rem",
          background: "linear-gradient(135deg, #4338CA, #4F46E5)",
          color: "#fff",
          fontFamily: "'Inter', sans-serif",
          fontSize: "0.75rem",
          fontWeight: 500,
          letterSpacing: "0.04em",
          padding: "0.75rem 1.375rem",
          borderRadius: "100px",
          border: "none",
          cursor: "pointer",
          boxShadow: "0 8px 32px rgba(37,99,235,0.35), 0 2px 8px rgba(0,0,0,0.12)",
          transition: "transform 0.2s, box-shadow 0.2s",
        }}
        className="hover:-translate-y-0.5"
      >
        <div style={{
          width: "20px", height: "20px",
          backgroundColor: "rgba(255,255,255,0.18)",
          borderRadius: "50%",
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0,
        }}>
          <Zap size={11} color="#fff" fill="#fff" />
        </div>
        Analyse My Profile
      </button>
    </div>
  );
}