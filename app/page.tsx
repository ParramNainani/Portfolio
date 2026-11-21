import { ApprovalRequest } from "@/components/site/approval-request"
import { ActionLoop } from "@/components/site/action-loop"
import { Hero } from "@/components/site/hero"
import { DotField } from "@/components/site/dot-field"

const RESUME = "/Parram_Nainani_Resume.pdf"
const EMAIL = "parramnainani@gmail.com"

const projects = [
  {
    name: "Kshetrajna Drift",
    glyph: "drift",
    year: "2026",
    what: "A local AI agent for messy folders. Llama 3.1 runs on your own machine, suggests where each loose file belongs and says why, then moves only the files you approve.",
    proof: ["31 automated tests", "SHA-256 re-checks before every move", "Undo journal with crash recovery"],
    stack: "Python, Llama 3.1 8B via Ollama, SQLite",
    links: [{ label: "Source", href: "https://github.com/ParramNainani/kshetrajna-drift" }],
  },
  {
    name: "ReVoice",
    glyph: "revoice",
    year: "2026",
    what: "A voice support agent that copes with being interrupted. Every request gets a generation ID, so when you change your mind mid-sentence, answers to the old request are thrown away instead of spoken.",
    proof: ["Built for the Rime hackathon", "Acceptance test replays a real interruption"],
    stack: "TypeScript, LiveKit Agents, Deepgram, OpenAI, React",
    links: [{ label: "Source", href: "https://github.com/ParramNainani/DataForge" }],
  },
  {
    name: "Support-triage RL environment",
    glyph: "rlenv",
    year: "2026",
    what: "An OpenEnv environment where an LLM agent decides whether to resolve, investigate or escalate customer tickets, graded at three difficulty levels.",
    proof: ["Rewards from 0 to 1 per decision", "Dockerised for Hugging Face Spaces"],
    stack: "Python, OpenEnv, Docker, Gradio",
    links: [{ label: "Source", href: "https://github.com/ParramNainani/OpenENV-ScalerSchool" }],
  },
  {
    name: "Finance dashboard backend",
    glyph: "finance",
    year: "2026",
    what: "A REST API for a finance dashboard with three roles, filterable transaction records and summary endpoints for totals, daily trends and categories.",
    proof: ["JWT auth and role-based access", "Zod validation and Swagger docs"],
    stack: "Node.js, Express, PostgreSQL, Prisma, Docker",
    links: [{ label: "Source", href: "https://github.com/ParramNainani/Project-Backend" }],
  },
  {
    name: "NaviiGo",
    glyph: "naviigo",
    year: "2025 – now",
    what: "The travel-tech company I founded and run. naviigo.in helps travellers in India discover places, plan routes and itineraries, and keep their bookings in one workspace.",
    proof: ["Team of 5–7", "MeitY GENESIS Entrepreneur-in-Residence, Cohort 2"],
    stack: "Next.js on Vercel",
    links: [{ label: "Visit naviigo.in", href: "https://naviigo.in" }],
  },
]

const experience = [
  {
    when: "Dec 2025 – now",
    role: "Founder and CEO",
    org: "NaviiGo",
    detail:
      "Started and incorporated the company, lead a team of 5–7, and build the website: flight trip types, rail timetables, hotel links and safer booking handoffs.",
  },
  {
    when: "Jan 2026 – now",
    role: "Web developer",
    org: "COE Nexus",
    detail:
      "Built and maintain 7+ live event and media sites in React, Vite, Firebase and GSAP, including registration and nomination flows for summits and awards.",
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
    detail: "Developed and maintained cross-platform Flutter and Firebase mobile apps with the backend and design teams.",
  },
]

const skills = [
  { group: "Languages", items: "Python, TypeScript, JavaScript, Java, Dart, SQL" },
  { group: "AI and agents", items: "LLM agents, Ollama, LiveKit Agents, RAG, PyTorch, scikit-learn" },
  { group: "Web and back end", items: "React, Next.js, Node.js, Express, PostgreSQL, Prisma, SQLite, Firebase" },
  { group: "Tools", items: "Git, GitHub Actions, Docker, Vercel, Flutter, GSAP, WebGL" },
]

function SectionHeading({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} tabIndex={-1} className="display section-type outline-none">
      {children}
    </h2>
  )
}

export default function HomePage() {
  return (
    <div className="site min-h-screen">
      <a
        href="#work"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-white focus:px-4 focus:py-2"
      >
        Skip to work
      </a>

      <header className="wrap flex items-center justify-between gap-6 py-5">
        <a href="#top" className="title text-lg no-underline">
          Parram Nainani
        </a>
        <nav aria-label="Sections" className="flex items-center gap-6 text-[0.95rem]">
          <a href="#work" className="hidden hover:underline md:inline">
            Work
          </a>
          <a href="#experience" className="hidden hover:underline md:inline">
            Experience
          </a>
          <a href="#research" className="hidden hover:underline md:inline">
            Research
          </a>
          <a href="#contact" className="hidden hover:underline md:inline">
            Contact
          </a>
          <a href={RESUME} target="_blank" rel="noopener" className="btn btn-quiet">
            Résumé (PDF)
          </a>
        </nav>
      </header>

      <main id="top">
        <Hero />

        {/* Work */}
        <section id="work" className="scroll-mt-4">
          <div className="wrap py-20 lg:py-28">
            <SectionHeading id="work-heading">Selected work</SectionHeading>
            <p className="measure muted mt-4 text-lg">
              Things I built outside of client work, with source you can read. Company projects are under Experience.
            </p>

            {/* Lead project */}
            <article data-dot-trigger="kshetrajna" className="card card-lead mt-14" aria-labelledby="kshetrajna">
              <div className="card-lead-top">
                <div>
                  <p className="muted text-[0.95rem]">2026, lead project</p>
                  <h3 id="kshetrajna" className="display card-lead-name mt-2">
                    Kshetrajna
                  </h3>
                  <p className="measure mt-5 text-lg">
                    A private assistant for Windows PCs. It watches app activity and memory pressure, explains what it
                    would change and why, and only acts once you approve: closing or reprioritising apps, trimming
                    memory, moving files to a quarantine you can restore from.
                  </p>
                  <ul className="facts mt-6 space-y-1.5">
                    <li>573 automated tests, with CI on Linux and native Windows</li>
                    <li>Approvals expire, can’t be replayed, and every action is journaled for recovery</li>
                    <li>Reproducible builds, with Windows bundles for x64 and ARM64 (Snapdragon)</li>
                    <li>48 commits over about a month, roughly 12,900 lines of Python with no runtime dependencies</li>
                  </ul>
                  <p className="muted mt-5 text-[0.95rem]">Python, Win32 APIs, SQLite, GitHub Actions</p>
                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    <a className="btn btn-primary" href="https://kshetrajna-os.runs-at.dev/" target="_blank" rel="noopener">
                      Try the live demo
                    </a>
                    <a
                      className="btn btn-quiet"
                      href="https://github.com/Team-SankatMochan/KSHETRAJNA-OS"
                      target="_blank"
                      rel="noopener"
                    >
                      Source on GitHub
                    </a>
                  </div>
                </div>
                <div data-dot-slot="kshetrajna" className="slot slot-lead" aria-hidden="true" />
              </div>

              <div className="card-lead-loop">
                <p className="font-semibold">How every action moves through Kshetrajna</p>
                <ActionLoop />
                <p className="muted mt-5 text-[0.97rem]">
                  Nothing reaches the Act step without an explicit approval, and every action keeps a route back. The
                  same rule runs through Kshetrajna Drift and ReVoice below.
                </p>
              </div>
            </article>

            {/* Other projects */}
            <ul className="mt-8 space-y-8">
              {projects.map((p, i) => (
                <li key={p.name}>
                  <article
                    data-dot-trigger={p.glyph}
                    className={`card card-project ${i % 2 === 1 ? "is-flipped" : ""}`}
                    aria-labelledby={`project-${p.glyph}`}
                  >
                    <div data-dot-slot={p.glyph} className="slot" aria-hidden="true" />
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                        <h3 id={`project-${p.glyph}`} className="display card-name">
                          {p.name}
                        </h3>
                        <p className="muted text-[0.95rem]">{p.year}</p>
                      </div>
                      <p className="measure mt-4 text-[1.08rem]">{p.what}</p>
                      <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-[0.95rem]">
                        {p.proof.map((f) => (
                          <li key={f} className="font-medium">
                            {f}
                          </li>
                        ))}
                      </ul>
                      <p className="muted mt-2 text-[0.95rem]">{p.stack}</p>
                      <p className="mt-5 flex flex-wrap gap-x-6">
                        {p.links.map((l) => (
                          <a key={l.href} className="text-link" href={l.href} target="_blank" rel="noopener">
                            {l.label}
                          </a>
                        ))}
                      </p>
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Experience */}
        <section id="experience" className="bg-[var(--paper)]">
          <div className="wrap py-20 lg:py-28">
            <SectionHeading id="experience-heading">Experience</SectionHeading>
            <ol className="mt-10">
              {experience.map((e) => (
                <li key={e.org} className="rule-top grid gap-2 py-7 md:grid-cols-[12rem_1fr] md:gap-10">
                  <p className="muted condensed text-[1rem] font-semibold">{e.when}</p>
                  <div className="measure">
                    <h3 className="title text-[1.3rem]">
                      {e.role}, {e.org}
                    </h3>
                    <p className="mt-2">{e.detail}</p>
                    {e.links ? (
                      <p className="mt-2 flex flex-wrap gap-x-5 text-[0.95rem]">
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
            </ol>
            <div className="rule-top grid gap-2 py-7 md:grid-cols-[12rem_1fr] md:gap-10">
              <p className="muted condensed text-[1rem] font-semibold">2024 – 2028</p>
              <div>
                <h3 className="title text-[1.3rem]">B.Tech, Computer Science and Engineering (AI and ML), UPES</h3>
                <p className="mt-2">CGPA 8.7 out of 10, Dehradun.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Research and recognition */}
        <section id="research">
          <div className="wrap grid gap-14 py-20 lg:grid-cols-2 lg:py-28">
            <div>
              <SectionHeading id="research-heading">Research</SectionHeading>
              <div className="mt-8 space-y-8">
                <div className="measure">
                  <h3 className="title text-[1.3rem]">How AI-generated content shapes human decisions</h3>
                  <p className="mt-2">
                    A study of AI-induced bias with mentors Pankaj Badoni (UPES) and an Indiana University alumnus. The
                    literature review is under way and the manuscript is planned for December 2026.
                  </p>
                </div>
                <div className="measure">
                  <h3 className="title text-[1.3rem]">LSGA-ViT image recognition</h3>
                  <p className="mt-2">
                    A hybrid model that feeds a CNN stem into Vision Transformer blocks with Local Self-Gating
                    Attention, supervised by faculty member Nitika Nigam.
                  </p>
                </div>
              </div>
            </div>
            <div>
              <SectionHeading id="recognition-heading">Recognition</SectionHeading>
              <ul className="mt-8 space-y-6">
                <li className="measure">
                  <h3 className="title text-[1.3rem]">Smart India Hackathon 2025 Grand Finale</h3>
                  <p className="mt-2">Qualified in December 2025 with a solution for collecting trip-related travel data.</p>
                </li>
                <li className="measure">
                  <h3 className="title text-[1.3rem]">MeitY GENESIS Entrepreneur-in-Residence</h3>
                  <p className="mt-2">Cohort 2, through UPES, with grant funding for NaviiGo.</p>
                </li>
              </ul>

              <h2 className="title mt-14 text-[1.6rem]">Skills</h2>
              <dl className="mt-5 space-y-3">
                {skills.map((s) => (
                  <div key={s.group} className="grid gap-1 sm:grid-cols-[10rem_1fr] sm:gap-4">
                    <dt className="font-semibold">{s.group}</dt>
                    <dd className="muted">{s.items}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" data-dot-trigger="contact" className="bg-[var(--paper)]">
          <div className="wrap grid gap-12 py-20 lg:grid-cols-[1fr_1fr] lg:items-center lg:py-28">
            <div>
              <div data-dot-slot="contact" className="slot slot-contact" aria-hidden="true" />
              <p className="mt-8 text-lg">Hiring for a software engineering internship, or building something with agents?</p>
              <a href={`mailto:${EMAIL}`} className="display contact-email mt-4 block">
                Email me
              </a>
              <p className="mt-3 text-lg">
                <a className="text-link" href={`mailto:${EMAIL}`}>
                  {EMAIL}
                </a>
              </p>
              <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-[1rem]" aria-label="More links">
                <li>
                  <a className="text-link" href={RESUME} target="_blank" rel="noopener">
                    Résumé (PDF)
                  </a>
                </li>
                <li>
                  <a className="text-link" href="https://github.com/ParramNainani" target="_blank" rel="noopener">
                    GitHub
                  </a>
                </li>
                <li>
                  <a className="text-link" href="https://linkedin.com/in/parramnainani" target="_blank" rel="noopener">
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>
            <ApprovalRequest
              title="Interview Parram for a software engineering role"
              why="He ships agents that explain themselves and ask first, with tests to prove it, and is open to software engineering internships."
              effect="Your email app opens a message to parramnainani@gmail.com. Nothing is sent until you press send."
              approvedNote="Your email app should be opening now. If it isn't, write to parramnainani@gmail.com."
              approveHref={`mailto:${EMAIL}?subject=Interview%20with%20Parram%20Nainani`}
              secondary={{ label: "Open résumé", href: RESUME }}
            />
          </div>
          <p className="wrap pb-10 text-sm muted">© 2026 Parram Nainani. Built with Next.js, Three.js and GSAP.</p>
        </section>
      </main>
      <DotField />
    </div>
  )
}
