import { ArrowRight, Globe, RotateCcw, X, ChevronDown, Check } from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";
import { LeapLogoIcon } from "./LeapLogoIcon";

// ─── Types ──────────────────────────────────────────────────────────────────
type Phase = "boot" | "chat" | "analyze" | "results";

// ─── AI Models ──────────────────────────────────────────────────────────────
type AIModel = { id: string; label: string; provider: string; badge: string; dot: string };

const AI_MODELS: AIModel[] = [
  { id: "gpt-4o",         label: "GPT-4o",          provider: "OpenAI",    badge: "#10B981", dot: "#D1FAE5" },
  { id: "gpt-4o-mini",    label: "GPT-4o mini",      provider: "OpenAI",    badge: "#10B981", dot: "#D1FAE5" },
  { id: "o3",             label: "o3",               provider: "OpenAI",    badge: "#10B981", dot: "#D1FAE5" },
  { id: "claude-opus",    label: "Claude Opus 4",    provider: "Anthropic", badge: "#F59E0B", dot: "#FEF3C7" },
  { id: "claude-sonnet",  label: "Claude Sonnet 4",  provider: "Anthropic", badge: "#F59E0B", dot: "#FEF3C7" },
  { id: "claude-haiku",   label: "Claude Haiku 3.5", provider: "Anthropic", badge: "#F59E0B", dot: "#FEF3C7" },
  { id: "gemini-pro",     label: "Gemini 2.5 Pro",   provider: "Google",    badge: "#3B82F6", dot: "#DBEAFE" },
  { id: "gemini-flash",   label: "Gemini 2.0 Flash", provider: "Google",    badge: "#3B82F6", dot: "#DBEAFE" },
  { id: "llama-3.3",      label: "Llama 3.3",        provider: "Meta",      badge: "#8B5CF6", dot: "#EDE9FE" },
  { id: "mistral-large",  label: "Mistral Large",    provider: "Mistral",   badge: "#EC4899", dot: "#FCE7F3" },
];

const PROVIDERS = ["OpenAI", "Anthropic", "Google", "Meta", "Mistral"];

// ─── Data ───────────────────────────────────────────────────────────────────
const MSG1 = "Tell me about your academic background.";
const MSG2 = "Any destination or funding preferences?";
const USER_MSG1 = "MS CS · GRE 324 · CGPA 8.6 · 2yr SWE exp";
const USER_MSG2 = "USA, Canada or Germany. Fully funded if possible.";

const UNIVERSITIES = [
  { flag: "🇺🇸", name: "Carnegie Mellon",   program: "MS Computer Science", match: 94, color: "#4F46E5" },
  { flag: "🇨🇦", name: "Univ. of Toronto",  program: "MS CS · Merit Aid",   match: 91, color: "#4F46E5" },
  { flag: "🇩🇪", name: "TU Munich",          program: "MSc Informatics",    match: 88, color: "#0EA5E9" },
  { flag: "🇺🇸", name: "UIUC",               program: "MS Computer Sci.",   match: 85, color: "#6366F1" },
];

const TASKS = [
  { label: "Semantic profile parsing",          threshold: 20 },
  { label: "Cross-referencing 47,832 profiles", threshold: 48 },
  { label: "Institutional DNA mapping",          threshold: 72 },
  { label: "Scholarship signal detection",       threshold: 92 },
];

// ─── Typewriter hook ─────────────────────────────────────────────────────────
function useTypewriter(text: string, speed = 38, active = true) {
  const [out, setOut] = useState("");
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (!active) { setOut(""); return; }
    let i = 0;
    setOut("");
    timerRef.current = setInterval(() => {
      i++;
      setOut(text.slice(0, i));
      if (i >= text.length && timerRef.current) clearInterval(timerRef.current);
    }, speed);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [text, speed, active]);

  return { text: out, done: out.length >= text.length };
}

const PHASES: Phase[] = ["boot", "chat", "analyze", "results"];

// ─── Main component ─────────────────────────────────────────────────────────
export function AIAgentScreen() {
  const [phase, setPhase]               = useState<Phase>("boot");
  const [chatStep, setChatStep]         = useState(0);
  const [analyzePct, setAnalyzePct]     = useState(0);
  const [shownResults, setShownResults] = useState(0);
  const [mounted, setMounted]           = useState(false);
  const [bootPct, setBootPct]           = useState(0);
  const [selectedModel, setSelectedModel] = useState<AIModel>(AI_MODELS[0]);
  const [modelOpen, setModelOpen]         = useState(false);
  const modelRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function onOutside(e: MouseEvent) {
      if (modelRef.current && !modelRef.current.contains(e.target as Node)) {
        setModelOpen(false);
      }
    }
    if (modelOpen) document.addEventListener("mousedown", onOutside);
    return () => document.removeEventListener("mousedown", onOutside);
  }, [modelOpen]);

  const tw1 = useTypewriter(MSG1, 36, phase === "chat" && chatStep >= 0);
  const tw2 = useTypewriter(MSG2, 36, phase === "chat" && chatStep >= 2);

  useEffect(() => { const id = setTimeout(() => setMounted(true), 80); return () => clearTimeout(id); }, []);

  const restart = useCallback(() => {
    setPhase("boot"); setChatStep(0); setAnalyzePct(0); setShownResults(0); setBootPct(0);
  }, []);

  // Boot phase
  useEffect(() => {
    if (phase !== "boot") return;
    setBootPct(0); let p = 0;
    const id = setInterval(() => {
      p += 2.5; setBootPct(Math.min(Math.round(p), 100));
      if (p >= 100) { clearInterval(id); setTimeout(() => setPhase("chat"), 400); }
    }, 55);
    return () => clearInterval(id);
  }, [phase]);

  // Chat chain
  useEffect(() => {
    if (phase !== "chat") return;
    if (chatStep === 0 && tw1.done) { const t = setTimeout(() => setChatStep(1), 650); return () => clearTimeout(t); }
  }, [phase, chatStep, tw1.done]);
  useEffect(() => {
    if (phase !== "chat" || chatStep !== 1) return;
    const t = setTimeout(() => setChatStep(2), 1100); return () => clearTimeout(t);
  }, [phase, chatStep]);
  useEffect(() => {
    if (phase !== "chat") return;
    if (chatStep === 2 && tw2.done) { const t = setTimeout(() => setChatStep(3), 650); return () => clearTimeout(t); }
  }, [phase, chatStep, tw2.done]);
  useEffect(() => {
    if (phase !== "chat" || chatStep !== 3) return;
    const t = setTimeout(() => setPhase("analyze"), 1300); return () => clearTimeout(t);
  }, [phase, chatStep]);

  // Analyze phase
  useEffect(() => {
    if (phase !== "analyze") return;
    setAnalyzePct(0); let p = 0;
    const id = setInterval(() => {
      p += 1.6; setAnalyzePct(Math.min(Math.round(p), 100));
      if (p >= 100) { clearInterval(id); setTimeout(() => setPhase("results"), 450); }
    }, 40);
    return () => clearInterval(id);
  }, [phase]);

  // Results phase
  useEffect(() => {
    if (phase !== "results") return;
    setShownResults(0);
    UNIVERSITIES.forEach((_, i) => setTimeout(() => setShownResults(i + 1), 300 + i * 400));
    const t = setTimeout(restart, 7500); return () => clearTimeout(t);
  }, [phase, restart]);

  const phaseIdx = PHASES.indexOf(phase);

  // Map phase + chatStep → 1-based step number (out of 6)
  const currentStep =
    phase === "boot" ? 1
    : phase === "chat" ? (chatStep <= 1 ? 2 : chatStep === 2 ? 3 : 4)
    : phase === "analyze" ? 5
    : 6;
  const totalSteps = 6;

  return (
    <div
      style={{
        width: "380px",
        height: "520px",
        backgroundColor: "#fff",
        border: "1px solid #E2E8F0",
        borderRadius: "20px",
        overflow: "hidden",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        boxShadow: "0 4px 6px rgba(37,99,235,0.04), 0 24px 60px rgba(37,99,235,0.08), 0 0 0 1px rgba(37,99,235,0.06)",
        opacity: mounted ? 1 : 0,
        transform: mounted ? "translateY(0)" : "translateY(24px)",
        transition: "opacity 0.8s cubic-bezier(.22,1,.36,1), transform 0.8s cubic-bezier(.22,1,.36,1)",
      }}
    >
      {/* Subtle top glow */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "180px",
        background: "linear-gradient(180deg, rgba(37,99,235,0.04) 0%, transparent 100%)",
        pointerEvents: "none", zIndex: 0,
      }} />

      {/* Dot-grid */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "radial-gradient(rgba(37,99,235,0.06) 1px, transparent 1px)",
        backgroundSize: "24px 24px",
        pointerEvents: "none", zIndex: 0,
      }} />

      {/* ── Header ── */}
      <div style={{
        height: "60px", borderBottom: "1px solid #F1F5F9",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 1.25rem", flexShrink: 0, position: "relative", zIndex: 10,
        backgroundColor: "#fff",
      }}>
        {/* Left – LeapAI brand */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
          <LeapLogoIcon size={36} shadow border />
          <div>
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.8rem", fontWeight: 600, color: "#0F172A", lineHeight: 1.1, margin: 0 }}>
              LeapAI Advisor
            </p>
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.65rem", fontWeight: 500, color: "#94A3B8", margin: 0 }}>
              Step {currentStep} of {totalSteps}
            </p>
          </div>
        </div>

        {/* Right – model selector + progress pills + close */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>

          {/* ── Model selector ── */}
          <div ref={modelRef} style={{ position: "relative" }}>
            

            {/* Dropdown */}
            {modelOpen && (
              <div style={{
                position: "absolute",
                top: "calc(100% + 6px)",
                right: 0,
                width: "210px",
                backgroundColor: "#fff",
                border: "1px solid #E2E8F0",
                borderRadius: "12px",
                boxShadow: "0 8px 32px rgba(15,23,42,0.12), 0 2px 8px rgba(15,23,42,0.06)",
                overflow: "hidden",
                zIndex: 100,
                animation: "a-fade-in 0.15s ease",
              }}>
                {/* Header */}
                <div style={{
                  padding: "8px 12px 6px",
                  borderBottom: "1px solid #F1F5F9",
                }}>
                  <p style={{
                    fontFamily: "'Inter',sans-serif",
                    fontSize: "0.58rem", fontWeight: 700,
                    letterSpacing: "0.1em", textTransform: "uppercase",
                    color: "#94A3B8", margin: 0,
                  }}>
                    AI Model
                  </p>
                </div>

                {/* Groups */}
                <div style={{ maxHeight: "280px", overflowY: "auto", padding: "4px 0" }}>
                  {PROVIDERS.map(provider => {
                    const group = AI_MODELS.filter(m => m.provider === provider);
                    return (
                      <div key={provider}>
                        {/* Provider label */}
                        <p style={{
                          fontFamily: "'Inter',sans-serif",
                          fontSize: "0.56rem", fontWeight: 600,
                          letterSpacing: "0.08em", textTransform: "uppercase",
                          color: "#CBD5E1",
                          padding: "6px 12px 3px",
                          margin: 0,
                        }}>
                          {provider}
                        </p>
                        {group.map(model => {
                          const active = model.id === selectedModel.id;
                          return (
                            <button
                              key={model.id}
                              onClick={() => { setSelectedModel(model); setModelOpen(false); }}
                              style={{
                                display: "flex", alignItems: "center", gap: "8px",
                                width: "100%", padding: "6px 12px",
                                background: active ? model.dot : "none",
                                border: "none", cursor: "pointer",
                                textAlign: "left",
                                transition: "background 0.12s",
                              }}
                              className="hover:bg-slate-50"
                            >
                              <span style={{
                                width: "7px", height: "7px", borderRadius: "50%", flexShrink: 0,
                                backgroundColor: model.badge,
                              }} />
                              <span style={{
                                fontFamily: "'Inter',sans-serif",
                                fontSize: "0.72rem", fontWeight: active ? 600 : 400,
                                color: active ? "#1E1B4B" : "#334155",
                                flex: 1,
                              }}>
                                {model.label}
                              </span>
                              {active && <Check size={10} color={model.badge} strokeWidth={2.5} />}
                            </button>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Progress pills */}
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            {Array.from({ length: totalSteps }).map((_, i) => {
              const done = i + 1 < currentStep;
              const active = i + 1 === currentStep;
              return (
                <div key={i} style={{
                  height: "4px",
                  width: active ? "20px" : done ? "12px" : "8px",
                  borderRadius: "100px",
                  backgroundColor: done || active ? "#4F46E5" : "#E2E8F0",
                  transition: "all 0.4s cubic-bezier(.22,1,.36,1)",
                }} />
              );
            })}
          </div>

          {/* X / restart button */}
          <button
            onClick={restart}
            style={{
              background: "none", border: "none", cursor: "pointer",
              padding: "4px", color: "#94A3B8",
              display: "flex", alignItems: "center", transition: "color 0.15s",
            }}
            title="Restart demo"
            className="hover:!text-[#4F46E5]"
          >
            <X size={14} strokeWidth={2} />
          </button>
        </div>
      </div>

      {/* ── Phase progress bars ── */}
      

      {/* ── Content ── */}
      <div style={{ flex: 1, position: "relative", overflow: "hidden", zIndex: 1 }}>

        {/* ════ BOOT ════ */}
        {phase === "boot" && (
          <div style={{
            position: "absolute", inset: 0,
            display: "flex", flexDirection: "column", alignItems: "center",
            justifyContent: "center", gap: "1.5rem",
            animation: "a-fade-in 0.5s ease",
          }}>
            {/* Orb */}
            <div style={{ position: "relative", width: "110px", height: "110px" }}>
              <div style={{ position: "absolute", inset: 0, borderRadius: "50%", border: "1.5px solid #DBEAFE", borderTopColor: "#2563EB", animation: "a-spin-cw 4s linear infinite" }} />
              <div style={{ position: "absolute", inset: "16px", borderRadius: "50%", border: "1.5px solid #E0E7FF", borderRightColor: "#4F46E5", animation: "a-spin-ccw 2.8s linear infinite" }} />
              <div style={{ position: "absolute", inset: "32px", borderRadius: "50%", border: "1.5px solid #BAE6FD", borderBottomColor: "#0EA5E9", animation: "a-spin-cw 1.9s linear infinite" }} />

              {/* Orbit dots */}
              <div style={{ position: "absolute", inset: "-8px", borderRadius: "50%", animation: "a-spin-cw 3.2s linear infinite" }}>
                <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: "7px", height: "7px", backgroundColor: "#4F46E5", borderRadius: "50%", boxShadow: "0 0 8px rgba(79,70,229,0.6)" }} />
              </div>
              <div style={{ position: "absolute", inset: "-8px", borderRadius: "50%", animation: "a-spin-ccw 4.8s linear infinite" }}>
                <div style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "6px", height: "6px", backgroundColor: "#4F46E5", borderRadius: "50%", boxShadow: "0 0 7px rgba(79,70,229,0.5)" }} />
              </div>

              {/* Core */}
              <div style={{
                position: "absolute", inset: "40px", borderRadius: "50%",
                background: "#fff",
                boxShadow: "0 0 0 6px rgba(37,99,235,0.1), 0 0 30px rgba(37,99,235,0.35)",
                animation: "a-pulse-orb 2s ease-in-out infinite",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <LeapLogoIcon size={22} />
              </div>
            </div>

            {/* Label */}
            <div style={{ textAlign: "center" }}>
              <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.8rem", fontWeight: 500, color: "#0F172A", marginBottom: "0.3rem" }}>
                Neural Profile Engine
              </p>
              <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.66rem", fontWeight: 400, letterSpacing: "0.06em", color: "#94A3B8" }}>
                {bootPct < 100 ? "Initializing" : "Ready"} · {bootPct}%
              </p>
            </div>

            {/* Boot bar */}
            <div style={{ width: "160px" }}>
              <div style={{ height: "3px", backgroundColor: "#F1F5F9", borderRadius: "100px", overflow: "hidden" }}>
                <div style={{
                  width: `${bootPct}%`, height: "100%",
                  background: "linear-gradient(90deg, #2563EB, #4F46E5, #0EA5E9)",
                  borderRadius: "100px", transition: "width 0.08s linear",
                  boxShadow: "0 0 6px rgba(37,99,235,0.5)",
                }} />
              </div>
            </div>

            {/* Signal chips */}
            <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap", justifyContent: "center", maxWidth: "280px" }}>
              {["Semantic Engine", "47K+ Profiles", "ML Matching"].map((label, i) => (
                <span key={label} style={{
                  fontFamily: "'Inter',sans-serif", fontSize: "0.62rem", fontWeight: 400,
                  color: "#64748B", backgroundColor: "#F8FAFF",
                  border: "1px solid #E2E8F0", borderRadius: "100px",
                  padding: "3px 10px", animation: `a-fade-in 0.4s ease ${0.3 + i * 0.15}s both`,
                }}>
                  {label}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* ════ CHAT ════ */}
        {phase === "chat" && (
          <div style={{
            position: "absolute", inset: 0, overflowY: "auto",
            padding: "1rem 1.125rem",
            display: "flex", flexDirection: "column", gap: "0.875rem",
            animation: "a-fade-in 0.35s ease",
          }}>
            {/* Session pill */}
            <div style={{
              display: "flex", alignItems: "center", gap: "0.5rem",
              padding: "0.45rem 0.875rem",
              background: "rgba(37,99,235,0.05)", border: "1px solid rgba(37,99,235,0.12)",
              borderRadius: "8px", marginBottom: "0.125rem",
            }}>
              <Globe size={10} color="#4F46E5" />
              <span style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.62rem", fontWeight: 500, color: "#64748B", letterSpacing: "0.06em" }}>
                PROFILE CALIBRATION SESSION
              </span>
            </div>

            {/* AI msg 1 */}
            <div style={{ display: "flex", justifyContent: "flex-start", animation: "a-slide-up 0.3s ease" }}>
              <Bubble>{tw1.text}{!tw1.done && <Cursor />}</Bubble>
            </div>

            {/* User msg 1 */}
            {chatStep >= 1 && (
              <div style={{ display: "flex", justifyContent: "flex-end", animation: "a-slide-up 0.3s ease" }}>
                <UserBubble>{USER_MSG1}</UserBubble>
              </div>
            )}

            {/* AI msg 2 */}
            {chatStep >= 2 && (
              <div style={{ display: "flex", justifyContent: "flex-start", animation: "a-slide-up 0.3s ease" }}>
                <Bubble>{tw2.text}{!tw2.done && <Cursor />}</Bubble>
              </div>
            )}

            {/* User msg 2 */}
            {chatStep >= 3 && (
              <div style={{ display: "flex", justifyContent: "flex-end", animation: "a-slide-up 0.3s ease" }}>
                <UserBubble>{USER_MSG2}</UserBubble>
              </div>
            )}

            {/* Typing dots */}
            {((chatStep === 0 && !tw1.done) || (chatStep === 2 && !tw2.done)) && (
              <div style={{ display: "flex", gap: "4px", padding: "0.25rem 0 0.5rem" }}>
                {[0, 1, 2].map(i => (
                  <span key={i} style={{
                    width: "5px", height: "5px", backgroundColor: "#CBD5E1",
                    borderRadius: "50%", display: "inline-block",
                    animation: `a-typing-dot 1.2s ease-in-out ${i * 0.2}s infinite`,
                  }} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* ════ ANALYZE ════ */}
        {phase === "analyze" && (
          <div style={{
            position: "absolute", inset: 0,
            padding: "1.5rem 1.25rem",
            display: "flex", flexDirection: "column", gap: "1.25rem",
            animation: "a-fade-in 0.35s ease",
          }}>
            {/* Mini orb */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.875rem" }}>
              <div style={{ position: "relative", width: "62px", height: "62px" }}>
                <div style={{ position: "absolute", inset: 0, borderRadius: "50%", border: "1.5px solid #DBEAFE", borderTopColor: "#2563EB", animation: "a-spin-cw 2s linear infinite" }} />
                <div style={{ position: "absolute", inset: "12px", borderRadius: "50%", border: "1.5px solid #E0E7FF", borderRightColor: "#4F46E5", animation: "a-spin-ccw 1.5s linear infinite" }} />
                <div style={{ position: "absolute", inset: "22px", borderRadius: "50%", background: "#fff", boxShadow: "0 0 14px rgba(79,70,229,0.4)", animation: "a-pulse-orb 1.5s ease-in-out infinite", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <LeapLogoIcon size={16} />
                </div>
              </div>
              <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.63rem", fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase", color: "#94A3B8" }}>
                Neural Analysis
              </p>
            </div>

            {/* Task checklist */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
              {TASKS.map((task, i) => {
                const done = analyzePct >= task.threshold;
                return (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <div style={{
                      width: "18px", height: "18px", borderRadius: "50%", flexShrink: 0,
                      border: done ? "none" : "1.5px solid #E2E8F0",
                      backgroundColor: done ? "#4F46E5" : "transparent",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      transition: "all 0.4s cubic-bezier(.22,1,.36,1)",
                      boxShadow: done ? "0 0 8px rgba(37,99,235,0.35)" : "none",
                    }}>
                      {done && <span style={{ color: "#fff", fontSize: "0.5rem", fontWeight: 700 }}>✓</span>}
                    </div>
                    <p style={{
                      fontFamily: "'Inter',sans-serif", fontSize: "0.77rem", fontWeight: 400,
                      color: done ? "#334155" : "#CBD5E1",
                      transition: "color 0.4s",
                    }}>
                      {task.label}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Progress bar */}
            <div style={{ marginTop: "auto" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                <span style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.65rem", fontWeight: 400, color: "#94A3B8" }}>Analysis Progress</span>
                <span style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.65rem", fontWeight: 500, color: "#4F46E5" }}>{analyzePct}%</span>
              </div>
              <div style={{ height: "4px", backgroundColor: "#F1F5F9", borderRadius: "100px", overflow: "hidden" }}>
                <div style={{
                  width: `${analyzePct}%`, height: "100%",
                  background: "linear-gradient(90deg, #4F46E5, #6366F1, #0EA5E9)",
                  borderRadius: "100px", transition: "width 0.1s linear",
                  boxShadow: "0 0 6px rgba(37,99,235,0.4)",
                }} />
              </div>
            </div>
          </div>
        )}

        {/* ════ RESULTS ════ */}
        {phase === "results" && (
          <div style={{
            position: "absolute", inset: 0,
            padding: "1rem 1.125rem",
            display: "flex", flexDirection: "column", gap: "0.625rem",
            animation: "a-fade-in 0.35s ease",
          }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.125rem" }}>
              <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.62rem", fontWeight: 500, letterSpacing: "0.1em", color: "#94A3B8", textTransform: "uppercase" }}>
                Best-Fit Universities
              </p>
              <span style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.6rem", fontWeight: 400, color: "#CBD5E1" }}>
                94 profile signals
              </span>
            </div>

            {UNIVERSITIES.slice(0, shownResults).map((uni, i) => (
              <div key={i} style={{
                backgroundColor: "#FAFBFF",
                border: "1px solid #E8EEF8",
                borderRadius: "10px", padding: "0.75rem 0.875rem",
                display: "flex", alignItems: "center", gap: "0.75rem",
                animation: "a-slide-up 0.45s cubic-bezier(.22,1,.36,1)",
                cursor: "pointer", transition: "border-color 0.2s, background 0.2s, box-shadow 0.2s",
              }} className="hover:border-[#E0E7FF] hover:bg-white hover:shadow-sm">
                <span style={{ fontSize: "1.25rem", flexShrink: 0 }}>{uni.flag}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.77rem", fontWeight: 500, color: "#0F172A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", marginBottom: "2px" }}>
                    {uni.name}
                  </p>
                  <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.64rem", fontWeight: 400, color: "#94A3B8" }}>
                    {uni.program}
                  </p>
                </div>
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.82rem", fontWeight: 600, color: uni.color, letterSpacing: "-0.01em" }}>
                    {uni.match}%
                  </p>
                  <div style={{ width: "48px", height: "3px", backgroundColor: "#F1F5F9", borderRadius: "100px", overflow: "hidden", marginTop: "5px" }}>
                    <div style={{
                      width: `${uni.match}%`, height: "100%", backgroundColor: uni.color,
                      borderRadius: "100px", animation: "a-bar-fill 0.9s cubic-bezier(.22,1,.36,1)",
                      opacity: 0.7,
                    }} />
                  </div>
                </div>
              </div>
            ))}

            {shownResults >= UNIVERSITIES.length && (
              <a href="#" style={{
                display: "flex", alignItems: "center", justifyContent: "center",
                gap: "0.5rem", marginTop: "auto",
                padding: "0.75rem",
                background: "linear-gradient(135deg, #4338CA, #4F46E5)",
                borderRadius: "10px",
                fontFamily: "'Inter',sans-serif", fontSize: "0.75rem", fontWeight: 500,
                color: "#fff", textDecoration: "none",
                animation: "a-slide-up 0.45s ease",
                boxShadow: "0 4px 16px rgba(37,99,235,0.3)",
                transition: "opacity 0.15s",
              }} className="hover:opacity-90">
                View Full Analysis <ArrowRight size={13} />
              </a>
            )}
          </div>
        )}
      </div>

      {/* ── CSS keyframes ── */}
      <style>{`
        @keyframes a-spin-cw    { to { transform: rotate(360deg); } }
        @keyframes a-spin-ccw   { to { transform: rotate(-360deg); } }
        @keyframes a-pulse-orb  {
          0%,100% { box-shadow: 0 0 0 5px rgba(37,99,235,0.1), 0 0 20px rgba(37,99,235,0.3); }
          50%      { box-shadow: 0 0 0 10px rgba(37,99,235,0.06), 0 0 40px rgba(37,99,235,0.5); }
        }
        @keyframes a-pulse-live {
          0%,100% { opacity: 1; }
          50%      { opacity: 0.45; }
        }
        @keyframes a-fade-in    { from { opacity: 0; } to { opacity: 1; } }
        @keyframes a-slide-up   { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes a-bar-fill   { from { width: 0; } }
        @keyframes a-typing-dot {
          0%,60%,100% { transform: translateY(0); opacity: 0.3; }
          30%          { transform: translateY(-5px); opacity: 1; }
        }
        @keyframes a-blink      { 0%,100% { opacity: 1; } 50% { opacity: 0; } }
      `}</style>
    </div>
  );
}

// ─── Sub-components ──────────────────────────────────────────────────────────
function Bubble({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      backgroundColor: "#F8FAFF",
      border: "1px solid #E8EEF8",
      borderRadius: "0 10px 10px 10px",
      padding: "0.6rem 0.875rem",
      maxWidth: "248px",
      fontFamily: "'Inter',sans-serif", fontSize: "0.78rem", fontWeight: 400,
      color: "#334155", lineHeight: 1.6,
    }}>
      {children}
    </div>
  );
}

function UserBubble({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      background: "linear-gradient(135deg, #2563EB, #4F46E5)",
      borderRadius: "10px 0 10px 10px",
      padding: "0.6rem 0.875rem",
      maxWidth: "248px",
      fontFamily: "'Inter',sans-serif", fontSize: "0.78rem", fontWeight: 400,
      color: "#fff", lineHeight: 1.6,
      boxShadow: "0 2px 10px rgba(37,99,235,0.25)",
    }}>
      {children}
    </div>
  );
}

function Cursor() {
  return (
    <span style={{
      display: "inline-block",
      width: "1px", height: "0.9em",
      backgroundColor: "#2563EB",
      marginLeft: "2px",
      verticalAlign: "text-bottom",
      animation: "a-blink 0.85s step-start infinite",
    }} />
  );
}