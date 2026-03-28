import { useState, useEffect, useRef } from "react";
import { ArrowRight, GraduationCap, DollarSign, Plane, Calendar, Award, Briefcase } from "lucide-react";

// ─── Data ────────────────────────────────────────────────────────────────────
const destinations = [
  {
    num: "01", flag: "🇺🇸", country: "United States",
    tagline: "Where ambition meets world-class research ecosystems",
    count: "180+", students: "18,200+", successRate: 94,
    programs: [
      { name: "Computer Science & AI",   unis: "MIT · Stanford · CMU" },
      { name: "Business & MBA",          unis: "Harvard · Wharton · Booth" },
      { name: "Engineering",             unis: "Caltech · UIUC · Purdue" },
      { name: "Data Science",            unis: "CMU · UW · Columbia" },
      { name: "Public Policy",           unis: "Harvard Kennedy · Princeton SPIA" },
    ],
    image: "https://images.unsplash.com/photo-1693478169210-72d368c798ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxNSVQlMjBIYXJ2YXJkJTIwdW5pdmVyc2l0eSUyMGNhbXB1cyUyMGFlcmlhbCUyMFVTQXxlbnwxfHx8fDE3NzQ3Mjc1MDN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    avgTuition: "$28–55K / yr", visa: "F-1 Student Visa",
    intakes: "Jan · Sep", workPermit: "OPT — up to 3 yrs",
    scholarships: "Fulbright · NSF · Institutional Merit",
    highlight: "8 of top 10 global CS programs",
  },
  {
    num: "02", flag: "🇬🇧", country: "United Kingdom",
    tagline: "Eight centuries of tradition, reimagined for today",
    count: "90+", students: "9,400+", successRate: 91,
    programs: [
      { name: "Finance & Economics",     unis: "LSE · Oxford · Cambridge" },
      { name: "Law",                     unis: "Oxford · UCL · King's College" },
      { name: "Computer Science",        unis: "Imperial · Edinburgh · Bath" },
      { name: "Medicine",                unis: "King's · UCL · Edinburgh" },
      { name: "AI & Machine Learning",   unis: "Imperial · Oxford · Manchester" },
    ],
    image: "https://images.unsplash.com/photo-1687361326961-c86e28724b25?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxPeGZvcmQlMjBDYW1icmlkZ2UlMjB1bml2ZXJzaXR5JTIwY2FtcHVzJTIwVUt8ZW58MXx8fHwxNzc0NzI3NTAzfDA&ixlib=rb-4.1.0&q=80&w=1080",
    avgTuition: "£18–35K / yr", visa: "Student Visa (Tier 4)",
    intakes: "Sep · Jan", workPermit: "Graduate Route — 2 yrs",
    scholarships: "Chevening · Gates Cambridge",
    highlight: "1-year Masters — faster & leaner",
  },
  {
    num: "03", flag: "🇨🇦", country: "Canada",
    tagline: "World-class education with a pathway to residency",
    count: "65+", students: "7,800+", successRate: 89,
    programs: [
      { name: "CS & Artificial Intelligence", unis: "Waterloo · Toronto · UBC" },
      { name: "Health Sciences",              unis: "McGill · Toronto · Alberta" },
      { name: "Business (MBA)",               unis: "Rotman · Ivey · Schulich" },
      { name: "Engineering",                  unis: "Waterloo · McGill · Queens" },
      { name: "Environmental Science",        unis: "UBC · Dalhousie · Victoria" },
    ],
    image: "https://images.unsplash.com/photo-1618255630366-f402c45736f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxVbml2ZXJzaXR5JTIwb2YlMjBUb3JvbnRvJTIwQ2FuYWRhJTIwY2FtcHVzfGVufDF8fHx8MTc3NDcyNzUwNHww&ixlib=rb-4.1.0&q=80&w=1080",
    avgTuition: "CAD 18–40K / yr", visa: "Study Permit",
    intakes: "Jan · May · Sep", workPermit: "PGWP — up to 3 yrs",
    scholarships: "Vanier · NSERC · Banting",
    highlight: "3-year open work permit post-study (PGWP)",
  },
  {
    num: "04", flag: "🇩🇪", country: "Germany",
    tagline: "Engineering excellence — virtually tuition-free",
    count: "45+", students: "5,600+", successRate: 87,
    programs: [
      { name: "Mechanical Engineering",  unis: "TU Munich · RWTH · KIT" },
      { name: "Automotive & Robotics",   unis: "TU Munich · Stuttgart · TU Berlin" },
      { name: "Physics & Mathematics",   unis: "Heidelberg · LMU · Göttingen" },
      { name: "Data Science",            unis: "TU Munich · HU Berlin · Dresden" },
      { name: "Architecture",            unis: "TU Berlin · Stuttgart · Darmstadt" },
    ],
    image: "https://images.unsplash.com/photo-1666457556188-c3d2ed6ef552?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxUVSUyME11bmljaCUyMEdlcm1hbnklMjB1bml2ZXJzaXR5JTIwYXJjaGl0ZWN0dXJlfGVufDF8fHx8MTc3NDcyNzUwNHww&ixlib=rb-4.1.0&q=80&w=1080",
    avgTuition: "€0–3K / yr", visa: "National Visa (Type D)",
    intakes: "Apr · Oct", workPermit: "Job Seeker Visa — 18 mo",
    scholarships: "DAAD · Deutschlandstipendium",
    highlight: "Tuition-free at most public universities",
  },
  {
    num: "05", flag: "🇦🇺", country: "Australia",
    tagline: "Research-intensive and globally connected",
    count: "40+", students: "6,200+", successRate: 88,
    programs: [
      { name: "Mining & Resources",      unis: "UNSW · UWA · Adelaide" },
      { name: "Business & Finance",      unis: "Melbourne · UNSW · Monash" },
      { name: "Computer Science",        unis: "ANU · Melbourne · Sydney" },
      { name: "Nursing & Allied Health", unis: "Melbourne · Monash · Queensland" },
      { name: "Marine Biology",          unis: "JCU · Queensland · UNSW" },
    ],
    image: "https://images.unsplash.com/photo-1576588728682-273e5c9d5553?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxVbml2ZXJzaXR5JTIwb2YlMjBNZWxib3VybmUlMjBBdXN0cmFsaWElMjBjYW1wdXN8ZW58MXx8fHwxNzc0NzI3NTA1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    avgTuition: "AUD 28–48K / yr", visa: "Student Visa (500)",
    intakes: "Feb · Jul", workPermit: "485 Visa — up to 4 yrs",
    scholarships: "Australia Awards · Endeavour",
    highlight: "485 Graduate Work Visa — up to 4 years",
  },
  {
    num: "06", flag: "🇸🇬", country: "Singapore",
    tagline: "Asia's academic gateway, globally top-ranked",
    count: "12+", students: "3,100+", successRate: 92,
    programs: [
      { name: "Finance & FinTech",       unis: "NUS · NTU · SMU" },
      { name: "Computer Science",        unis: "NUS · NTU · SUTD" },
      { name: "Biomedical Science",      unis: "NUS · NTU · Duke-NUS" },
      { name: "Urban Planning",          unis: "NUS · SUTD · SIT" },
      { name: "Quantitative Finance",    unis: "NUS · SMU · NTU" },
    ],
    image: "https://images.unsplash.com/photo-1701457916754-255308c55de7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxTaW5nYXBvcmUlMjBtb2Rlcm4lMjB1bml2ZXJzaXR5JTIwc2t5bGluZSUyMGNhbXB1c3xlbnwxfHx8fDE3NzQ3Mjc1MDh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    avgTuition: "SGD 20–40K / yr", visa: "Student's Pass",
    intakes: "Jan · Aug", workPermit: "Employment Pass eligible",
    scholarships: "ASEAN Scholarship · NUS Merit",
    highlight: "Gateway to Asia's fastest-growing job markets",
  },
];

// ─── Component ───────────────────────────────────────────────────────────────
export function Universities() {
  const [active, setActive]         = useState(0);
  const [displayIdx, setDisplayIdx] = useState(0);
  const [animating, setAnimating]   = useState(false);
  const [hovProg, setHovProg]       = useState<number | null>(null);
  const imgRef                      = useRef<HTMLImageElement>(null);
  const imgWrapRef                  = useRef<HTMLDivElement>(null);

  const select = (i: number) => {
    if (i === active || animating) return;
    setAnimating(true);
    setTimeout(() => {
      setDisplayIdx(i);
      setActive(i);
      setAnimating(false);
      setHovProg(null);
    }, 260);
  };

  // Auto-cycle every 5s
  useEffect(() => {
    const id = setInterval(() => {
      select((active + 1) % destinations.length);
    }, 5000);
    return () => clearInterval(id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, animating]);

  // Parallax on image
  const onParallax = (e: React.MouseEvent<HTMLDivElement>) => {
    const wrap = imgWrapRef.current;
    const img  = imgRef.current;
    if (!wrap || !img) return;
    const r = wrap.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width  - 0.5) * 18;
    const y = ((e.clientY - r.top)  / r.height - 0.5) * 12;
    img.style.transition = "transform 0.08s linear";
    img.style.transform  = `scale(1.1) translate(${-x}px, ${-y}px)`;
  };
  const onParallaxLeave = () => {
    if (imgRef.current) {
      imgRef.current.style.transition = "transform 0.7s cubic-bezier(.22,1,.36,1)";
      imgRef.current.style.transform  = "scale(1)";
    }
  };

  const d = destinations[displayIdx];

  const quickStats = [
    { icon: <DollarSign size={13} color="#4F46E5" />, label: "Avg. Tuition",  value: d.avgTuition },
    { icon: <Plane       size={13} color="#4F46E5" />, label: "Visa Type",    value: d.visa },
    { icon: <Calendar    size={13} color="#4F46E5" />, label: "Intakes",      value: d.intakes },
    { icon: <Briefcase   size={13} color="#4F46E5" />, label: "Work Permit",  value: d.workPermit },
  ];

  return (
    <section id="universities" style={{ padding: "8rem 2rem", backgroundColor: "#fff" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>

        {/* ── Section header ── */}
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "3.5rem", flexWrap: "wrap", gap: "2rem" }}>
          <div>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.65rem", fontWeight: 500, letterSpacing: "0.16em", textTransform: "uppercase", color: "#94A3B8", marginBottom: "1.25rem" }}>
              Study Destinations
            </p>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(1.875rem, 3.5vw, 2.875rem)", fontWeight: 700, color: "#0F172A", lineHeight: 1.1, letterSpacing: "-0.025em" }}>
              Your world,{" "}<em style={{ fontStyle: "italic", color: "#4F46E5" }}>precisely mapped</em>
            </h2>
          </div>
          <a href="#" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", fontFamily: "'Inter', sans-serif", fontSize: "0.78rem", fontWeight: 500, color: "#374151", textDecoration: "none", padding: "0.625rem 1.25rem", border: "1.5px solid #E5E7EB", borderRadius: "100px", transition: "all 0.2s" }}
            className="hover:border-[#4F46E5] hover:text-[#4F46E5]">
            View All Destinations <ArrowRight size={13} />
          </a>
        </div>

        {/* ── Destination tab strip ── */}
        <div style={{ marginBottom: "2rem" }}>
          <div style={{ display: "flex", gap: "0.5rem", overflowX: "auto", paddingBottom: "1px" }}
            className="scrollbar-hide">
            {destinations.map((dest, i) => {
              const isActive = active === i;
              return (
                <button
                  key={i}
                  onClick={() => select(i)}
                  style={{
                    all: "unset", cursor: "pointer", flexShrink: 0,
                    display: "flex", alignItems: "center", gap: "0.5rem",
                    padding: "0.5rem 1rem",
                    borderRadius: "100px",
                    border: `1.5px solid ${isActive ? "#4F46E5" : "#E2E8F0"}`,
                    backgroundColor: isActive ? "#EEF2FF" : "#FAFBFF",
                    transition: "all 0.25s cubic-bezier(.22,1,.36,1)",
                  }}
                  className={!isActive ? "hover:border-[#C7D2FE] hover:bg-[#F5F7FF]" : ""}
                >
                  <span style={{ fontSize: "1rem", lineHeight: 1 }}>{dest.flag}</span>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.78rem", fontWeight: isActive ? 600 : 500, color: isActive ? "#4F46E5" : "#64748B", transition: "color 0.2s", letterSpacing: "-0.01em" }}>
                    {dest.country}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Auto-play sweep bar */}
          <div style={{ marginTop: "0.875rem", height: "2px", backgroundColor: "#F1F5F9", borderRadius: "100px", overflow: "hidden" }}>
            <div
              key={`sweep-${active}`}
              style={{
                height: "100%",
                background: "linear-gradient(90deg, #4F46E5, #6366F1)",
                borderRadius: "100px",
                animation: "uni-sweep 5s linear forwards",
              }}
            />
          </div>
        </div>

        {/* ── Main explorer panel ── */}
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem", alignItems: "stretch" }}
          className="!grid-cols-1 lg:!grid-cols-2"
        >
          {/* ── LEFT: Image panel ── */}
          <div
            ref={imgWrapRef}
            onMouseMove={onParallax}
            onMouseLeave={onParallaxLeave}
            style={{ position: "relative", borderRadius: "16px", overflow: "hidden", minHeight: "480px", cursor: "crosshair" }}
          >
            {/* Image with key-based fade animation */}
            <img
              key={`img-${displayIdx}`}
              ref={imgRef}
              src={d.image}
              alt={d.country}
              style={{
                position: "absolute", inset: 0, width: "100%", height: "100%",
                objectFit: "cover", transformOrigin: "center",
                animation: "uni-img-in 0.6s cubic-bezier(.22,1,.36,1) forwards",
              }}
            />

            {/* Gradient overlays */}
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(15,23,42,0.88) 0%, rgba(15,23,42,0.2) 55%, rgba(15,23,42,0) 100%)" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(15,23,42,0.2) 0%, transparent 50%)" }} />

            {/* Top-left: highlight badge — matches Hero badge style exactly */}
            <div style={{
              position: "absolute", top: "1.25rem", left: "1.25rem",
              backgroundColor: "#fff", border: "1px solid #DBEAFE",
              borderRadius: "10px", padding: "0.45rem 0.875rem",
              boxShadow: "0 4px 14px rgba(37,99,235,0.12)",
              display: "flex", alignItems: "center", gap: "0.5rem",
              animation: "uni-badge-in 0.5s cubic-bezier(.22,1,.36,1) 0.25s both",
            }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#4F46E5", display: "inline-block", flexShrink: 0 }} />
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.67rem", fontWeight: 500, color: "#1E40AF", whiteSpace: "nowrap" }}>
                {d.highlight}
              </span>
            </div>

            {/* Top-right: success rate chip */}
            <div style={{
              position: "absolute", top: "1.25rem", right: "1.25rem",
              backgroundColor: "#fff", border: "1px solid #E2E8F0",
              borderRadius: "10px", padding: "0.45rem 0.75rem",
              boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
              display: "flex", alignItems: "center", gap: "0.4rem",
              animation: "uni-badge-in 0.5s cubic-bezier(.22,1,.36,1) 0.35s both",
            }}>
              <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "1rem", fontWeight: 700, color: "#4F46E5" }}>
                {d.successRate}%
              </span>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.62rem", fontWeight: 400, color: "#94A3B8", lineHeight: 1.2 }}>
                admit<br />rate
              </span>
            </div>

            {/* Bottom: country + students count */}
            <div style={{
              position: "absolute", bottom: 0, left: 0, right: 0, padding: "1.75rem",
              opacity: animating ? 0 : 1,
              transform: animating ? "translateY(8px)" : "translateY(0)",
              transition: "opacity 0.3s ease, transform 0.3s ease",
            }}>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.65rem", fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)", marginBottom: "0.375rem" }}>
                {d.num} · {d.count} universities
              </p>
              <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(1.75rem, 3vw, 2.25rem)", fontWeight: 700, color: "#fff", letterSpacing: "-0.025em", lineHeight: 1.1, margin: "0 0 0.25rem" }}>
                {d.flag} {d.country}
              </h3>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.78rem", fontWeight: 400, color: "rgba(255,255,255,0.6)", margin: 0 }}>
                {d.tagline}
              </p>

              {/* Students guided badge */}
              <div style={{ marginTop: "1rem", display: "inline-flex", alignItems: "center", gap: "0.4rem", backgroundColor: "rgba(255,255,255,0.1)", backdropFilter: "blur(6px)", border: "1px solid rgba(255,255,255,0.18)", borderRadius: "100px", padding: "0.3rem 0.75rem" }}>
                <span style={{ width: "5px", height: "5px", borderRadius: "50%", backgroundColor: "#22C55E", boxShadow: "0 0 5px #22C55E", display: "inline-block" }} />
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.66rem", fontWeight: 500, color: "rgba(255,255,255,0.85)" }}>
                  {d.students} students guided via LeapAI
                </span>
              </div>
            </div>
          </div>

          {/* ── RIGHT: Detail panel ── */}
          <div style={{
            backgroundColor: "#fff", border: "1px solid #E8EEF8",
            borderRadius: "16px", overflow: "hidden",
            display: "flex", flexDirection: "column",
            opacity: animating ? 0 : 1,
            transform: animating ? "translateY(12px)" : "translateY(0)",
            transition: "opacity 0.26s ease, transform 0.26s ease",
          }}>
            {/* Top accent strip — matches Features hover accent exactly */}
            <div style={{ height: "3px", background: "linear-gradient(90deg, #4F46E5, rgba(79,70,229,0.2))", flexShrink: 0 }} />

            <div style={{ flex: 1, padding: "1.75rem", display: "flex", flexDirection: "column", gap: "1.5rem", overflowY: "auto" }}>

              {/* Quick stats 2×2 grid */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.625rem" }}>
                {quickStats.map((s, i) => (
                  <div key={i} style={{ backgroundColor: "#FAFBFF", border: "1px solid #E8EEF8", borderRadius: "10px", padding: "0.875rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.35rem", marginBottom: "0.4rem" }}>
                      {s.icon}
                      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: "#94A3B8" }}>
                        {s.label}
                      </span>
                    </div>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8rem", fontWeight: 500, color: "#334155", margin: 0 }}>
                      {s.value}
                    </p>
                  </div>
                ))}
              </div>

              {/* Programs list */}
              <div>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.62rem", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: "#94A3B8", marginBottom: "0.625rem" }}>
                  Top Programs
                </p>
                <div style={{ border: "1px solid #E8EEF8", borderRadius: "10px", overflow: "hidden" }}>
                  {d.programs.map((prog, j) => (
                    <div
                      key={j}
                      onMouseEnter={() => setHovProg(j)}
                      onMouseLeave={() => setHovProg(null)}
                      style={{
                        display: "flex", alignItems: "center", gap: "0.75rem",
                        padding: "0.75rem 0.875rem",
                        borderBottom: j < d.programs.length - 1 ? "1px solid #F1F5F9" : "none",
                        borderLeft: `2px solid ${hovProg === j ? "#4F46E5" : "transparent"}`,
                        backgroundColor: hovProg === j ? "#F8FAFF" : "#fff",
                        transition: "all 0.18s cubic-bezier(.22,1,.36,1)",
                        cursor: "default",
                      }}
                    >
                      <GraduationCap size={13} color={hovProg === j ? "#4F46E5" : "#CBD5E1"} style={{ flexShrink: 0, transition: "color 0.18s" }} />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.82rem", fontWeight: 500, color: hovProg === j ? "#0F172A" : "#334155", margin: 0, transition: "color 0.18s" }}>
                          {prog.name}
                        </p>
                        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.68rem", fontWeight: 400, color: "#94A3B8", margin: 0 }}>
                          {prog.unis}
                        </p>
                      </div>
                      {hovProg === j && (
                        <ArrowRight size={11} color="#4F46E5" style={{ flexShrink: 0, animation: "uni-badge-in 0.15s ease" }} />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Scholarships strip — matches tint bg token */}
              <div style={{ backgroundColor: "#EEF2FF", border: "1px solid #E0E7FF", borderRadius: "10px", padding: "0.75rem 1rem", display: "flex", alignItems: "center", gap: "0.625rem" }}>
                <Award size={14} color="#4338CA" style={{ flexShrink: 0 }} />
                <div>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: "#6366F1", margin: "0 0 2px" }}>
                    Scholarships Available
                  </p>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.78rem", fontWeight: 500, color: "#3730A3", margin: 0 }}>
                    {d.scholarships}
                  </p>
                </div>
              </div>

              {/* CTAs — matching Hero section exactly */}
              
            </div>
          </div>
        </div>

        {/* ── Progress dots + bottom strip ── */}
        <div style={{ marginTop: "1.75rem", display: "flex", gap: "5px", justifyContent: "center" }}>
          {destinations.map((_, i) => (
            <button key={i} onClick={() => select(i)} style={{
              all: "unset", cursor: "pointer",
              height: "2px",
              width: i === active ? "24px" : "8px",
              borderRadius: "100px",
              backgroundColor: i === active ? "#4F46E5" : "#E2E8F0",
              transition: "all 0.4s cubic-bezier(.22,1,.36,1)",
            }} />
          ))}
        </div>

        {/* ── Stats strip ── */}
        <div style={{ marginTop: "2.5rem", padding: "1.5rem 2rem", backgroundColor: "#F8FAFF", border: "1px solid #E8EEF8", borderRadius: "14px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1.5rem" }}>
          {[
            { value: "430+", label: "Partner Universities" },
            { value: "47",   label: "Countries Covered" },
            { value: "94%",  label: "Admission Success Rate" },
            { value: "$2.4M+", label: "Scholarships Secured" },
          ].map((stat, i) => (
            <div key={i} style={{ textAlign: "center", flex: "1 1 120px" }}>
              <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "1.6rem", fontWeight: 700, color: "#0F172A", letterSpacing: "-0.02em", marginBottom: "0.2rem" }}>
                {stat.value}
              </p>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.72rem", fontWeight: 400, color: "#94A3B8" }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes uni-sweep {
          from { width: 0%; }
          to   { width: 100%; }
        }
        @keyframes uni-img-in {
          from { opacity: 0; transform: scale(1.06); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes uni-badge-in {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
}
