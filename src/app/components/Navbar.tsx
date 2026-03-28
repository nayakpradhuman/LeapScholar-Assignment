import { useState } from "react";
import { Menu, X, ChevronDown, LogOut, Settings, User } from "lucide-react";
import { LeapLogoIcon } from "./LeapLogoIcon";

const navLinks = [
  { label: "Philosophy", href: "#how-it-works", active: true },
  { label: "Services", href: "#features" },
  { label: "Intelligence", href: "#universities" },
  { label: "Archive", href: "#testimonials" },
];

export function Navbar({ onOpenModal }: { onOpenModal: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState("Philosophy");
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        backgroundColor: "rgba(255,255,255,0.97)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(0,0,0,0.06)",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 2rem",
          height: "56px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <LeapLogoIcon size={32} shadow border />
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.9rem",
              fontWeight: 700,
              color: "#2563EB",
              letterSpacing: "-0.02em",
            }}
          >
            LeapScholar
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setActive(link.label)}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.82rem",
                fontWeight: active === link.label ? 500 : 400,
                color: active === link.label ? "#111827" : "#6B7280",
                padding: "0.35rem 0.875rem",
                borderRadius: "100px",
                backgroundColor: active === link.label ? "#F3F4F6" : "transparent",
                textDecoration: "none",
                transition: "all 0.15s",
                letterSpacing: "0.01em",
              }}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Sign In */}
        <div className="hidden md:flex items-center gap-3">
          <div style={{ position: "relative" }}>
            <button
              onClick={() => setProfileOpen(o => !o)}
              style={{
                display: "flex", alignItems: "center", gap: "0.5rem",
                background: "none", border: "1px solid #E2E8F0",
                borderRadius: "100px", padding: "0.3rem 0.75rem 0.3rem 0.3rem",
                cursor: "pointer", transition: "border-color 0.15s, box-shadow 0.15s",
              }}
              className="hover:border-[#4F46E5] hover:shadow-sm"
            >
              <div style={{
                width: "28px", height: "28px", borderRadius: "50%",
                background: "linear-gradient(135deg, #4338CA, #4F46E5)",
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
              }}>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.65rem", fontWeight: 600, color: "#fff" }}>AS</span>
              </div>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.78rem", fontWeight: 500, color: "#0F172A", letterSpacing: "0.01em" }}>Aryan S.</span>
              <ChevronDown size={13} color="#94A3B8" style={{ transition: "transform 0.2s", transform: profileOpen ? "rotate(180deg)" : "rotate(0deg)" }} />
            </button>

            {profileOpen && (
              <>
                <div style={{ position: "fixed", inset: 0, zIndex: 99 }} onClick={() => setProfileOpen(false)} />
                <div style={{
                  position: "absolute", top: "calc(100% + 8px)", right: 0,
                  backgroundColor: "#fff", border: "1px solid #E2E8F0",
                  borderRadius: "14px", minWidth: "210px",
                  boxShadow: "0 8px 32px rgba(15,23,42,0.12)",
                  overflow: "hidden", zIndex: 100,
                  animation: "nav-dd 0.18s cubic-bezier(.22,1,.36,1)",
                }}>
                  <div style={{ padding: "0.875rem 1rem", borderBottom: "1px solid #F1F5F9", display: "flex", alignItems: "center", gap: "0.625rem" }}>
                    <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "linear-gradient(135deg, #4338CA, #4F46E5)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", fontWeight: 600, color: "#fff" }}>AS</span>
                    </div>
                    <div>
                      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8rem", fontWeight: 600, color: "#0F172A", margin: 0 }}>Aryan Sharma</p>
                      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.68rem", color: "#94A3B8", margin: 0 }}>aryan@email.com</p>
                    </div>
                  </div>
                  {[
                    { icon: User, label: "My Profile", action: () => { setProfileOpen(false); onOpenModal(); } },
                    { icon: Settings, label: "Preferences", action: () => setProfileOpen(false) },
                  ].map(({ icon: Icon, label, action }) => (
                    <button key={label} onClick={action} style={{
                      width: "100%", display: "flex", alignItems: "center", gap: "0.625rem",
                      padding: "0.625rem 1rem", background: "none", border: "none",
                      cursor: "pointer", fontFamily: "'Inter', sans-serif",
                      fontSize: "0.8rem", fontWeight: 400, color: "#334155",
                    }} className="hover:bg-slate-50">
                      <Icon size={14} color="#94A3B8" />
                      {label}
                    </button>
                  ))}
                  <div style={{ borderTop: "1px solid #F1F5F9" }}>
                    <button onClick={() => setProfileOpen(false)} style={{
                      width: "100%", display: "flex", alignItems: "center", gap: "0.625rem",
                      padding: "0.625rem 1rem", background: "none", border: "none",
                      cursor: "pointer", fontFamily: "'Inter', sans-serif",
                      fontSize: "0.8rem", fontWeight: 400, color: "#EF4444",
                    }} className="hover:bg-red-50">
                      <LogOut size={14} color="#EF4444" />
                      Sign Out
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Mobile */}
        <button className="md:hidden p-1.5 rounded-lg" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div style={{ backgroundColor: "#fff", borderTop: "1px solid #F3F4F6", padding: "1rem 2rem" }}>
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              style={{
                display: "block",
                padding: "0.625rem 0",
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.9rem",
                color: "#374151",
                textDecoration: "none",
                borderBottom: "1px solid #F9FAFB",
              }}
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#"
            style={{
              display: "block",
              marginTop: "1rem",
              textAlign: "center",
              backgroundColor: "#4F46E5",
              color: "#fff",
              padding: "0.75rem",
              borderRadius: "100px",
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.8rem",
              fontWeight: 500,
              letterSpacing: "0.03em",
              textDecoration: "none",
            }}
            onClick={(e) => { e.preventDefault(); setIsOpen(false); onOpenModal(); }}
          >
            Analyse My Profile
          </a>
        </div>
      )}
      <style>{`
        @keyframes nav-dd {
          from { opacity: 0; transform: translateY(-6px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </nav>
  );
}