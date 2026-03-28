import { useState, useEffect, useRef, useCallback } from "react";
import { X, ArrowRight, Send, RotateCcw, ChevronDown, Check } from "lucide-react";
import { LeapLogoIcon } from "./LeapLogoIcon";

// ─── AI Models ────────────────────────────────────────────────────────────────
const AI_MODELS = [
  { id: "gpt-4o",        label: "GPT-4o",          provider: "OpenAI",    color: "#10B981" },
  { id: "gpt-4o-mini",   label: "GPT-4o mini",      provider: "OpenAI",    color: "#10B981" },
  { id: "o3",            label: "o3",               provider: "OpenAI",    color: "#10B981" },
  { id: "claude-opus",   label: "Claude Opus 4",    provider: "Anthropic", color: "#F59E0B" },
  { id: "claude-sonnet", label: "Claude Sonnet 4",  provider: "Anthropic", color: "#F59E0B" },
  { id: "claude-haiku",  label: "Claude Haiku 3.5", provider: "Anthropic", color: "#F59E0B" },
  { id: "gemini-pro",    label: "Gemini 2.5 Pro",   provider: "Google",    color: "#3B82F6" },
  { id: "gemini-flash",  label: "Gemini 2.0 Flash", provider: "Google",    color: "#3B82F6" },
  { id: "llama-3.3",     label: "Llama 3.3",        provider: "Meta",      color: "#8B5CF6" },
  { id: "mistral",       label: "Mistral Large",    provider: "Mistral",   color: "#EC4899" },
];
const PROVIDERS = ["OpenAI", "Anthropic", "Google", "Meta", "Mistral"];

// ─── Conversation Flow ────────────────────────────────────────────────────────
const QUESTIONS = [
  {
    id: "degree",
    ai: "Hey! I'm LeapAI 👋 I'll help you find universities that genuinely fit you — not just rankings. First up: what level are you aiming for?",
    options: ["Undergraduate", "Master's", "PhD", "MBA"],
  },
  {
    id: "field",
    ai: "Great choice. What's your field of study?",
    options: ["Computer Science / Tech", "Business & Management", "Engineering", "Medicine & Health", "Design & Arts", "Law", "Other"],
  },
  {
    id: "country",
    ai: "Which countries are you considering? You can pick more than one — or just say 'anywhere great'.",
    options: ["USA 🇺🇸", "UK 🇬🇧", "Canada 🇨🇦", "Germany 🇩🇪", "Australia 🇦🇺", "Anywhere great ✨"],
  },
  {
    id: "gpa",
    ai: "What's your current academic score?",
    options: ["9+ CGPA  /  3.7+ GPA", "8–9 CGPA  /  3.3–3.7 GPA", "7–8 CGPA  /  3.0–3.3 GPA", "Below 7 CGPA  /  3.0 GPA"],
  },
  {
    id: "test",
    ai: "Any English proficiency or entrance test scores?",
    options: ["IELTS 7+", "TOEFL 100+", "GRE / GMAT taken", "Still preparing", "Not required for my target"],
  },
  {
    id: "funding",
    ai: "Last one — what's your funding preference?",
    options: ["Fully funded / scholarship", "Partial scholarship", "I can self-fund", "Open to all options"],
  },
];

const TASKS = [
  "Parsing your academic profile",
  "Matching against 10,000+ programs",
  "Checking scholarship eligibility",
  "Ranking by fit — not just prestige",
];

const RESULTS = [
  { flag: "🇺🇸", name: "Carnegie Mellon University", program: "MS Computer Science", match: 94 },
  { flag: "🇨🇦", name: "University of Toronto", program: "MS CS · Merit Aid Available", match: 91 },
  { flag: "🇩🇪", name: "TU Munich", program: "MSc Informatics · Tuition-Free", match: 88 },
  { flag: "🇺🇸", name: "UC San Diego", program: "MS Computer Science", match: 85 },
];

// ─── Types ────────────────────────────────────────────────────────────────────
type MsgRole = "ai" | "user";
interface Msg { role: MsgRole; text: string; id: number; }
type Stage = "chat" | "analyze" | "results";

// ─── Typewriter ───────────────────────────────────────────────────────────────
function useTypewriter(text: string, speed = 18, active = true) {
  const [out, setOut] = useState("");
  const ref = useRef<ReturnType<typeof setInterval> | null>(null);
  useEffect(() => {
    if (ref.current) clearInterval(ref.current);
    if (!active) { setOut(""); return; }
    let i = 0; setOut("");
    ref.current = setInterval(() => {
      i++; setOut(text.slice(0, i));
      if (i >= text.length && ref.current) clearInterval(ref.current);
    }, speed);
    return () => { if (ref.current) clearInterval(ref.current); };
  }, [text, speed, active]);
  return { out, done: out.length >= text.length };
}

// ─── Main Modal ───────────────────────────────────────────────────────────────
export function ProfileEvalModal({ onClose }: { onClose: () => void }) {
  const [stage, setStage]               = useState<Stage>("chat");
  // Only completed exchanges live here (messages that have been answered)
  const [history, setHistory]           = useState<Msg[]>([]);
  const [qIndex, setQIndex]             = useState(0);
  // "thinking" = dots; after thinking, currentQ text types out
  const [thinking, setThinking]         = useState(true);
  const [currentAIText, setCurrentAIText] = useState("");
  const [input, setInput]               = useState("");
  const [analyzePct, setAnalyzePct]     = useState(0);
  const [tasksDone, setTasksDone]       = useState(0);
  const [shownResults, setShownResults] = useState(0);
  const [answers, setAnswers]           = useState<string[]>([]);
  const [closed, setClosed]             = useState(false);
  const [selectedModel, setSelectedModel] = useState(AI_MODELS[0]);
  const [modelOpen, setModelOpen]         = useState(false);

  const bottomRef  = useRef<HTMLDivElement>(null);
  const inputRef   = useRef<HTMLInputElement>(null);
  const modelRef   = useRef<HTMLDivElement>(null);
  const msgCounter = useRef(0);

  // Close model dropdown on outside click
  useEffect(() => {
    function onOutside(e: MouseEvent) {
      if (modelRef.current && !modelRef.current.contains(e.target as Node)) {
        setModelOpen(false);
      }
    }
    if (modelOpen) document.addEventListener("mousedown", onOutside);
    return () => document.removeEventListener("mousedown", onOutside);
  }, [modelOpen]);

  // Typewriter for current question in bottom panel
  const { out: typedQuestion, done: typedDone } = useTypewriter(
    currentAIText, 16, !thinking && !!currentAIText
  );

  // Options appear after typewriter finishes
  const showOptions = typedDone && !thinking && stage === "chat" && qIndex < QUESTIONS.length && !!currentAIText;

  // Scroll history to bottom when new history entries appear
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  // Initial AI message
  useEffect(() => {
    const t = setTimeout(() => {
      askQuestion(QUESTIONS[0].ai);
    }, 400);
    return () => clearTimeout(t);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Analyze phase
  useEffect(() => {
    if (stage !== "analyze") return;
    let p = 0;
    const id = setInterval(() => {
      p += 1.4; setAnalyzePct(Math.min(Math.round(p), 100));
      if (p >= 100) { clearInterval(id); setTimeout(() => setStage("results"), 500); }
    }, 38);
    TASKS.forEach((_, i) => setTimeout(() => setTasksDone(i + 1), 600 + i * 900));
    return () => clearInterval(id);
  }, [stage]);

  // Results cascade
  useEffect(() => {
    if (stage !== "results") return;
    RESULTS.forEach((_, i) => setTimeout(() => setShownResults(i + 1), 300 + i * 380));
  }, [stage]);

  // Show dots for a moment, then reveal question via typewriter
  function askQuestion(text: string) {
    setThinking(true);
    setCurrentAIText("");
    const thinkTime = Math.min(text.length * 8 + 200, 1100);
    setTimeout(() => {
      setCurrentAIText(text);
      setThinking(false);
    }, thinkTime);
  }

  function commitAnswer(text: string) {
    if (thinking) return;
    const aiId   = msgCounter.current++;
    const userId = msgCounter.current++;
    // Move current Q + user answer into history
    setHistory(prev => [
      ...prev,
      { role: "ai",   text: currentAIText, id: aiId },
      { role: "user", text,                id: userId },
    ]);
    setCurrentAIText("");
    setAnswers(prev => [...prev, text]);

    if (qIndex + 1 < QUESTIONS.length) {
      const nextIdx = qIndex + 1;
      setQIndex(nextIdx);
      askQuestion(QUESTIONS[nextIdx].ai);
    } else {
      // Final wrap-up
      setThinking(true);
      setTimeout(() => {
        const wrapId = msgCounter.current++;
        setHistory(prev => [...prev, {
          role: "ai",
          text: "Perfect — I have everything I need. Analysing your profile now…",
          id: wrapId,
        }]);
        setCurrentAIText("");
        setThinking(false);
        setTimeout(() => setStage("analyze"), 1000);
      }, 700);
    }
  }

  function handleOption(opt: string) {
    if (thinking || !typedDone) return;
    commitAnswer(opt);
    setInput("");
  }

  function handleSend() {
    const val = input.trim();
    if (!val || thinking) return;
    setInput("");
    commitAnswer(val);
    inputRef.current?.focus();
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === "Enter") handleSend();
  }

  function handleClose() {
    setClosed(true);
    setTimeout(onClose, 280);
  }

  const handleReset = useCallback(() => {
    setStage("chat"); setHistory([]); setQIndex(0);
    setThinking(true); setCurrentAIText("");
    setInput(""); setAnalyzePct(0); setTasksDone(0); setShownResults(0); setAnswers([]);
    msgCounter.current = 0;
    setTimeout(() => askQuestion(QUESTIONS[0].ai), 400);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const currentQ = QUESTIONS[Math.min(qIndex, QUESTIONS.length - 1)];

  return (
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        display: "flex", alignItems: "center", justifyContent: "center",
        backgroundColor: "rgba(15,23,42,0.6)",
        backdropFilter: "blur(6px)",
        animation: closed ? "modal-fade-out 0.28s ease forwards" : "modal-fade-in 0.3s ease",
      }}
      onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
    >
      <div
        style={{
          width: "100%", maxWidth: "600px",
          height: "min(88vh, 720px)",
          backgroundColor: "#fff",
          borderRadius: "20px",
          overflow: "hidden",
          display: "flex", flexDirection: "column",
          boxShadow: "0 32px 80px rgba(15,23,42,0.22), 0 0 0 1px rgba(37,99,235,0.08)",
          margin: "0 1rem",
          animation: closed ? "modal-slide-out 0.28s ease forwards" : "modal-slide-in 0.38s cubic-bezier(.22,1,.36,1)",
        }}
      >
        {/* ── Header ── */}
        <div style={{
          height: "60px", borderBottom: "1px solid #F1F5F9",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "0 1.25rem", flexShrink: 0,
          backgroundColor: "#fff",
        }}>
          {/* Left – LeapAI brand */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
            <LeapLogoIcon size={36} shadow border />
            <div>
              <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.8rem", fontWeight: 600, color: "#0F172A", lineHeight: 1.1, margin: 0 }}>
                LeapAI Advisor
              </p>
              <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.6rem", color: "#94A3B8", margin: 0 }}>
                {stage === "chat" ? `Step ${Math.min(qIndex + 1, QUESTIONS.length)} of ${QUESTIONS.length}` : stage === "analyze" ? "Analysing your profile…" : "Your personalised shortlist"}
              </p>
            </div>
          </div>

          {/* Right – signed-in profile + controls */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            {/* Progress pills */}
            <div style={{ display: "flex", gap: "4px" }}>
              {QUESTIONS.map((_, i) => (
                <div key={i} style={{
                  height: "3px", width: i < qIndex || stage !== "chat" ? "14px" : i === qIndex ? "22px" : "8px",
                  borderRadius: "100px",
                  backgroundColor: i < qIndex || stage !== "chat" ? "#4F46E5" : i === qIndex ? "#A5B4FC" : "#E2E8F0",
                  transition: "all 0.4s cubic-bezier(.22,1,.36,1)",
                }} />
              ))}
            </div>

            {/* Signed-in profile pill */}
            

            {stage === "results" && (
              <button onClick={handleReset} style={{
                background: "none", border: "none", cursor: "pointer", padding: "4px",
                color: "#94A3B8", display: "flex", alignItems: "center", borderRadius: "6px",
                transition: "color 0.15s",
              }} title="Start over" className="hover:!text-[#4F46E5]">
                <RotateCcw size={14} />
              </button>
            )}

            <button onClick={handleClose} style={{
              background: "none", border: "none", cursor: "pointer",
              width: "30px", height: "30px", borderRadius: "8px",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "#94A3B8", transition: "background 0.15s, color 0.15s",
            }} className="hover:bg-slate-100 hover:!text-slate-600">
              <X size={16} />
            </button>
          </div>
        </div>

        {/* ── Body ── */}
        <div style={{ flex: 1, overflow: "hidden", position: "relative" }}>

          {/* ── CHAT STAGE ── */}
          {stage === "chat" && (
            <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>

              {/* ── History scroll (completed Q&A pairs) ── */}
              <div style={{
                flex: 1, overflowY: "auto", padding: "1.25rem 1.25rem 0.5rem",
                display: "flex", flexDirection: "column", gap: "0.875rem",
                position: "relative",
                scrollbarWidth: "none",
              }}>
                {history.map((m) => (
                  <MessageBubble key={m.id} msg={m} />
                ))}
                <div ref={bottomRef} />
                {/* Fade-out gradient at the bottom of history */}
                {history.length > 0 && (
                  null
                )}
              </div>

              {/* ── Claude-style bottom panel ── */}
              <div style={{
                borderTop: history.length > 0 ? "1px solid #F1F5F9" : "none",
                backgroundColor: "#fff",
                flexShrink: 0,
                display: "flex", flexDirection: "column",
                boxShadow: history.length > 0 ? "0 -8px 24px rgba(15,23,42,0.07)" : "none",
              }}>

                {/* Current question area */}
                <div style={{
                  padding: "1rem 1.25rem 0",
                  display: "flex", gap: "0.625rem", alignItems: "flex-start",
                  minHeight: "52px",
                }}>
                  {/* LeapAI avatar */}
                  <div style={{ flexShrink: 0, marginTop: "1px" }}>
                    <LeapLogoIcon size={28} shadow border />
                  </div>

                  {/* Thinking dots OR typewriter text */}
                  <div style={{ flex: 1, paddingTop: "3px" }}>
                    {thinking ? (
                      <div style={{ display: "flex", gap: "5px", alignItems: "center", height: "24px" }}>
                        {[0, 1, 2].map(i => (
                          <span key={i} style={{
                            width: "6px", height: "6px", backgroundColor: "#CBD5E1",
                            borderRadius: "50%", display: "inline-block",
                            animation: `pe-dot 1.2s ease-in-out ${i * 0.18}s infinite`,
                          }} />
                        ))}
                      </div>
                    ) : (
                      <p style={{
                        fontFamily: "'Inter',sans-serif", fontSize: "0.875rem", fontWeight: 400,
                        color: "#0F172A", lineHeight: 1.6, margin: 0,
                        animation: "pe-fade 0.2s ease",
                      }}>
                        {typedQuestion}
                        {/* blinking cursor while typing */}
                        {!typedDone && (
                          <span style={{
                            display: "inline-block", width: "1.5px", height: "1em",
                            backgroundColor: "#4F46E5", marginLeft: "1px",
                            verticalAlign: "text-bottom",
                            animation: "pe-blink 0.7s ease-in-out infinite",
                          }} />
                        )}
                      </p>
                    )}
                  </div>
                </div>

                {/* Option chips — appear after typewriter finishes */}
                {showOptions && (
                  <div style={{
                    padding: "0.625rem 1.25rem 0",
                    display: "flex", flexDirection: "column", gap: "0.35rem",
                    paddingLeft: "calc(1.25rem + 28px + 0.625rem)",
                    animation: "pe-slide 0.3s cubic-bezier(.22,1,.36,1)",
                  }}>
                    {currentQ.options.map((opt, i) => (
                      <button
                        key={opt}
                        onClick={() => handleOption(opt)}
                        style={{
                          border: "1px solid #E8EEF8",
                          backgroundColor: "#F8FAFF",
                          color: "#334155",
                          fontFamily: "'Inter',sans-serif", fontSize: "0.8rem",
                          fontWeight: 400,
                          padding: "0.5rem 0.875rem",
                          borderRadius: "10px",
                          cursor: "pointer", lineHeight: 1.45,
                          textAlign: "left",
                          display: "flex", alignItems: "center", justifyContent: "space-between",
                          gap: "0.5rem",
                          transition: "all 0.15s",
                          animation: `pe-slide 0.28s cubic-bezier(.22,1,.36,1) ${i * 0.04}s both`,
                          boxShadow: "0 1px 2px rgba(15,23,42,0.04)",
                        }}
                        className="hover:!border-[#2563EB] hover:!text-[#1D4ED8] hover:!bg-[#EFF6FF]"
                      >
                        <span>{opt}</span>
                        <ArrowRight size={12} style={{ flexShrink: 0, opacity: 0.35 }} />
                      </button>
                    ))}
                  </div>
                )}

                {/* Input row */}
                <div style={{
                  padding: "0.75rem 1.25rem 1rem",
                  display: "flex", gap: "0.5rem", alignItems: "center",
                }}>
                  {/* ── Model selector ── */}
                  <div ref={modelRef} style={{ position: "relative", flexShrink: 0 }}>
                    <button
                      onClick={() => setModelOpen(v => !v)}
                      style={{
                        display: "flex", alignItems: "center", gap: "5px",
                        padding: "0 8px",
                        height: "38px",
                        backgroundColor: modelOpen ? "#EEF2FF" : "#F8FAFC",
                        border: `1px solid ${modelOpen ? "#C7D2FE" : "#E8EEF8"}`,
                        borderRadius: "10px",
                        cursor: "pointer",
                        transition: "all 0.15s",
                        whiteSpace: "nowrap",
                      }}
                      title="Switch AI model"
                    >
                      <span style={{
                        width: "7px", height: "7px", borderRadius: "50%", flexShrink: 0,
                        backgroundColor: selectedModel.color,
                        boxShadow: `0 0 5px ${selectedModel.color}80`,
                      }} />
                      <span style={{
                        fontFamily: "'Inter',sans-serif",
                        fontSize: "0.68rem", fontWeight: 600,
                        color: "#334155",
                        maxWidth: "72px",
                        overflow: "hidden", textOverflow: "ellipsis",
                      }}>
                        {selectedModel.label}
                      </span>
                      <ChevronDown
                        size={10} color="#94A3B8"
                        style={{
                          transform: modelOpen ? "rotate(180deg)" : "rotate(0deg)",
                          transition: "transform 0.2s", flexShrink: 0,
                        }}
                      />
                    </button>

                    {/* Dropdown */}
                    {modelOpen && (
                      <div style={{
                        position: "absolute",
                        bottom: "calc(100% + 6px)",
                        left: 0,
                        width: "200px",
                        backgroundColor: "#fff",
                        border: "1px solid #E2E8F0",
                        borderRadius: "12px",
                        boxShadow: "0 -4px 24px rgba(15,23,42,0.1), 0 8px 24px rgba(15,23,42,0.08)",
                        overflow: "hidden",
                        zIndex: 200,
                        animation: "pe-fade 0.15s ease",
                      }}>
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
                        <div style={{ maxHeight: "260px", overflowY: "auto", padding: "4px 0", scrollbarWidth: "none" }}>
                          {PROVIDERS.map(provider => {
                            const group = AI_MODELS.filter(m => m.provider === provider);
                            return (
                              <div key={provider}>
                                <p style={{
                                  fontFamily: "'Inter',sans-serif",
                                  fontSize: "0.56rem", fontWeight: 600,
                                  letterSpacing: "0.08em", textTransform: "uppercase",
                                  color: "#CBD5E1", padding: "6px 12px 3px", margin: 0,
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
                                        background: active ? `${model.color}14` : "none",
                                        border: "none", cursor: "pointer", textAlign: "left",
                                        transition: "background 0.12s",
                                      }}
                                      className="hover:bg-slate-50"
                                    >
                                      <span style={{
                                        width: "7px", height: "7px", borderRadius: "50%", flexShrink: 0,
                                        backgroundColor: model.color,
                                      }} />
                                      <span style={{
                                        fontFamily: "'Inter',sans-serif",
                                        fontSize: "0.72rem", fontWeight: active ? 600 : 400,
                                        color: active ? "#1E1B4B" : "#334155", flex: 1,
                                      }}>
                                        {model.label}
                                      </span>
                                      {active && <Check size={10} color={model.color} strokeWidth={2.5} />}
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

                  <input
                    ref={inputRef}
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={handleKey}
                    placeholder={
                      thinking
                        ? "LeapAI is thinking…"
                        : !typedDone
                        ? ""
                        : showOptions
                        ? "or something else…"
                        : "Type your answer…"
                    }
                    disabled={thinking || !typedDone}
                    style={{
                      flex: 1,
                      fontFamily: "'Inter',sans-serif", fontSize: "0.82rem", fontWeight: 400,
                      color: "#0F172A",
                      backgroundColor: "#F8FAFF",
                      border: "1px solid #E8EEF8",
                      borderRadius: "10px",
                      padding: "0.625rem 1rem",
                      outline: "none",
                      transition: "border-color 0.15s, background 0.15s",
                    }}
                    className="focus:!border-[#4F46E5] focus:!bg-white"
                  />
                  <button
                    onClick={handleSend}
                    disabled={!input.trim() || thinking}
                    style={{
                      width: "38px", height: "38px", borderRadius: "10px",
                      background: input.trim() && !thinking ? "linear-gradient(135deg,#4338CA,#4F46E5)" : "#F1F5F9",
                      border: "none", cursor: input.trim() && !thinking ? "pointer" : "default",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      flexShrink: 0, transition: "all 0.2s",
                    }}
                  >
                    <Send size={15} color={input.trim() && !thinking ? "#fff" : "#CBD5E1"} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ── ANALYZE STAGE ── */}
          {stage === "analyze" && (
            <div style={{
              height: "100%", display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center",
              padding: "2rem", gap: "2rem",
              animation: "pe-fade 0.4s ease",
            }}>
              {/* Spinning orb */}
              <div style={{ position: "relative", width: "100px", height: "100px" }}>
                <div style={{ position: "absolute", inset: 0, borderRadius: "50%", border: "1.5px solid #DBEAFE", borderTopColor: "#2563EB", animation: "pe-spin 2s linear infinite" }} />
                <div style={{ position: "absolute", inset: "16px", borderRadius: "50%", border: "1.5px solid #E0E7FF", borderRightColor: "#4F46E5", animation: "pe-spin-r 1.6s linear infinite" }} />
                <div style={{
                  position: "absolute", inset: "28px", borderRadius: "50%",
                  background: "#fff",
                  boxShadow: "0 0 20px rgba(37,99,235,0.4)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  animation: "pe-orb-pulse 2s ease-in-out infinite",
                }}>
                  <LeapLogoIcon size={24} />
                </div>
              </div>

              <div style={{ width: "100%", maxWidth: "360px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "1.75rem" }}>
                  {TASKS.map((task, i) => {
                    const done = i < tasksDone;
                    return (
                      <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                        <div style={{
                          width: "20px", height: "20px", borderRadius: "50%", flexShrink: 0,
                          border: done ? "none" : "1.5px solid #E2E8F0",
                          backgroundColor: done ? "#4F46E5" : "transparent",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          transition: "all 0.4s cubic-bezier(.22,1,.36,1)",
                          boxShadow: done ? "0 0 8px rgba(37,99,235,0.3)" : "none",
                        }}>
                          {done && <span style={{ color: "#fff", fontSize: "0.55rem", fontWeight: 700 }}>✓</span>}
                        </div>
                        <p style={{
                          fontFamily: "'Inter',sans-serif", fontSize: "0.82rem",
                          color: done ? "#334155" : "#CBD5E1",
                          transition: "color 0.4s", margin: 0,
                        }}>
                          {task}
                        </p>
                      </div>
                    );
                  })}
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                  <span style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.68rem", color: "#94A3B8" }}>Analysing</span>
                  <span style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.68rem", fontWeight: 500, color: "#4F46E5" }}>{analyzePct}%</span>
                </div>
                <div style={{ height: "3px", backgroundColor: "#F1F5F9", borderRadius: "100px", overflow: "hidden" }}>
                  <div style={{
                    width: `${analyzePct}%`, height: "100%",
                    background: "linear-gradient(90deg,#4F46E5,#6366F1,#0EA5E9)",
                    borderRadius: "100px", transition: "width 0.1s linear",
                    boxShadow: "0 0 6px rgba(37,99,235,0.4)",
                  }} />
                </div>
              </div>
            </div>
          )}

          {/* ── RESULTS STAGE ── */}
          {stage === "results" && (
            <div style={{
              height: "100%", overflowY: "auto",
              padding: "1.25rem",
              display: "flex", flexDirection: "column", gap: "0.75rem",
              animation: "pe-fade 0.4s ease",
              scrollbarWidth: "none",
            }}>
              <div style={{ marginBottom: "0.25rem" }}>
                <p style={{
                  fontFamily: "'Playfair Display',Georgia,serif",
                  fontSize: "1.3rem", fontWeight: 700, color: "#0F172A",
                  letterSpacing: "-0.02em", margin: "0 0 0.3rem",
                }}>
                  Your Shortlist
                </p>
                <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.76rem", color: "#94A3B8", margin: 0 }}>
                  Matched across 10,000+ programs · Ranked by real fit
                </p>
              </div>

              {RESULTS.slice(0, shownResults).map((uni, i) => (
                <div key={i} style={{
                  border: "1px solid #E8EEF8", borderRadius: "12px",
                  padding: "0.875rem 1rem",
                  display: "flex", alignItems: "center", gap: "0.875rem",
                  backgroundColor: "#FAFBFF",
                  animation: "pe-slide 0.4s cubic-bezier(.22,1,.36,1)",
                  cursor: "pointer", transition: "border-color 0.2s, box-shadow 0.2s",
                }} className="hover:border-[#E0E7FF] hover:shadow-sm">
                  <span style={{ fontSize: "1.5rem", flexShrink: 0 }}>{uni.flag}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.84rem", fontWeight: 500, color: "#0F172A", margin: "0 0 2px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {uni.name}
                    </p>
                    <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.68rem", color: "#94A3B8", margin: 0 }}>
                      {uni.program}
                    </p>
                  </div>
                  <div style={{ textAlign: "right", flexShrink: 0 }}>
                    <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.9rem", fontWeight: 600, color: "#4F46E5", margin: "0 0 4px", letterSpacing: "-0.01em" }}>
                      {uni.match}%
                    </p>
                    <div style={{ width: "48px", height: "3px", backgroundColor: "#EEF2FF", borderRadius: "100px", overflow: "hidden" }}>
                      <div style={{ width: `${uni.match}%`, height: "100%", backgroundColor: "#4F46E5", borderRadius: "100px", opacity: 0.7, animation: "pe-bar 0.8s cubic-bezier(.22,1,.36,1)" }} />
                    </div>
                  </div>
                </div>
              ))}

              {shownResults >= RESULTS.length && (
                <div style={{ marginTop: "0.5rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  <a
                    href="#"
                    style={{
                      display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem",
                      padding: "0.875rem",
                      background: "linear-gradient(135deg,#1D4ED8,#4F46E5)",
                      borderRadius: "12px",
                      fontFamily: "'Inter',sans-serif", fontSize: "0.8rem", fontWeight: 500,
                      color: "#fff", textDecoration: "none",
                      boxShadow: "0 4px 18px rgba(37,99,235,0.28)",
                      animation: "pe-slide 0.4s ease",
                      transition: "opacity 0.15s",
                    }}
                    className="hover:opacity-90"
                  >
                    Talk to a LeapScholar Counsellor <ArrowRight size={14} />
                  </a>
                  <button
                    onClick={handleReset}
                    style={{
                      background: "none", border: "1px solid #E2E8F0", borderRadius: "12px",
                      padding: "0.75rem", cursor: "pointer",
                      fontFamily: "'Inter',sans-serif", fontSize: "0.76rem", color: "#64748B",
                      transition: "border-color 0.15s, color 0.15s",
                    }}
                    className="hover:border-[#2563EB] hover:!text-[#2563EB]"
                  >
                    Start a new evaluation
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes modal-fade-in   { from { opacity: 0; } to { opacity: 1; } }
        @keyframes modal-fade-out  { from { opacity: 1; } to { opacity: 0; } }
        @keyframes modal-slide-in  { from { opacity: 0; transform: scale(0.96) translateY(16px); } to { opacity: 1; transform: scale(1) translateY(0); } }
        @keyframes modal-slide-out { from { opacity: 1; transform: scale(1) translateY(0); } to { opacity: 0; transform: scale(0.96) translateY(8px); } }
        @keyframes pe-fade   { from { opacity: 0; } to { opacity: 1; } }
        @keyframes pe-slide  { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pe-dot    { 0%,60%,100% { transform: translateY(0); opacity: 0.35; } 30% { transform: translateY(-5px); opacity: 1; } }
        @keyframes pe-blink  { 0%,100% { opacity: 1; } 50% { opacity: 0; } }
        @keyframes pe-spin   { to { transform: rotate(360deg); } }
        @keyframes pe-spin-r { to { transform: rotate(-360deg); } }
        @keyframes pe-orb-pulse {
          0%,100% { box-shadow: 0 0 0 5px rgba(37,99,235,0.1), 0 0 20px rgba(37,99,235,0.3); }
          50%      { box-shadow: 0 0 0 10px rgba(37,99,235,0.06), 0 0 40px rgba(37,99,235,0.45); }
        }
        @keyframes pe-bar { from { width: 0; } }
      `}</style>
    </div>
  );
}

// ─── Message Bubble (history only) ───────────────────────────────────────────
function MessageBubble({ msg }: { msg: Msg }) {
  if (msg.role === "user") {
    return (
      <div style={{ display: "flex", justifyContent: "flex-end", animation: "pe-slide 0.3s ease" }}>
        <div style={{
          background: "linear-gradient(135deg,#2563EB,#4F46E5)",
          borderRadius: "14px 2px 14px 14px",
          padding: "0.6rem 0.95rem",
          maxWidth: "72%",
          fontFamily: "'Inter',sans-serif", fontSize: "0.82rem", fontWeight: 400,
          color: "#fff", lineHeight: 1.55,
          boxShadow: "0 2px 10px rgba(37,99,235,0.22)",
        }}>
          {msg.text}
        </div>
      </div>
    );
  }
  return (
    <div style={{ display: "flex", justifyContent: "flex-start", gap: "0.5rem", animation: "pe-slide 0.3s ease" }}>
      <LeapLogoIcon size={26} shadow border />
      <div style={{
        backgroundColor: "#F8FAFF", border: "1px solid #E8EEF8",
        borderRadius: "2px 14px 14px 14px",
        padding: "0.6rem 0.95rem",
        maxWidth: "72%",
        fontFamily: "'Inter',sans-serif", fontSize: "0.82rem", fontWeight: 400,
        color: "#334155", lineHeight: 1.6,
      }}>
        {msg.text}
      </div>
    </div>
  );
}