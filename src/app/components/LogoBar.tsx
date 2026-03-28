const items = [
  "✦  CLEAR ADMITS",
  "✦  MERIT FULL SCHOLARSHIPS · STANFORD, OXFORD, LIFE SCHOOL",
  "✦  SCHOLARSHIP SECURED: $180K / YEAR",
  "✦  CURATED SHORTLIST BY LEAGUE CONSULATES",
  "✦  700+ IMPERIAL",
];

export function LogoBar() {
  return (
    <div
      style={{
        backgroundColor: "#0C1A3B",
        overflow: "hidden",
        padding: "0.75rem 0",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "0",
          width: "max-content",
          animation: "ticker 40s linear infinite",
        }}
      >
        {[...items, ...items, ...items].map((item, i) => (
          <span
            key={i}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.68rem",
              fontWeight: 400,
              color: "rgba(255,255,255,0.4)",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
              padding: "0 2.5rem",
            }}
          >
            {item}
          </span>
        ))}
      </div>
      <style>{`
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
      `}</style>
    </div>
  );
}