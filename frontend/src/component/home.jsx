import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const scenarios = [
  {
    id: "01",
    icon: "🏛",
    title: "Walk Into the Past",
    desc: "Call Julius Caesar, Cleopatra, and Genghis Khan into one room. Let them narrate their own stories in their own voice, with their own agenda.",
    tags: ["Caesar", "Napoleon", "Cleopatra", "Gandhi"],
  },
  {
    id: "02",
    icon: "⚡",
    title: "Where Laws Are Made",
    desc: "Seat the lawmakers together. Watch economists argue with philosophers, hawks clash with doves, and policies unfold without PR filters.",
    tags: ["Keynes", "Thatcher", "Lincoln", "Rawls"],
  },
  {
    id: "03",
    icon: "🎯",
    title: "Face the Panel",
    desc: "Simulate personal interviews and GD rounds with mentors, critics, and devil's advocates who push your thinking until it becomes sharp.",
    tags: ["Hiring Manager", "Mentor", "Critic"],
  },
  {
    id: "04",
    icon: "🌍",
    title: "The Drama They Never Allowed",
    desc: "Put world leaders in one room and let geopolitics unfold without handlers, diplomatic filters, or talking points.",
    tags: ["Trump", "Khamenei", "Zelensky", "Macron"],
    highlight: true,
  },
  {
    id: "05",
    icon: "💼",
    title: "Your Personal Think Tank",
    desc: "Assemble a boardroom of strategists, operators, and contrarians to tear apart your idea before the market does.",
    tags: ["Strategist", "Finance Lead", "Growth Hacker", "Critic"],
  },
];

const modes = [
  { icon: "⚔", name: "Combat Mode", desc: "Turn-based debate with judging, scoring, verdicts, and competitive replay loops." },
  { icon: "🎓", name: "Mentor Mode", desc: "The orchestrator selects teachers who critique, guide, and improve your reasoning." },
  { icon: "⚡", name: "Fast Orchestration", desc: "Deterministic low-latency pacing for quick drills and predictable turn rotation." },
  { icon: "🧠", name: "Dynamic Orchestration", desc: "Relevance and fairness aware agent selection for deeper, more coherent sessions." },
  { icon: "🎭", name: "Persona Routing", desc: "Different agents can run on different model backends and still share one room." },
  { icon: "📜", name: "Verdict & Export", desc: "Generate round verdicts, final reasoning, and downloadable debate summaries." },
];

const steps = [
  { label: "Pick Your Arena", desc: "Choose a mode: Combat, Mentor, Interview, or free-form debate." },
  { label: "Assemble Council", desc: "Draft your roster from historical figures, experts, politicians, or custom personas." },
  { label: "Set the Topic", desc: "Drop in any question, case, policy, or scenario — real or hypothetical." },
  { label: "Watch Them Argue", desc: "The orchestrator routes turns, agents respond in persona, and you guide the session." },
];

function useReveal() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return [ref, isVisible];
}

function HomePage() {
  const [heroRef, heroVisible] = useReveal();
  const [statsRef, statsVisible] = useReveal();
  const [scenariosRef, scenariosVisible] = useReveal();
  const [howRef, howVisible] = useReveal();
  const [modesRef, modesVisible] = useReveal();
  const [startRef, startVisible] = useReveal();

  return (
    <main className="bg-[#12100d] text-[#f4f0e0] w-full">
      <section ref={heroRef} className={`relative flex flex-col overflow-hidden bg-[#12100d] reveal ${heroVisible ? "visible" : ""}`}>
        {/* Cinematic Blurred Blobs */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(218,180,78,0.18)_0%,transparent_75%)] blur-[100px]" />
        <div className="pointer-events-none absolute -left-[10%] top-[10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(230,106,61,0.06)_0%,transparent_75%)] blur-[120px] animate-pulse" />
        <div className="pointer-events-none absolute -right-[10%] bottom-[20%] h-[550px] w-[550px] rounded-full bg-[radial-gradient(circle,rgba(218,180,78,0.08)_0%,transparent_75%)] blur-[110px]" />


        <div className="flex flex-col h-[80vh]  items-center justify-center px-6 py-16 text-center">
          <div className="mb-6 flex items-center gap-4">
            <div className="h-px w-24 bg-[rgba(218,180,78,0.4)]" />
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[rgba(218,180,78,0.6)] text-[18px] text-[#dab44e] shadow-[0_0_20px_rgba(218,180,78,0.2)]">
              ⚖
            </div>
            <div className="h-px w-24 bg-[rgba(218,180,78,0.4)]" />
          </div>
          <p
            className="mb-4 text-[9px] uppercase tracking-[0.4em] text-[#7a6027]"
            style={{ fontFamily: '"Cinzel", serif' }}
          >
            Multi-Agent Intelligence Platform
          </p>
          <h1
            className="mb-4 text-[clamp(2.8rem,8vw,5.5rem)] font-black leading-[0.95] tracking-[-0.02em] text-[#f0e8d0]"
            style={{ fontFamily: '"Cinzel", serif' }}
          >
            LLM <span className="text-[#c9a94a]">Council</span>
          </h1>
          <p
            className="mb-5 text-[clamp(0.65rem,1.5vw,0.85rem)] tracking-[0.25em] text-[rgba(218,180,78,0.75)]"
            style={{ fontFamily: '"Cinzel", serif' }}
          >
            What is better — the smart LLM, or a team of smart agents?
          </p>
          <p className="mb-8 max-w-[520px] text-[clamp(1rem,2.2vw,1.3rem)] font-light italic leading-[1.6] text-[rgba(244,240,224,0.65)]">
            Assemble history&apos;s greatest minds, world leaders, and expert panels. Watch them argue, teach, and illuminate in one room.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              to="/agents"
              className="homeLinkPrimary"
            >
              Convene a Council ↗
            </Link>
            <a
              href="#modes"
              className="homeLinkSecondary"
            >
              Explore Modes
            </a>
          </div>
        </div>

        <div ref={statsRef} className={`flex flex-wrap border-t border-[rgba(218,180,78,0.2)] bg-[rgba(255,255,255,0.02)] reveal ${statsVisible ? "visible" : ""}`}>
          {[
            ["5+", "Arena Modes"],
            ["∞", "Persona Types"],
            ["4", "LLM Providers"],
            ["Live", "AI Judging"],
          ].map(([value, label]) => (
            <div
              key={label}
              className="min-w-[50%] flex-1 border-r border-[rgba(201,169,74,0.1)] px-6 py-4 text-center last:border-r-0 sm:min-w-0"
            >
              <span
                className="mb-1 block text-[clamp(1.1rem,2.5vw,1.5rem)] leading-none text-[#c9a94a]"
                style={{ fontFamily: '"Cinzel", serif' }}
              >
                {value}
              </span>
              <span
                className="text-[8px] uppercase tracking-[0.25em] text-[rgba(240,232,208,0.3)]"
                style={{ fontFamily: '"Cinzel", serif' }}
              >
                {label}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-[rgba(218,180,78,0.25)] bg-[#1a1714] px-6 py-16 text-center shadow-[inset_0_0_50px_rgba(218,180,78,0.02)]">
        <p
          className="mx-auto max-w-[680px] text-[clamp(1.1rem,2.8vw,1.9rem)] leading-[1.5] text-[#f0e8d0]"
          style={{ fontFamily: '"Cinzel", serif' }}
        >
          A single smart model gives you <span className="text-[#c9a94a]">one perspective.</span>
          <br />
          A council of smart agents gives you <span className="text-[#c9a94a]">the truth.</span>
        </p>
        <p className="mt-3 text-base italic text-[rgba(240,232,208,0.4)]">
          Stop consulting a single opinion. Convene the greatest minds in history or the sharpest experts alive.
        </p>
      </section>

      <section id="scenarios" ref={scenariosRef} className={`w-full px-12 py-24 reveal ${scenariosVisible ? "visible" : ""}`}>
        <p
          className="mb-2 text-center text-[10px] uppercase tracking-[0.35em] text-[#7a6027]"
          style={{ fontFamily: '"Cinzel", serif' }}
        >
          What Will You Do With It
        </p>
        <h2
          className="mb-14 text-center text-[clamp(1.6rem,4vw,2.6rem)] leading-[1.2] text-[#f0e8d0]"
          style={{ fontFamily: '"Cinzel", serif' }}
        >
          Five Chambers.
          <br />
          Infinite Conversations.
        </h2>

        <div className="grid gap-px border border-[rgba(201,169,74,0.12)] bg-[rgba(201,169,74,0.1)] md:grid-cols-2 xl:grid-cols-3">
          {scenarios.map((item) => (
            <article
              key={item.id}
              className={`group relative block bg-[#0d0b07] px-8 py-10 transition hover:bg-[#110e08] ${
                item.highlight ? "border-l-2 border-[#e05c2a]" : ""
              }`}
            >
              <span
                className={`mb-5 block text-[10px] uppercase tracking-[0.3em] ${
                  item.highlight ? "text-[#e05c2a]" : "text-[#7a6027]"
                }`}
                style={{ fontFamily: '"Cinzel", serif' }}
              >
                {item.id} — {item.id === "04" ? "World Stage ★ Fan Favourite" : item.id === "01" ? "History Chamber" : item.id === "02" ? "Politics Chamber" : item.id === "03" ? "Interview Arena" : "Expert Boardroom"}
              </span>
              <span className="mb-4 block text-[26px]">{item.icon}</span>
              <p className="mb-3 text-base font-semibold leading-[1.3] text-[#f0e8d0]" style={{ fontFamily: '"Cinzel", serif' }}>
                {item.title}
              </p>
              <p className="text-[0.95rem] leading-[1.65] text-[rgba(240,232,208,0.5)]">{item.desc}</p>
              <div className="mt-5 flex flex-wrap gap-1.5">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="border border-[rgba(201,169,74,0.25)] px-2.5 py-1 text-[9px] tracking-[0.15em] text-[#7a6027]"
                    style={{ fontFamily: '"Cinzel", serif' }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <span className="absolute bottom-8 right-8 translate-x-[-6px] text-base text-[#c9a94a] opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100">
                →
              </span>
            </article>
          ))}
        </div>
      </section>

      <section id="how" ref={howRef} className={`border-t border-[rgba(218,180,78,0.12)] bg-[#1a1714] px-12 py-32 reveal ${howVisible ? "visible" : ""}`}>
        <p
          className="mb-2 text-center text-[10px] uppercase tracking-[0.4em] text-[#7a6027]"
          style={{ fontFamily: '"Cinzel", serif' }}
        >
          The Process
        </p>
        <h2
          className="mb-20 text-center text-[clamp(1.8rem,4.5vw,2.8rem)] font-bold text-[#f4f0e0]"
          style={{ fontFamily: '"Cinzel", serif' }}
        >
          How a Session Unfolds
        </h2>
        <div className="relative mx-auto mt-24 flex flex-col md:flex-row justify-between items-start gap-12 md:gap-4 lg:gap-8 max-w-[1400px]">
          <div className="absolute left-[10%] right-[10%] top-10 hidden h-[1px] bg-[rgba(218,180,78,0.35)] md:block" />
          {steps.map((step, index) => (
            <div key={step.label} className="relative z-[2] flex-1 px-4 text-center">
              <div
                className="mx-auto mb-10 flex h-20 w-20 items-center justify-center rounded-full border-2 border-[rgba(218,180,78,0.5)] bg-[#1a1714] text-xl font-bold text-[#dab44e] shadow-[0_0_40px_rgba(218,180,78,0.15)] transition-all hover:scale-110 hover:border-[#dab44e]"
                style={{ fontFamily: '"Cinzel", serif' }}
              >
                {["I", "II", "III", "IV"][index]}
              </div>
              <h3 className="mb-4 text-[15px] font-bold tracking-[0.05em] text-[#f4f0e0]" style={{ fontFamily: '"Cinzel", serif' }}>
                {step.label}
              </h3>
              <p className="text-[1.05rem] italic leading-[1.7] text-[rgba(244,240,224,0.45)]" style={{ fontFamily: '"Crimson Pro", serif' }}>
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section id="modes" ref={modesRef} className={`w-full px-12 py-24 reveal ${modesVisible ? "visible" : ""}`}>
        <p
          className="mb-2 text-center text-[10px] uppercase tracking-[0.35em] text-[#7a6027]"
          style={{ fontFamily: '"Cinzel", serif' }}
        >
          Available Modes
        </p>
        <h2
          className="mb-12 text-center text-[clamp(1.6rem,4vw,2.6rem)] text-[#f0e8d0]"
          style={{ fontFamily: '"Cinzel", serif' }}
        >
          Choose How You Play
        </h2>
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {modes.map((mode) => (
            <div key={mode.name} className="relative overflow-hidden border border-[rgba(201,169,74,0.18)] bg-[rgba(255,255,255,0.02)] px-6 py-7">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#7a6027] to-transparent" />
              <span className="mb-4 block text-[20px]">{mode.icon}</span>
              <p className="mb-2 text-[0.85rem] tracking-[0.06em] text-[#c9a94a]" style={{ fontFamily: '"Cinzel", serif' }}>
                {mode.name}
              </p>
              <p className="text-[0.9rem] leading-[1.55] text-[rgba(240,232,208,0.45)]">{mode.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="start" ref={startRef} className={`border-t border-[rgba(218,180,78,0.15)] bg-[#12100d] px-6 py-32 text-center reveal ${startVisible ? "visible" : ""}`}>
        <h2
          className="mb-6 text-[clamp(2rem,6vw,4.5rem)] font-black leading-[1.1] text-[#f4f0e0]"
          style={{ fontFamily: '"Cinzel", serif' }}
        >
          One Model Thinks.
          <br /><span className="text-[#dab44e]">A Council Decides.</span>
        </h2>
        <p className="mx-auto mb-12 max-w-[650px] text-[1.2rem] italic leading-relaxed text-[rgba(244,240,224,0.45)]" style={{ fontFamily: '"Crimson Pro", serif' }}>
          Stop consulting a single opinion. Convene the greatest minds in history — or the sharpest experts alive.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/agents"
            className="homeLinkPrimary"
          >
            OPEN THE COUNCIL ↗
          </Link>
          <Link
            to="/agents"
            className="homeLinkSecondary"
          >
            BROWSE PERSONAS
          </Link>
        </div>
      </section>

      <footer
        className="border-t border-[rgba(218,180,78,0.15)] bg-[#12100d] px-12 py-10 text-center"
      >
        <p className="text-[10px] tracking-[0.25em] text-[#7a6027] mb-2" style={{ fontFamily: '"Cinzel", serif' }}>
          LLM Council — Multi-Agent Intelligence Platform
        </p>
        <p className="text-[9px] tracking-[0.1em] text-[rgba(244,240,224,0.3)] italic" style={{ fontFamily: '"Crimson Pro", serif' }}>
          All personas are AI constructs for educational and creative exploration
        </p>
      </footer>
    </main>
  );
}

export { HomePage };