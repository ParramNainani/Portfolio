"use client"

import { useEffect, useRef, useState } from "react"

type Line = { kind: "in" | "out" | "err"; text: string; href?: string }

export type TerminalData = {
  about: string
  projects: { name: string; line: string; href: string }[]
  skills: string[]
  experience: string[]
  email: string
  resume: string
  github: string
  linkedin: string
}

const PROMPT = "parram@portfolio:~$"

export function Terminal({ data }: { data: TerminalData }) {
  const [lines, setLines] = useState<Line[]>([])
  const [value, setValue] = useState("")
  const [ready, setReady] = useState(false)
  const history = useRef<string[]>([])
  const histIdx = useRef(-1)
  const boxRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const started = useRef(false)

  const run = (raw: string): Line[] => {
    const cmd = raw.trim()
    const [name, ...rest] = cmd.split(/\s+/)
    const out = (text: string, href?: string): Line => ({ kind: "out", text, href })
    switch ((name || "").toLowerCase()) {
      case "":
        return []
      case "help":
        return [
          out("about        who I am"),
          out("projects     things I built, with links"),
          out("skills       what I work with"),
          out("experience   where I've worked"),
          out("resume       open my résumé"),
          out("contact      how to reach me"),
          out("github       open my GitHub"),
          out("clear        clear the screen"),
          out("Try: sudo hire-parram"),
        ]
      case "about":
      case "whoami":
        return [out(data.about)]
      case "projects":
      case "ls":
        return data.projects.map((p) => out(`${p.name.padEnd(22, " ")} ${p.line}`, p.href))
      case "skills":
        return data.skills.map((s) => out(s))
      case "experience":
        return data.experience.map((s) => out(s))
      case "resume":
        window.open(data.resume, "_blank", "noopener")
        return [out("Opening résumé in a new tab.", data.resume)]
      case "contact":
      case "email":
        return [out(data.email, `mailto:${data.email}`), out("Or: linkedin")]
      case "github":
        window.open(data.github, "_blank", "noopener")
        return [out("Opening GitHub.", data.github)]
      case "linkedin":
        window.open(data.linkedin, "_blank", "noopener")
        return [out("Opening LinkedIn.", data.linkedin)]
      case "date":
        return [out(new Date().toString())]
      case "echo":
        return [out(rest.join(" "))]
      case "sudo":
        if (rest.join(" ").toLowerCase().includes("hire")) {
          window.location.href = `mailto:${data.email}?subject=Let%27s%20talk%20about%20a%20role`
          return [out("Permission granted. Opening an email to Parram…")]
        }
        return [{ kind: "err", text: "Nice try. Only 'sudo hire-parram' works here." }]
      default:
        return [{ kind: "err", text: `command not found: ${name}. Type 'help'.` }]
    }
  }

  // Types a short intro the first time the terminal scrolls into view.
  useEffect(() => {
    const box = boxRef.current
    if (!box) return
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const io = new IntersectionObserver(
      async ([e]) => {
        if (!e.isIntersecting || started.current) return
        started.current = true
        io.disconnect()
        const intro = "whoami"
        if (reduced) {
          setLines([{ kind: "in" as const, text: intro }, ...run(intro), { kind: "out" as const, text: "Type 'help' to look around." }])
          setReady(true)
          return
        }
        for (let i = 1; i <= intro.length; i++) {
          setValue(intro.slice(0, i))
          await new Promise((r) => setTimeout(r, 90))
        }
        await new Promise((r) => setTimeout(r, 250))
        setValue("")
        setLines([{ kind: "in" as const, text: intro }, ...run(intro), { kind: "out" as const, text: "Type 'help' to look around." }])
        setReady(true)
      },
      { threshold: 0.5 },
    )
    io.observe(box)
    return () => io.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const box = boxRef.current?.querySelector(".term-body")
    if (box) box.scrollTop = box.scrollHeight
  }, [lines])

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const cmd = value
    setValue("")
    if (cmd.trim()) history.current.unshift(cmd)
    histIdx.current = -1
    if (cmd.trim().toLowerCase() === "clear") {
      setLines([])
      return
    }
    setLines((prev) => [...prev, { kind: "in" as const, text: cmd }, ...run(cmd)].slice(-80))
  }

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault()
      histIdx.current = Math.min(history.current.length - 1, histIdx.current + 1)
      setValue(history.current[histIdx.current] ?? "")
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      histIdx.current = Math.max(-1, histIdx.current - 1)
      setValue(histIdx.current < 0 ? "" : history.current[histIdx.current])
    }
  }

  return (
    <div ref={boxRef} className="term" onClick={() => ready && inputRef.current?.focus()}>
      <div className="term-bar" aria-hidden="true">
        <span />
        <span />
        <span />
        <p>parram@portfolio: ~</p>
      </div>
      <div className="term-body" aria-live="polite">
        {lines.map((l, i) => (
          <p key={i} className={`term-line is-${l.kind}`}>
            {l.kind === "in" ? <span className="term-prompt">{PROMPT} </span> : null}
            {l.href ? (
              <a href={l.href} target={l.href.startsWith("mailto:") ? undefined : "_blank"} rel="noopener">
                {l.text}
              </a>
            ) : (
              l.text
            )}
          </p>
        ))}
        <form onSubmit={submit} className="term-form">
          <label htmlFor="term-input" className="term-prompt">
            {PROMPT}
          </label>
          <input
            id="term-input"
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={onKey}
            readOnly={!ready}
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
            aria-label="Type a command, for example help"
          />
        </form>
      </div>
    </div>
  )
}
