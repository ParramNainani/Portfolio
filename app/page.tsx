/* eslint-disable @next/next/no-img-element */

const RESUME = "/Parram_Nainani_Resume.pdf"
const EMAIL = "parramnainani@gmail.com"
const GITHUB = "https://github.com/ParramNainani"
const LINKEDIN = "https://linkedin.com/in/parramnainani"

type Link = { label: string; href: string }

const featured = [
  {
    name: "Kshetrajna",
    year: "2026",
    tagline: "A private AI assistant for Windows PCs",
    what: "It watches app activity and memory pressure, explains what it would change and why, and only acts once you approve: reprioritising apps, trimming memory, moving files to a quarantine you can restore from.",
    proof: [
      "573 automated tests, CI on Linux and native Windows",
      "Approvals expire, can’t be replayed, and every action is journaled for recovery",
      "Native Windows builds for x64 and ARM64 (Snapdragon)",
    ],
    stack: "Python, Win32 APIs, SQLite, GitHub Actions",
    shot: {
      src: "/shot-kshetrajna.jpg",
      url: "kshetrajna-os.runs-at.dev",
      alt: "Kshetrajna's demo dashboard showing CPU, memory and workflow cards",
    },
    links: [
      { label: "Try the live demo", href: "https://kshetrajna-os.runs-at.dev/" },
      { label: "Source on GitHub", href: "https://github.com/Team-SankatMochan/KSHETRAJNA-OS" },
    ] as Link[],
  },
  {
    name: "NaviiGo",
    year: "2025 – now",
    tagline: "The travel-tech company I founded and run",
    what: "naviigo.in helps travellers in India discover places, plan routes and itineraries, and keep their bookings in one place. I lead a team of 5–7 and build the product.",
    proof: [
      "Flight trip types, rail timetables and hotel links in one planner",
      "MeitY GENESIS Entrepreneur-in-Residence, Cohort 2, with grant funding",
    ],
    stack: "Next.js on Vercel",
    shot: {
      src: "/shot-naviigo.jpg",
      url: "naviigo.in",
      alt: "NaviiGo's home page with a map of India and the line Travel should feel like a journey",
    },
    links: [{ label: "Visit naviigo.in", href: "https://naviigo.in" }] as Link[],
  },
]

const projects = [
  {
    name: "Kshetrajna Drift",
    year: "2026",
    what: "A local AI agent for messy folders. Llama 3.1 runs on your own machine, suggests where each file belongs and why, then moves only the files you approve.",
    proof: "31 tests, SHA-256 re-checks before every move, undo journal",
    stack: "Python, Llama 3.1 8B (Ollama), SQLite",
    href: "https://github.com/ParramNainani/kshetrajna-drift",
  },
  {
    name: "ReVoice",
    year: "2026",
    what: "A voice support agent that copes with being interrupted. Answers to a request you’ve changed your mind about are thrown away instead of spoken.",
    proof: "Built for the Rime hackathon; an acceptance test replays a real interruption",
    stack: "TypeScript, LiveKit Agents, Deepgram, OpenAI",
    href: "https://github.com/ParramNainani/DataForge",
  },
  {
    name: "Support-triage RL environment",
    year: "2026",
    what: "An OpenEnv environment where an LLM agent decides whether to resolve, investigate or escalate customer tickets.",
    proof: "Graded rewards at 3 difficulty levels, Dockerised for Hugging Face Spaces",
    stack: "Python, OpenEnv, Docker, Gradio",
    href: "https://github.com/ParramNainani/OpenENV-ScalerSchool",
  },
  {
    name: "Finance dashboard API",
    year: "2026",
    what: "A REST API for a finance dashboard with three roles, filterable records and endpoints for totals, daily trends and categories.",
    proof: "JWT auth, role-based access, Zod validation, Swagger docs",
    stack: "Node.js, Express, PostgreSQL, Prisma, Docker",
    href: "https://github.com/ParramNainani/Project-Backend",
  },
]

const experience: { when: string; role: string; org: string; detail: string; links?: Link[] }[] = [
  {
    when: "Dec 2025 – now",
    role: "Founder and CEO",
    org: "NaviiGo",
    detail: "Started the company, lead a team of 5–7, and build naviigo.in: trip planning, itineraries and bookings.",
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
    role: "Software developer intern (contract)",
    org: "BinaryKeeda",
    detail: "Built responsive, accessible web apps in React, Tailwind CSS and Firebase from design-system components.",
  },
  {
    when: "May – Oct 2025",
    role: "Software developer",
    org: "NetStratix Technologies",
    detail: "Developed and maintained cross-platform Flutter and Firebase mobile apps with the back-end and design teams.",
  },
]

const skills = [
  { group: "Languages", items: "Python, TypeScript, JavaScript, Java, Dart, SQL" },
  { group: "AI and agents", items: "LLM agents, Ollama, LiveKit Agents, RAG, PyTorch, scikit-learn" },
  { group: "Web and back end", items: "React, Next.js, Node.js, Express, PostgreSQL, Prisma, Firebase" },
  { group: "Tools", items: "Git, GitHub Actions, Docker, Vercel, Flutter" },
]

const delay = (ms: number) => ({ ["--d" as string]: `${ms}ms` }) as React.CSSProperties

function Frame({ src, url, alt }: { src: string; url: string; alt: string }) {
  return (
    <div className="frame">
      <div className="frame-bar" aria-hidden="true">
        <span />
        <span />
        <span />
        <p>{url}</p>
      </div>
      <img src={src} alt={alt} width={800} height={500} loading="lazy" />
    </div>
  )
}

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
        {/* Hero */}
        <section className="container hero">
          <div className="hero-text">
            <p className="status rise" style={delay(0)}>
              <span className="status-dot" aria-hidden="true" />
              Open to software engineering internships
            </p>
            <h1 className="rise" style={delay(60)}>
              Parram Nainani
            </h1>
            <p className="lede rise" style={delay(120)}>
              I build AI agents and web products, and ship them with tests.
            </p>
            <p className="hero-meta rise" style={delay(180)}>
              Computer science (AI and ML) at UPES. Founder of NaviiGo. Web developer at COE Nexus.
            </p>
            <div className="actions rise" style={delay(240)}>
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

          <figure className="hero-photo rise" style={delay(120)}>
            <img src="/parram.jpg" alt="Parram Nainani" width={500} height={500} />
            <figcaption className="now">
              <span className="now-label">Now building</span>
              <span>
                <strong>Kshetrajna</strong>, a local AI assistant for Windows.{" "}
                <a href="https://kshetrajna-os.runs-at.dev/" target="_blank" rel="noopener" className="text-link">
                  Try the demo
                </a>
              </span>
            </figcaption>
          </figure>
        </section>

        {/* Work */}
        <section id="work" className="container section">
          <div className="section-head">
            <h2>Selected work</h2>
            <p>Products and projects I built and can show. Client work for companies is under Experience.</p>
          </div>

          <div className="featured">
            {featured.map((p, i) => (
              <article key={p.name} className={`feature ${i % 2 === 1 ? "is-flipped" : ""}`} aria-labelledby={`f-${i}`}>
                <div className="feature-text">
                  <p className="eyebrow">
                    {p.tagline}, {p.year}
                  </p>
                  <h3 id={`f-${i}`}>{p.name}</h3>
                  <p className="feature-what">{p.what}</p>
                  <ul className="proof">
                    {p.proof.map((x) => (
                      <li key={x}>{x}</li>
                    ))}
                  </ul>
                  <p className="stack">{p.stack}</p>
                  <div className="actions">
                    {p.links.map((l, j) => (
                      <a
                        key={l.href}
                        href={l.href}
                        target="_blank"
                        rel="noopener"
                        className={j === 0 ? "btn btn-primary" : "btn"}
                      >
                        {l.label}
                      </a>
                    ))}
                  </div>
                </div>
                <a
                  href={p.links[0].href}
                  target="_blank"
                  rel="noopener"
                  className="feature-shot"
                  tabIndex={-1}
                  aria-hidden="true"
                >
                  <Frame {...p.shot} />
                </a>
              </article>
            ))}
          </div>

          <ul className="grid-projects">
            {projects.map((p) => (
              <li key={p.name} className="card">
                <div className="card-head">
                  <h3>{p.name}</h3>
                  <span>{p.year}</span>
                </div>
                <p>{p.what}</p>
                <p className="card-proof">{p.proof}</p>
                <p className="stack">{p.stack}</p>
                <a href={p.href} target="_blank" rel="noopener" className="text-link card-link">
                  Source on GitHub
                </a>
              </li>
            ))}
          </ul>
        </section>

        {/* Experience */}
        <section id="experience" className="container section">
          <div className="section-head">
            <h2>Experience</h2>
          </div>
          <ol className="timeline">
            {experience.map((e) => (
              <li key={e.org}>
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
            <div>
              <h2 className="h2-small">Skills</h2>
              <dl className="skills">
                {skills.map((s) => (
                  <div key={s.group}>
                    <dt>{s.group}</dt>
                    <dd>{s.items}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="container section">
          <div className="contact">
            <h2>Let’s talk</h2>
            <p>Hiring for a software engineering internship, or building something with AI agents? Email me.</p>
            <a href={`mailto:${EMAIL}`} className="contact-email">
              {EMAIL}
            </a>
            <div className="actions">
              <a href={RESUME} target="_blank" rel="noopener" className="btn btn-primary">
                Download résumé
              </a>
              <a href={GITHUB} target="_blank" rel="noopener" className="btn">
                GitHub
              </a>
              <a href={LINKEDIN} target="_blank" rel="noopener" className="btn">
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
    </div>
  )
}
