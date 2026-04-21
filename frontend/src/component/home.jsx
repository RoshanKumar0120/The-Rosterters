import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const consultationCards = [
  {
    id: "01",
    label: "Starting Point",
    title: "Medical Consultation",
    desc: "Start with a broad medical consultation to analyze symptoms, lifestyle, and medical history before narrowing into a specialist path.",
    tags: ["Symptoms", "Lifestyle", "Medical History", "Risk Review"],
    highlight: true,
  },
  {
    id: "02",
    label: "Specialty Mode",
    title: "Heart Disease Consultation",
    desc: "Focus the conversation on cardiac risk, chest discomfort, blood pressure patterns, and heart-related warning signs.",
    tags: ["Cardiology", "Chest Pain", "BP Trends", "Heart Risk"],
  },
  {
    id: "03",
    label: "Specialty Mode",
    title: "Respiratory Disease Consultation",
    desc: "Explore breathing issues, persistent cough, wheezing, exposure history, and respiratory patterns with a dedicated mode card.",
    tags: ["Lungs", "Breathing", "Cough", "Respiratory Risk"],
  },
  {
    id: "04",
    label: "Specialty Mode",
    title: "Diabetes Consultation",
    desc: "Review blood sugar related symptoms, fatigue, lifestyle habits, and metabolic warning signs in a diabetes-focused flow.",
    tags: ["Glucose", "Fatigue", "Metabolism", "Lifestyle"],
  },
];

const modes = [
  {
    name: "Medical Consultation",
    status: "Available now",
    desc: "The first stop for users to narrow down the likely disease area before moving into a more specific consultation mode.",
  },
  {
    name: "Heart Disease Consultation",
    status: "Card only for now",
    desc: "Displayed as a specialty mode card that prepares users for future heart-focused consulting journeys.",
  },
  {
    name: "Respiratory Disease Consultation",
    status: "Card only for now",
    desc: "Displayed as a specialty mode card for respiratory symptoms and breathing-related concerns.",
  },
  {
    name: "Diabetes Consultation",
    status: "Card only for now",
    desc: "Displayed as a specialty mode card for diabetes-related screening and metabolic concerns.",
  },
];

const steps = [
  {
    label: "Start Broad",
    desc: "Begin with Medical Consultation so the user can describe symptoms, routine, and prior medical history.",
  },
  {
    label: "Narrow the Disease Area",
    desc: "Use the first consultation as a filtering layer to identify which disease group needs deeper attention.",
  },
  {
    label: "Move Into Specialty Modes",
    desc: "From there, continue into Heart Disease Consultation, Respiratory Disease Consultation, or Diabetes Consultation.",
  },
  {
    label: "Continue Specialist Guidance",
    desc: "Each mode is designed to become a more focused specialist experience as the product expands.",
  },
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
  const [cardsRef, cardsVisible] = useReveal();
  const [howRef, howVisible] = useReveal();
  const [modesRef, modesVisible] = useReveal();
  const [startRef, startVisible] = useReveal();

  return (
    <main className="w-full bg-[#12100d] text-[#f4f0e0]">
      <section
        ref={heroRef}
        className={`relative flex flex-col overflow-hidden bg-[#12100d] reveal ${
          heroVisible ? "visible" : ""
        }`}
      >
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(36,155,117,0.18)_0%,transparent_75%)] blur-[100px]" />
        <div className="pointer-events-none absolute -left-[10%] top-[10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(94,196,151,0.10)_0%,transparent_75%)] blur-[120px] animate-pulse" />
        <div className="pointer-events-none absolute -right-[10%] bottom-[20%] h-[550px] w-[550px] rounded-full bg-[radial-gradient(circle,rgba(26,140,114,0.12)_0%,transparent_75%)] blur-[110px]" />

        <div className="flex h-[80vh] flex-col items-center justify-center px-6 py-16 text-center">
          <div className="mb-6 flex items-center gap-4">
            <div className="h-px w-24 bg-[rgba(94,196,151,0.35)]" />
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[rgba(94,196,151,0.6)] text-[18px] text-[#8ee0bd] shadow-[0_0_20px_rgba(94,196,151,0.2)]">
              MD
            </div>
            <div className="h-px w-24 bg-[rgba(94,196,151,0.35)]" />
          </div>
          <p
            className="mb-4 text-[9px] uppercase tracking-[0.4em] text-[#62a88e]"
            style={{ fontFamily: '"Cinzel", serif' }}
          >
            Multi-Agent Medical Consultation
          </p>
          <h1
            className="mb-4 text-[clamp(2.8rem,8vw,5.5rem)] font-black leading-[0.95] tracking-[-0.02em] text-[#eef8f1]"
            style={{ fontFamily: '"Cinzel", serif' }}
          >
            Medical <span className="text-[#8ee0bd]">Consultation</span>
          </h1>
          <p
            className="mb-5 text-[clamp(0.65rem,1.5vw,0.85rem)] tracking-[0.25em] text-[rgba(142,224,189,0.78)]"
            style={{ fontFamily: '"Cinzel", serif' }}
          >
            Start broad, then move into focused disease consultation modes
          </p>
          <p className="mb-8 max-w-[620px] text-[clamp(1rem,2.2vw,1.3rem)] font-light italic leading-[1.6] text-[rgba(244,240,224,0.65)]">
            Analyze symptoms, lifestyle, and medical history in one place. Medical Consultation works as the starting point, helping users narrow down the disease area before entering specialty modes.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/agents" className="homeLinkPrimary">
              Start Consultation
            </Link>
            <a href="#modes" className="homeLinkSecondary">
              Explore Modes
            </a>
          </div>
        </div>

        <div
          ref={statsRef}
          className={`flex flex-wrap border-t border-[rgba(94,196,151,0.2)] bg-[rgba(255,255,255,0.02)] reveal ${
            statsVisible ? "visible" : ""
          }`}
        >
          {[
            ["1", "Starting Point"],
            ["3", "Specialty Cards"],
            ["Symptoms", "Input Focus"],
            ["History", "Context Layer"],
          ].map(([value, label]) => (
            <div
              key={label}
              className="min-w-[50%] flex-1 border-r border-[rgba(142,224,189,0.1)] px-6 py-4 text-center last:border-r-0 sm:min-w-0"
            >
              <span
                className="mb-1 block text-[clamp(1.1rem,2.5vw,1.5rem)] leading-none text-[#8ee0bd]"
                style={{ fontFamily: '"Cinzel", serif' }}
              >
                {value}
              </span>
              <span
                className="text-[8px] uppercase tracking-[0.25em] text-[rgba(240,248,241,0.35)]"
                style={{ fontFamily: '"Cinzel", serif' }}
              >
                {label}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-[rgba(94,196,151,0.22)] bg-[#171d19] px-6 py-16 text-center shadow-[inset_0_0_50px_rgba(94,196,151,0.03)]">
        <p
          className="mx-auto max-w-[760px] text-[clamp(1.1rem,2.8vw,1.9rem)] leading-[1.5] text-[#eef8f1]"
          style={{ fontFamily: '"Cinzel", serif' }}
        >
          One consultation can become the <span className="text-[#8ee0bd]">starting point.</span>
          <br />
          The right specialty mode brings the <span className="text-[#8ee0bd]">next layer of focus.</span>
        </p>
        <p className="mt-3 text-base italic text-[rgba(240,248,241,0.42)]">
          Begin with Medical Consultation, then guide the user toward the most relevant disease-specific path.
        </p>
      </section>

      <section
        id="consultations"
        ref={cardsRef}
        className={`w-full px-12 py-24 reveal ${cardsVisible ? "visible" : ""}`}
      >
        <p
          className="mb-2 text-center text-[10px] uppercase tracking-[0.35em] text-[#62a88e]"
          style={{ fontFamily: '"Cinzel", serif' }}
        >
          Consultation Paths
        </p>
        <h2
          className="mb-14 text-center text-[clamp(1.6rem,4vw,2.6rem)] leading-[1.2] text-[#eef8f1]"
          style={{ fontFamily: '"Cinzel", serif' }}
        >
          Start With General Guidance.
          <br />
          Continue With Specialty Modes.
        </h2>

        <div className="grid gap-px border border-[rgba(142,224,189,0.12)] bg-[rgba(142,224,189,0.10)] md:grid-cols-2">
          {consultationCards.map((item) => (
            <article
              key={item.id}
              className={`group relative block bg-[#0d0f0d] px-8 py-10 transition hover:bg-[#111612] ${
                item.highlight ? "border-l-2 border-[#8ee0bd]" : ""
              }`}
            >
              <span
                className={`mb-5 block text-[10px] uppercase tracking-[0.3em] ${
                  item.highlight ? "text-[#8ee0bd]" : "text-[#62a88e]"
                }`}
                style={{ fontFamily: '"Cinzel", serif' }}
              >
                {item.id} - {item.label}
              </span>
              <p
                className="mb-3 text-base font-semibold leading-[1.3] text-[#eef8f1]"
                style={{ fontFamily: '"Cinzel", serif' }}
              >
                {item.title}
              </p>
              <p className="text-[0.95rem] leading-[1.65] text-[rgba(240,248,241,0.56)]">
                {item.desc}
              </p>
              <div className="mt-5 flex flex-wrap gap-1.5">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="border border-[rgba(142,224,189,0.22)] px-2.5 py-1 text-[9px] tracking-[0.15em] text-[#75c7a4]"
                    style={{ fontFamily: '"Cinzel", serif' }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <span className="absolute bottom-8 right-8 translate-x-[-6px] text-base text-[#8ee0bd] opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100">
                ->
              </span>
            </article>
          ))}
        </div>
      </section>

      <section
        id="how"
        ref={howRef}
        className={`border-t border-[rgba(94,196,151,0.12)] bg-[#171d19] px-12 py-32 reveal ${
          howVisible ? "visible" : ""
        }`}
      >
        <p
          className="mb-2 text-center text-[10px] uppercase tracking-[0.4em] text-[#62a88e]"
          style={{ fontFamily: '"Cinzel", serif' }}
        >
          The Flow
        </p>
        <h2
          className="mb-20 text-center text-[clamp(1.8rem,4.5vw,2.8rem)] font-bold text-[#eef8f1]"
          style={{ fontFamily: '"Cinzel", serif' }}
        >
          How Medical Consultation Progresses
        </h2>
        <div className="relative mx-auto mt-24 flex max-w-[1400px] flex-col items-start justify-between gap-12 md:flex-row md:gap-4 lg:gap-8">
          <div className="absolute left-[10%] right-[10%] top-10 hidden h-[1px] bg-[rgba(94,196,151,0.35)] md:block" />
          {steps.map((step, index) => (
            <div key={step.label} className="relative z-[2] flex-1 px-4 text-center">
              <div
                className="mx-auto mb-10 flex h-20 w-20 items-center justify-center rounded-full border-2 border-[rgba(94,196,151,0.5)] bg-[#171d19] text-xl font-bold text-[#8ee0bd] shadow-[0_0_40px_rgba(94,196,151,0.15)] transition-all hover:scale-110 hover:border-[#8ee0bd]"
                style={{ fontFamily: '"Cinzel", serif' }}
              >
                {["I", "II", "III", "IV"][index]}
              </div>
              <h3
                className="mb-4 text-[15px] font-bold tracking-[0.05em] text-[#eef8f1]"
                style={{ fontFamily: '"Cinzel", serif' }}
              >
                {step.label}
              </h3>
              <p
                className="text-[1.05rem] italic leading-[1.7] text-[rgba(244,248,241,0.48)]"
                style={{ fontFamily: '"Crimson Pro", serif' }}
              >
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section
        id="modes"
        ref={modesRef}
        className={`w-full px-12 py-24 reveal ${modesVisible ? "visible" : ""}`}
      >
        <p
          className="mb-2 text-center text-[10px] uppercase tracking-[0.35em] text-[#62a88e]"
          style={{ fontFamily: '"Cinzel", serif' }}
        >
          Available Modes
        </p>
        <h2
          className="mb-12 text-center text-[clamp(1.6rem,4vw,2.6rem)] text-[#eef8f1]"
          style={{ fontFamily: '"Cinzel", serif' }}
        >
          Medical Consultation Comes First
        </h2>
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {modes.map((mode) => (
            <div
              key={mode.name}
              className="relative overflow-hidden border border-[rgba(142,224,189,0.18)] bg-[rgba(255,255,255,0.02)] px-6 py-7"
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#62a88e] to-transparent" />
              <p
                className="mb-2 text-[0.85rem] tracking-[0.06em] text-[#8ee0bd]"
                style={{ fontFamily: '"Cinzel", serif' }}
              >
                {mode.name}
              </p>
              <p className="mb-3 text-[10px] uppercase tracking-[0.25em] text-[rgba(142,224,189,0.6)]">
                {mode.status}
              </p>
              <p className="text-[0.9rem] leading-[1.55] text-[rgba(240,248,241,0.45)]">
                {mode.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section
        id="start"
        ref={startRef}
        className={`border-t border-[rgba(94,196,151,0.15)] bg-[#12100d] px-6 py-32 text-center reveal ${
          startVisible ? "visible" : ""
        }`}
      >
        <h2
          className="mb-6 text-[clamp(2rem,6vw,4.5rem)] font-black leading-[1.1] text-[#eef8f1]"
          style={{ fontFamily: '"Cinzel", serif' }}
        >
          Start With Symptoms.
          <br />
          <span className="text-[#8ee0bd]">Move Toward the Right Consultation.</span>
        </h2>
        <p
          className="mx-auto mb-12 max-w-[700px] text-[1.2rem] italic leading-relaxed text-[rgba(244,248,241,0.45)]"
          style={{ fontFamily: '"Crimson Pro", serif' }}
        >
          Medical Consultation is the first step for narrowing the disease area. Heart Disease Consultation, Respiratory Disease Consultation, and Diabetes Consultation are now presented as specialty cards in the flow.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/agents" className="homeLinkPrimary">
            Open Medical Consultation
          </Link>
          <a href="#consultations" className="homeLinkSecondary">
            View Consultation Cards
          </a>
        </div>
      </section>

      <footer className="border-t border-[rgba(94,196,151,0.15)] bg-[#12100d] px-12 py-10 text-center">
        <p
          className="mb-2 text-[10px] tracking-[0.25em] text-[#62a88e]"
          style={{ fontFamily: '"Cinzel", serif' }}
        >
          Medical Consultation - Multi-Agent Assistance Interface
        </p>
        <p
          className="text-[9px] italic tracking-[0.1em] text-[rgba(244,248,241,0.3)]"
          style={{ fontFamily: '"Crimson Pro", serif' }}
        >
          For product exploration and UI prototyping only
        </p>
      </footer>
    </main>
  );
}

export { HomePage };
