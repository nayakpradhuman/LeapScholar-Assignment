import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 50, suffix: "K+", label: "Students Guided" },
  { value: 500, suffix: "+", label: "Elite Universities" },
  { value: 95, suffix: "%", label: "Satisfaction Rate" },
  { value: 40, suffix: "+", label: "Countries Covered" },
];

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let start = 0;
          const steps = 50;
          const inc = target / steps;
          const t = setInterval(() => {
            start += inc;
            if (start >= target) { setCount(target); clearInterval(t); }
            else setCount(Math.floor(start));
          }, 1600 / steps);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export function Stats() {
  return (
    <section style={{ padding: "5rem 2rem", backgroundColor: "#fff", borderTop: "1px solid #F0F0F0", borderBottom: "1px solid #F0F0F0" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "2rem",
          }}
          className="grid-cols-2 lg:grid-cols-4"
        >
          {stats.map((s, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: "clamp(2.5rem, 4vw, 3.5rem)",
                  fontWeight: 700,
                  color: "#4F46E5",
                  letterSpacing: "-0.04em",
                  lineHeight: 1,
                  marginBottom: "0.625rem",
                }}
              >
                <CountUp target={s.value} suffix={s.suffix} />
              </div>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.75rem",
                  fontWeight: 400,
                  color: "#94A3B8",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}