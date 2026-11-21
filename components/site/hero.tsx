"use client"

import { useCallback, useEffect, useRef, useState } from "react"

const RESUME = "/Parram_Nainani_Resume.pdf"
const EMAIL = "parramnainani@gmail.com"

const lines = ["I build", "software", "that asks", "before", "it acts."]

export function Hero() {
  const rootRef = useRef<HTMLElement>(null)
  const played = useRef(false)
  const [step, setStep] = useState(50)

  // One orchestrated entrance: the headline rises line by line while the dots denoise.
  const playIntro = useCallback(async () => {
    const root = rootRef.current
    if (played.current || !root) return
    played.current = true
    root.classList.remove("intro-hidden")
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const { gsap } = await import("gsap")
    gsap.from(root.querySelectorAll("[data-line]"), { yPercent: 105, duration: 1.15, ease: "power4.out", stagger: 0.09 })
    gsap.from(root.querySelectorAll("[data-fade]"), {
      opacity: 0,
      y: 14,
      duration: 0.8,
      ease: "power2.out",
      delay: 0.75,
      stagger: 0.08,
    })
  }, [])

  useEffect(() => {
    const onStep = (e: Event) => setStep((e as CustomEvent<number>).detail)
    window.addEventListener("dotfield:ready", playIntro)
    window.addEventListener("dotfield:step", onStep)
    // If WebGL never reports ready, still show the text.
    const t = window.setTimeout(playIntro, 1600)
    return () => {
      window.removeEventListener("dotfield:ready", playIntro)
      window.removeEventListener("dotfield:step", onStep)
      window.clearTimeout(t)
    }
  }, [playIntro])

  return (
    <section ref={rootRef} data-dot-hero className="hero intro-hidden">
      <div className="hero-grid">
        <h1 className="display hero-type" aria-label="I build software that asks before it acts.">
          {lines.map((l) => (
            <span key={l} className="line-mask" aria-hidden="true">
              <span data-line className="hero-line">
                {l}
              </span>
            </span>
          ))}
        </h1>

        <figure className="portrait">
          <button
            type="button"
            data-dot-slot="portrait"
            className="portrait-slot"
            aria-label="Portrait of Parram drawn in dots. Press to draw it again from noise."
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="portrait-fallback" src="/portrait-gray.png" alt="" width={560} height={560} />
          </button>
          <figcaption className="portrait-caption" data-fade>
            <span>
              Drawn from noise like a diffusion model.{" "}
              <span className="portrait-step" aria-hidden="true">
                Step {String(step).padStart(2, "0")}
              </span>
            </span>
            <span className="muted">
              <span className="hint-mouse">Hover to disturb it, click to draw it again. Then scroll.</span>
              <span className="hint-touch">Tap it to draw it again. Then scroll.</span>
            </span>
          </figcaption>
        </figure>
      </div>

      <div className="hero-foot">
        <p data-fade className="hero-intro">
          I’m Parram Nainani, a computer science student at UPES and the founder of NaviiGo. I make local AI tools,
          agents and web products that explain what they want to do, wait for your approval, and can be undone.
        </p>
        <div data-fade className="hero-actions">
          <div className="flex flex-wrap items-center gap-3">
            <a href="#work" className="btn btn-primary">
              See my work
            </a>
            <a href={RESUME} target="_blank" rel="noopener" className="btn btn-quiet">
              Open résumé
            </a>
          </div>
          <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-[0.98rem]" aria-label="Links">
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
          <p className="muted mt-5 text-[0.95rem]">
            B.Tech CSE (AI and ML), graduating 2028. New Delhi. Open to software engineering internships.
          </p>
        </div>
      </div>
    </section>
  )
}
