"use client"

/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef } from "react"

export type Panel = {
  id: string
  name: string
  eyebrow: string
  what: string
  proof: string[]
  stack: string
  links: { label: string; href: string }[]
  visual:
    | { kind: "shot"; src: string; url: string; alt: string }
    | { kind: "pair"; a: { src: string; alt: string }; b: { src: string; alt: string } }
    | { kind: "files" | "wave" | "grid" | "bars" }
  tone: string
}

function Visual({ v }: { v: Panel["visual"] }) {
  if (v.kind === "shot") {
    return (
      <div className="frame">
        <div className="frame-bar" aria-hidden="true">
          <span />
          <span />
          <span />
          <p>{v.url}</p>
        </div>
        <img src={v.src} alt={v.alt} width={800} height={500} loading="lazy" draggable={false} />
      </div>
    )
  }
  if (v.kind === "pair") {
    return (
      <div className="pair">
        <img className="pair-a" src={v.a.src} alt={v.a.alt} width={800} height={500} loading="lazy" draggable={false} />
        <img className="pair-b" src={v.b.src} alt={v.b.alt} width={800} height={500} loading="lazy" draggable={false} />
      </div>
    )
  }
  if (v.kind === "files") {
    const files = ["receipt-march.pdf", "client-brief.txt", "IMG_2041.jpg", "notes (2).docx", "invoice_final.pdf"]
    const to = ["Finance", "Work", "Photos", "Work", "Finance"]
    return (
      <div className="mini mini-files" aria-hidden="true">
        {files.map((f, i) => (
          <div key={f} className="file-row" style={{ ["--i" as string]: i } as React.CSSProperties}>
            <span className="file-name">{f}</span>
            <span className="file-to">{to[i]}</span>
          </div>
        ))}
        <p className="mini-note">Moves only what you approve</p>
      </div>
    )
  }
  if (v.kind === "wave") {
    const bars = [0.3, 0.55, 0.85, 0.6, 1, 0.75, 0.45, 0.9, 0.5, 0.15, 0.12, 0.12, 0.12]
    return (
      <div className="mini mini-wave" aria-hidden="true">
        <div className="bars">
          {bars.map((h, i) => (
            <span key={i} className={i > 8 ? "is-cut" : ""} style={{ ["--h" as string]: h, ["--i" as string]: i } as React.CSSProperties} />
          ))}
        </div>
        <p className="mini-note">Interrupted at 0.5 s. Stale answer dropped, new one in about 305 ms.</p>
      </div>
    )
  }
  if (v.kind === "grid") {
    const on = new Set([2, 7, 9, 14])
    return (
      <div className="mini mini-grid" aria-hidden="true">
        <div className="cells">
          {Array.from({ length: 16 }, (_, i) => (
            <span key={i} className={on.has(i) ? "is-on" : ""} style={{ ["--i" as string]: i } as React.CSSProperties} />
          ))}
        </div>
        <p className="mini-note">Resolve, investigate or escalate, scored from 0 to 1</p>
      </div>
    )
  }
  const hs = [0.35, 0.5, 0.42, 0.66, 0.58, 0.85]
  return (
    <div className="mini mini-bars" aria-hidden="true">
      <div className="cols">
        {hs.map((h, i) => (
          <span key={i} style={{ ["--h" as string]: h, ["--i" as string]: i } as React.CSSProperties} />
        ))}
      </div>
      <p className="mini-note">GET /api/summary/trends</p>
    </div>
  )
}

export function WorkGallery({ panels }: { panels: Panel[] }) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const barRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    let cleanup = () => {}
    let cancelled = false
    ;(async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([import("gsap"), import("gsap/ScrollTrigger")])
      if (cancelled) return
      gsap.registerPlugin(ScrollTrigger)
      const section = sectionRef.current
      const track = trackRef.current
      if (!section || !track) return

      const mm = gsap.matchMedia()
      let st: ScrollTrigger | null = null
      mm.add("(min-width: 900px) and (prefers-reduced-motion: no-preference)", () => {
        const distance = () => Math.max(0, track.scrollWidth - window.innerWidth + 64)
        const tween = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.6,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (barRef.current) barRef.current.style.transform = `scaleX(${self.progress})`
            },
          },
        })
        st = tween.scrollTrigger ?? null
        return () => {
          st = null
        }
      })

      // The ring's cards ask to jump to a panel; in pinned mode that means a scroll position.
      const onGoto = (e: Event) => {
        const href = (e as CustomEvent<string>).detail
        const el = track.querySelector<HTMLElement>(href)
        if (!el || !st) return
        e.preventDefault()
        const max = Math.max(1, track.scrollWidth - window.innerWidth + 64)
        const p = Math.min(1, el.offsetLeft / max)
        window.scrollTo({ top: st.start + p * (st.end - st.start) + 2, behavior: "smooth" })
      }
      window.addEventListener("portfolio:goto", onGoto)

      cleanup = () => {
        window.removeEventListener("portfolio:goto", onGoto)
        mm.revert()
      }
    })()
    return () => {
      cancelled = true
      cleanup()
    }
  }, [])

  return (
    <div ref={sectionRef} className="gallery">
      <div className="container gallery-head">
        <h2>Selected work</h2>
        <p>
          Products and projects I built and can show. <span className="hint-mouse">Scroll to move through them.</span>
          <span className="hint-touch">Swipe through them.</span>
        </p>
      </div>
      <div ref={trackRef} className="gallery-track">
        {panels.map((p, i) => (
          <article key={p.id} id={p.id} className="panel" style={{ ["--tone" as string]: p.tone } as React.CSSProperties} aria-labelledby={`${p.id}-h`}>
            <div className="panel-text">
              <p className="panel-index">
                {String(i + 1).padStart(2, "0")} <span>of {String(panels.length).padStart(2, "0")}</span>
              </p>
              <p className="eyebrow">{p.eyebrow}</p>
              <h3 id={`${p.id}-h`}>{p.name}</h3>
              <p className="panel-what">{p.what}</p>
              <ul className="proof">
                {p.proof.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
              <p className="stack">{p.stack}</p>
              <div className="actions">
                {p.links.map((l, j) => (
                  <a key={l.href} href={l.href} target="_blank" rel="noopener" className={j === 0 ? "btn btn-primary magnetic" : "btn magnetic"}>
                    {l.label}
                  </a>
                ))}
              </div>
            </div>
            <div className="panel-visual tilt">
              <Visual v={p.visual} />
            </div>
          </article>
        ))}
      </div>
      <div className="container gallery-progress" aria-hidden="true">
        <span ref={barRef} />
      </div>
    </div>
  )
}
