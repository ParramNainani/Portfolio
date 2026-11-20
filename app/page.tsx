import { ApprovalRequest } from "@/components/site/approval-request"

const RESUME = "/Parram_Nainani_Resume.pdf"
const EMAIL = "parramnainani@gmail.com"

const loop = [
  { step: "Observe" },
  { step: "Diagnose" },
  { step: "Explain" },
  { step: "Approve", tone: "is-consent" },
  { step: "Act" },
  { step: "Verify", tone: "is-verified" },
  { step: "Measure" },
  { step: "Recover" },
]

const projects = [
  {
    name: "Kshetrajna Drift",
    year: "2026",
    what: "A local AI agent for messy folders. Llama 3.1 runs on your own machine, suggests where each loose file belongs and says why, then moves only the files you approve.",
    proof: ["31 automated tests", "SHA-256 re-checks before every move", "Undo journal with crash recovery"],
    stack: "Python, Llama 3.1 8B via Ollama, SQLite",
    links: [{ label: "Source", href: "https://github.com/ParramNainani/kshetrajna-drift" }],
  },
  {
    name: "ReVoice",
    year: "2026",
    what: "A voice support agent that copes with being interrupted. Every request gets a generation ID, so when you change your mind mid-sentence, answers to the old request are thrown away instead of spoken.",
    proof: ["Built for the Rime hackathon", "Acceptance test replays a real interruption"],
    stack: "TypeScript, LiveKit Agents, Deepgram, OpenAI, React",
    links: [{ label: "Source", href: "https://github.com/ParramNainani/DataForge" }],
  },
  {
    name: "Support-triage RL environment",
    year: "2026",
    what: "An OpenEnv environment where an LLM agent decides whether to resolve, investigate or escalate customer tickets, graded at three difficulty levels.",
    proof: ["Rewards from 0 to 1 per decision", "Dockerised for Hugging Face Spaces"],
    stack: "Python, OpenEnv, Docker, Gradio",
    links: [{ label: "Source", href: "https://github.com/ParramNainani/OpenENV-ScalerSchool" }],
  },
  {
    name: "Finance dashboard backend",
    year: "2026",
    what: "A REST API for a finance dashboard with three roles, filterable transaction records and summary endpoints for totals, daily trends and categories.",
    proof: ["JWT auth and role-based access", "Zod validation and Swagger docs"],
    stack: "Node.js, Express, PostgreSQL, Prisma, Docker",
    links: [{ label: "Source", href: "https://github.com/ParramNainani/Project-Backend" }],
  },
  {
    name: "NaviiGo",
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
    <h2 id={id} tabIndex={-1} className="title text-[2rem] sm:text-[2.6rem] outline-none">
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

      <header className="mx-auto flex max-w-[1160px] items-center justify-between gap-6 px-5 py-5 sm:px-8">
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
        {/* Hero */}
        <section className="mx-auto grid max-w-[1160px] gap-12 px-5 pb-20 pt-10 sm:px-8 lg:grid-cols-[1.45fr_1fr] lg:items-center lg:pb-28 lg:pt-16">
          <div>
            <h1 className="display text-[2.7rem] sm:text-[4rem] lg:text-[4.5rem]">
              I build software that asks before it acts.
            </h1>
            <p className="measure mt-7 text-lg sm:text-xl">
              I’m Parram Nainani, a computer science student at UPES and the founder of NaviiGo. I make local AI
              tools, agents and web products that explain what they want to do, wait for your approval, and can be
              undone.
            </p>
            <p className="muted mt-4">
              B.Tech CSE (AI and ML), graduating 2028. Based in New Delhi. Open to software engineering internships.
            </p>
            <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-[0.98rem]" aria-label="Links">
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
              <li>
                <a className="text-link" href={`mailto:${EMAIL}`}>
                  {EMAIL}
                </a>
              </li>
            </ul>
          </div>
          <ApprovalRequest />
        </section>

        {/* Work */}
        <section id="work" className="rule-top scroll-mt-4">
          <div className="mx-auto max-w-[1160px] px-5 py-20 sm:px-8 lg:py-24">
            <SectionHeading id="work-heading">Selected work</SectionHeading>
            <p className="measure muted mt-3">
              Things I built outside of client work, with source you can read. Company projects are under Experience.
            </p>

            {/* Lead project */}
            <article className="mt-12 grid gap-10 lg:grid-cols-[1fr_1.05fr]" aria-labelledby="kshetrajna">
              <div>
                <p className="muted text-[0.95rem]">2026, lead project</p>
                <h3 id="kshetrajna" className="display mt-2 text-[2.4rem] sm:text-[3.2rem]">
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
                <p className="mt-5">
                  <a
                    className="text-link"
                    href="https://github.com/Team-SankatMochan/KSHETRAJNA-OS"
                    target="_blank"
                    rel="noopener"
                  >
                    Source on GitHub
                  </a>
                </p>
              </div>

              <div className="self-start rounded-[18px] bg-[var(--paper)] p-6 sm:p-8">
                <p className="font-semibold">How every action moves through Kshetrajna</p>
                <ol className="loop mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {loop.map((s) => (
                    <li
                      key={s.step}
                      className={`rounded-xl border border-[var(--rule)] px-3 py-3 font-semibold ${s.tone ?? ""}`}
                    >
                      {s.step}
                    </li>
                  ))}
                </ol>
                <p className="muted mt-6 text-[0.97rem]">
                  Nothing reaches the Act step without an explicit approval, and every action keeps a route back. The
                  same rule runs through Kshetrajna Drift and ReVoice below.
                </p>
              </div>
            </article>

            {/* Other projects */}
            <ul className="mt-16">
              {projects.map((p) => (
                <li key={p.name} className="rule-top grid gap-4 py-8 md:grid-cols-[minmax(0,17rem)_1fr_auto] md:gap-10">
                  <div>
                    <h3 className="title text-[1.45rem]">{p.name}</h3>
                    <p className="muted mt-1 text-[0.95rem]">{p.year}</p>
                  </div>
                  <div className="measure">
                    <p>{p.what}</p>
                    <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-[0.95rem]">
                      {p.proof.map((f) => (
                        <li key={f} className="font-medium">
                          {f}
                        </li>
                      ))}
                    </ul>
                    <p className="muted mt-2 text-[0.95rem]">{p.stack}</p>
                  </div>
                  <div className="md:text-right">
                    {p.links.map((l) => (
                      <a key={l.href} className="text-link" href={l.href} target="_blank" rel="noopener">
                        {l.label}
                      </a>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Experience */}
        <section id="experience" className="rule-top bg-[var(--paper)]">
          <div className="mx-auto max-w-[1160px] px-5 py-20 sm:px-8 lg:py-24">
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
        <section id="research" className="rule-top">
          <div className="mx-auto grid max-w-[1160px] gap-14 px-5 py-20 sm:px-8 lg:grid-cols-2 lg:py-24">
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
        <section id="contact" className="bg-[var(--graphite)] text-[var(--fog)]">
          <div className="mx-auto max-w-[1160px] px-5 py-20 sm:px-8 lg:py-28">
            <p className="text-lg">Hiring for a software engineering internship, or building something with agents?</p>
            <a
              href={`mailto:${EMAIL}`}
              className="display mt-5 block break-words text-[1.9rem] text-white underline decoration-[var(--amber)] decoration-[3px] underline-offset-[0.18em] hover:decoration-[5px] sm:text-[3.4rem] lg:text-[4.2rem]"
            >
              {EMAIL}
            </a>
            <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-[1rem]" aria-label="More links">
              <li>
                <a className="underline hover:no-underline" href={RESUME} target="_blank" rel="noopener">
                  Résumé (PDF)
                </a>
              </li>
              <li>
                <a className="underline hover:no-underline" href="https://github.com/ParramNainani" target="_blank" rel="noopener">
                  GitHub
                </a>
              </li>
              <li>
                <a className="underline hover:no-underline" href="https://linkedin.com/in/parramnainani" target="_blank" rel="noopener">
                  LinkedIn
                </a>
              </li>
            </ul>
            <p className="mt-16 text-sm text-[#a7b0ba]">© 2026 Parram Nainani. Built with Next.js.</p>
          </div>
        </section>
      </main>
    </div>
  )
}
