/* eslint-disable @next/next/no-img-element */
import { WorkRing, type RingCard } from "@/components/site/work-ring"
import { WorkGallery, type Panel } from "@/components/site/work-gallery"
import { Terminal, type TerminalData } from "@/components/site/terminal"
import { Interactions } from "@/components/site/interactions"

const RESUME = "/Parram_Nainani_Resume.pdf"
const EMAIL = "parramnainani@gmail.com"
const GITHUB = "https://github.com/ParramNainani"
const LINKEDIN = "https://linkedin.com/in/parramnainani"

type Link = { label: string; href: string }

const panels: Panel[] = [
  {
    id: "project-kshetrajna",
    name: "Kshetrajna",
    eyebrow: "A private AI assistant for Windows PCs, 2026",
    what: "It watches app activity and memory pressure, explains what it would change and why, and only acts once you approve: reprioritising apps, trimming memory, moving files to a quarantine you can restore from.",
    proof: [
      "573 automated tests, CI on Linux and native Windows",
      "Approvals expire, can’t be replayed, and every action is journaled",
      "Native Windows builds for x64 and ARM64 (Snapdragon)",
    ],
    stack: "Python, Win32 APIs, SQLite, GitHub Actions",
    links: [
      { label: "Try the live demo", href: "https://kshetrajna-os.runs-at.dev/" },
      { label: "Source", href: "https://github.com/Team-SankatMochan/KSHETRAJNA-OS" },
    ],
    visual: { kind: "shot", src: "/shot-kshetrajna.jpg", url: "kshetrajna-os.runs-at.dev", alt: "Kshetrajna's demo dashboard" },
    tone: "#a9b6ff",
  },
  {
    id: "project-naviigo",
    name: "NaviiGo",
    eyebrow: "The travel-tech company I founded and run, 2025 – now",
    what: "naviigo.in helps travellers in India discover places, plan routes and itineraries, and keep their bookings in one place. I lead a team of 5–7 and build the product. It has just launched; our pilot starts around New Year 2027.",
    proof: [
      "Flights, rail timetables and hotel links in one planner",
      "MeitY GENESIS Entrepreneur-in-Residence, Cohort 2, with grant funding",
    ],
    stack: "Next.js on Vercel",
    links: [{ label: "Visit naviigo.in", href: "https://naviigo.in" }],
    visual: { kind: "shot", src: "/shot-naviigo.jpg", url: "naviigo.in", alt: "NaviiGo's home page" },
    tone: "#f08a4b",
  },
  {
    id: "project-coe-nexus",
    name: "COE Nexus sites",
    eyebrow: "Client work as a web developer, 2026 – now",
    what: "I build and maintain 7+ live event and media sites for summits and awards, including the registration and nomination flows.",
    proof: ["GCC Catalyst Summit, Chennai", "CoE Awards, 2nd edition, Hyderabad"],
    stack: "React, Vite, Firebase, GSAP",
    links: [
      { label: "CoE Awards", href: "https://coe-awards-hyderabad.coe-nexus.com/" },
      { label: "GCC Catalyst Summit", href: "https://gcc-catalyst-summit.coe-nexus.com/" },
    ],
    visual: {
      kind: "pair",
      a: { src: "/ring/coe-awards.jpg", alt: "CoE Awards Hyderabad home page" },
      b: { src: "/ring/gcc.jpg", alt: "GCC Catalyst Summit home page" },
    },
    tone: "#e8a33d",
  },
  {
    id: "project-drift",
    name: "Kshetrajna Drift",
    eyebrow: "Local AI agent, 2026",
    what: "An AI agent for messy folders. Llama 3.1 runs on your own machine, suggests where each file belongs and why, then moves only the files you approve.",
    proof: ["31 tests on Windows", "SHA-256 re-checks before every move", "Undo journal with crash recovery"],
    stack: "Python, Llama 3.1 8B (Ollama), SQLite",
    links: [{ label: "Source", href: "https://github.com/ParramNainani/kshetrajna-drift" }],
    visual: { kind: "files" },
    tone: "#5eead4",
  },
  {
    id: "project-revoice",
    name: "ReVoice",
    eyebrow: "Voice agent, Rime hackathon, 2026",
    what: "A voice support agent that copes with being interrupted. Every request gets a generation ID, so answers to a request you changed your mind about are thrown away instead of spoken.",
    proof: ["Corrected answer accepted about 305 ms after an interruption", "Acceptance test replays a real interruption"],
    stack: "TypeScript, LiveKit Agents, Deepgram, OpenAI",
    links: [{ label: "Source", href: "https://github.com/ParramNainani/DataForge" }],
    visual: { kind: "wave" },
    tone: "#a78bfa",
  },
  {
    id: "project-rl",
    name: "Support-triage RL environment",
    eyebrow: "OpenEnv, 2026",
    what: "An environment where an LLM agent decides whether to resolve, investigate or escalate customer tickets, graded at three difficulty levels.",
    proof: ["Rewards from 0 to 1 per decision", "Dockerised for Hugging Face Spaces"],
    stack: "Python, OpenEnv, Docker, Gradio",
    links: [{ label: "Source", href: "https://github.com/ParramNainani/OpenENV-ScalerSchool" }],
    visual: { kind: "grid" },
    tone: "#f5b544",
  },
  {
    id: "project-finance",
    name: "Finance dashboard API",
    eyebrow: "Node.js back end, 2026",
    what: "A REST API for a finance dashboard with three roles, filterable records and endpoints for totals, daily trends and categories.",
    proof: ["JWT auth and role-based access", "Zod validation and Swagger docs"],
    stack: "Node.js, Express, PostgreSQL, Prisma, Docker",
    links: [{ label: "Source", href: "https://github.com/ParramNainani/Project-Backend" }],
    visual: { kind: "bars" },
    tone: "#60a5fa",
  },
]

const experience: { when: string; role: string; org: string; detail: string; links?: Link[] }[] = [
  {
    when: "Dec 2025 – now",
    role: "Founder and CEO",
    org: "NaviiGo",
    detail: "Started the company, lead a team of 5–7, and build naviigo.in: trip planning, itineraries and bookings. Just launched; pilot starts around New Year 2027.",
  },
  {
    when: "Jan 2026 – now",
    role: "Web developer",
    org: "COE Nexus",
    detail:
      "Built and maintain 7+ live event and media sites in React, Vite, Firebase and GSAP, including registration and nomination flows.",
    links: [
      { label: "GCC Catalyst Summit", href: "https://gcc-catalyst-summit.coe-nexus.com/" },
      { label: "COE Awards Hyderabad", href: "https://coe-awards-hyderabad.coe-nexus.com/" },
    ],
  },
  {
    when: "Sep – Nov 2025",
    role: "Full-stack development intern",
    org: "BinaryKeeda",
    detail: "Set up the codebase for BinaryKeeda’s new hiring app in React, TypeScript and React Query.",
  },
  {
    when: "Jun – Sep 2025",
    role: "Software development intern (Flutter)",
    org: "NetStratix Technologies",
    detail: "Developed Flutter and Firebase app features with the back-end and design teams over a 120-day internship.",
  },
]

const terminal: TerminalData = {
  about: "Parram Nainani. CS (AI and ML) student at UPES, founder of NaviiGo, web developer at COE Nexus. I build AI agents and web products, and ship them with tests.",
  projects: [
    { name: "kshetrajna", line: "private AI assistant for Windows", href: "https://kshetrajna-os.runs-at.dev/" },
    { name: "naviigo", line: "travel-tech startup", href: "https://naviigo.in" },
    { name: "kshetrajna-drift", line: "local AI filing agent", href: "https://github.com/ParramNainani/kshetrajna-drift" },
    { name: "revoice", line: "interruption-safe voice agent", href: "https://github.com/ParramNainani/DataForge" },
    { name: "triage-rl-env", line: "OpenEnv environment", href: "https://github.com/ParramNainani/OpenENV-ScalerSchool" },
    { name: "finance-api", line: "Node.js back end", href: "https://github.com/ParramNainani/Project-Backend" },
  ],
  skills: [
    "languages   Python, TypeScript, JavaScript, Java, Dart, SQL",
    "ai/agents   LLM agents, Ollama, LiveKit Agents, RAG, PyTorch",
    "web         React, Next.js, Node.js, Express, PostgreSQL, Firebase",
    "tools       Git, GitHub Actions, Docker, Vercel, Flutter",
  ],
  experience: [
    "2025–now   Founder and CEO, NaviiGo",
    "2026–now   Web developer, COE Nexus",
    "2025       Full-stack development intern, BinaryKeeda",
    "2025       Software development intern (Flutter), NetStratix",
  ],
  email: EMAIL,
  resume: RESUME,
  github: GITHUB,
  linkedin: LINKEDIN,
}

const marqueeA = ["AI agents", "Local-first tools", "Voice agents", "Next.js", "Python", "React", "TypeScript", "LLMs on device"]
const marqueeB = ["573 tests", "Win32 APIs", "PostgreSQL", "Firebase", "Docker", "Three.js", "GSAP", "Flutter"]

const ringCards: RingCard[] = [
  { title: "Kshetrajna", kind: "AI assistant for Windows", href: "#project-kshetrajna", src: "/ring/kshetrajna.jpg" },
  {
    title: "Kshetrajna Drift",
    kind: "Local AI agent",
    href: "https://github.com/ParramNainani/kshetrajna-drift",
    external: true,
    poster: { bg: "#0f2d24", ink: "#eafff4", accent: "#5eead4", tagline: "Files sorted by a local LLM, only with your OK", motif: "files" },
  },
  { title: "CoE Awards", kind: "Event site, COE Nexus", href: "https://coe-awards-hyderabad.coe-nexus.com/", external: true, src: "/ring/coe-awards.jpg" },
  {
    title: "Hi, I’m Parram",
    kind: "Get in touch",
    href: "#contact",
    poster: { bg: "#e9edf2", ink: "#0e1117", accent: "#0e1117", tagline: "The person behind all of this", motif: "photo" },
  },
  { title: "NaviiGo", kind: "My travel-tech startup", href: "#project-naviigo", src: "/ring/naviigo.jpg" },
  {
    title: "ReVoice",
    kind: "Voice agent, Rime hackathon",
    href: "https://github.com/ParramNainani/DataForge",
    external: true,
    poster: { bg: "#1d1640", ink: "#f1edff", accent: "#a78bfa", tagline: "Interrupt it. It drops the stale answer.", motif: "wave" },
  },
  { title: "GCC Catalyst Summit", kind: "Event site, COE Nexus", href: "https://gcc-catalyst-summit.coe-nexus.com/", external: true, src: "/ring/gcc.jpg" },
  {
    title: "Triage RL environment",
    kind: "OpenEnv",
    href: "https://github.com/ParramNainani/OpenENV-ScalerSchool",
    external: true,
    poster: { bg: "#2b1d08", ink: "#fff6e6", accent: "#f5b544", tagline: "Graded rewards for an LLM agent", motif: "grid" },
  },
  {
    title: "Finance API",
    kind: "Node.js back end",
    href: "https://github.com/ParramNainani/Project-Backend",
    external: true,
    poster: { bg: "#0c1f3d", ink: "#eaf2ff", accent: "#60a5fa", tagline: "Roles, records and trend endpoints", motif: "bars" },
  },
]

const delay = (ms: number) => ({ ["--d" as string]: `${ms}ms` }) as React.CSSProperties

export default function HomePage() {
  return (
    <div className="site">
      <a href="#work" className="skip">
        Skip to work
      </a>

      <header className="topbar">
        <div className="container topbar-inner">
          <a href="#top" className="brand">
            Parram Nainani
          </a>
          <nav aria-label="Sections" className="nav">
            <a href="#work">Work</a>
            <a href="#experience">Experience</a>
            <a href="#about">About</a>
            <a href={RESUME} target="_blank" rel="noopener" className="btn btn-small">
              Résumé
            </a>
          </nav>
        </div>
      </header>

      <main id="top">
        {/* Hero: a 3D ring of real work behind the name */}
        <section className="ring-hero">
          <WorkRing cards={ringCards} />
          <div className="container ring-overlay">
            <p className="status rise" style={delay(0)}>
              <span className="status-dot" aria-hidden="true" />
              Open to software engineering internships
            </p>
            <p className="ring-hint rise" style={delay(400)}>
              Drag the ring. Click a card to open it.
            </p>
            <h1 className="ring-name rise" style={delay(80)}>
              <span>Parram</span>
              <span>Nainani</span>
            </h1>
            <div className="ring-side rise" style={delay(200)}>
              <p className="lede">I build AI agents and web products, and ship them with tests.</p>
              <p className="hero-meta">CS (AI and ML) at UPES. Founder of NaviiGo. Web developer at COE Nexus.</p>
              <div className="actions">
                <a href={RESUME} target="_blank" rel="noopener" className="btn btn-primary">
                  Download résumé
                </a>
                <a href={`mailto:${EMAIL}`} className="btn">
                  Email me
                </a>
                <a href={GITHUB} target="_blank" rel="noopener" className="text-link">
                  GitHub
                </a>
                <a href={LINKEDIN} target="_blank" rel="noopener" className="text-link">
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Marquee */}
        <section className="marquee" aria-label="What I work with">
          <div className="marquee-row">
            <div className="marquee-track">
              {[...marqueeA, ...marqueeA].map((w, i) => (
                <span key={i}>{w}</span>
              ))}
            </div>
          </div>
          <div className="marquee-row is-reverse" aria-hidden="true">
            <div className="marquee-track">
              {[...marqueeB, ...marqueeB].map((w, i) => (
                <span key={i}>{w}</span>
              ))}
            </div>
          </div>
        </section>

        {/* Work */}
        <section id="work">
          <WorkGallery panels={panels} />
        </section>

        {/* Experience */}
        <section id="experience" className="container section">
          <div className="section-head">
            <h2>Experience</h2>
          </div>
          <ol className="timeline">
            {experience.map((e) => (
              <li key={e.org}>
                <span className="node" aria-hidden="true" />
                <p className="when">{e.when}</p>
                <div>
                  <h3>
                    {e.role}, <span className="org">{e.org}</span>
                  </h3>
                  <p>{e.detail}</p>
                  {e.links ? (
                    <p className="row-links">
                      {e.links.map((l) => (
                        <a key={l.href} className="text-link" href={l.href} target="_blank" rel="noopener">
                          {l.label}
                        </a>
                      ))}
                    </p>
                  ) : null}
                </div>
              </li>
            ))}
            <li>
              <span className="node" aria-hidden="true" />
              <p className="when">2024 – 2028</p>
              <div>
                <h3>
                  B.Tech, Computer Science (AI and ML), <span className="org">UPES Dehradun</span>
                </h3>
                <p>CGPA 8.7 out of 10.</p>
              </div>
            </li>
          </ol>
        </section>

        {/* About: research, recognition, skills */}
        <section id="about" className="container section">
          <div className="about">
            <div>
              <h2 className="h2-small">Research</h2>
              <div className="stacked">
                <div>
                  <h3>How AI-generated content shapes human decisions</h3>
                  <p>
                    A study of AI-induced bias with mentors Pankaj Badoni (UPES) and an Indiana University alumnus.
                    Literature review under way; manuscript planned for December 2026.
                  </p>
                </div>
                <div>
                  <h3>LSGA-ViT image recognition</h3>
                  <p>
                    A CNN stem feeding Vision Transformer blocks with Local Self-Gating Attention, supervised by faculty
                    member Nitika Nigam.
                  </p>
                </div>
              </div>
            </div>
            <div>
              <h2 className="h2-small">Recognition</h2>
              <div className="stacked">
                <div>
                  <h3>Smart India Hackathon 2025, Grand Finale</h3>
                  <p>Qualified in December 2025 with a solution for collecting trip data.</p>
                </div>
                <div>
                  <h3>MeitY GENESIS Entrepreneur-in-Residence</h3>
                  <p>Cohort 2, through UPES, with grant funding for NaviiGo.</p>
                </div>
              </div>
            </div>
            <div className="about-term">
              <h2 className="h2-small">Ask my terminal</h2>
              <Terminal data={terminal} />
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="container section">
          <div className="contact">
            <h2>Let’s talk</h2>
            <p>Hiring for a software engineering internship, or building something with AI agents? Email me.</p>
            <button type="button" className="contact-email" data-copy={EMAIL}>
              <span>{EMAIL}</span>
              <span className="copy-hint" data-copy-label aria-live="polite">
                Click to copy
              </span>
            </button>
            <div className="actions">
              <a href={`mailto:${EMAIL}`} className="btn btn-primary magnetic">
                Email me
              </a>
              <a href={RESUME} target="_blank" rel="noopener" className="btn magnetic">
                Download résumé
              </a>
              <a href={GITHUB} target="_blank" rel="noopener" className="btn magnetic">
                GitHub
              </a>
              <a href={LINKEDIN} target="_blank" rel="noopener" className="btn magnetic">
                LinkedIn
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="container footer">
        <p>© 2026 Parram Nainani</p>
        <p>New Delhi, India</p>
      </footer>
      <Interactions />
    </div>
  )
}
