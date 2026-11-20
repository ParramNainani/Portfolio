"use client"

import { useCallback, useEffect, useRef } from "react"
import { DiffusionPortrait } from "@/components/site/diffusion-portrait"

const RESUME = "/Parram_Nainani_Resume.pdf"
const EMAIL = "parramnainani@gmail.com"

export function Hero() {
  const textRef = useRef<HTMLDivElement>(null)
  const played = useRef(false)

  // One orchestrated entrance: headline lines rise while the portrait denoises.
  const playIntro = useCallback(async () => {
    if (played.current || !textRef.current) return
    played.current = true
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      textRef.current.classList.remove("intro-hidden")
      return
    }
    const { gsap } = await import("gsap")
    const root = textRef.current
    root.classList.remove("intro-hidden")
    gsap.from(root.querySelectorAll("[data-line]"), {
      yPercent: 110,
      duration: 1.1,
      ease: "power4.out",
      stagger: 0.12,
    })
    gsap.from(root.querySelectorAll("[data-fade]"), {
      opacity: 0,
      y: 12,
      duration: 0.8,
      ease: "power2.out",
      delay: 0.7,
      stagger: 0.08,
    })
  }, [])

  // If WebGL never reports ready, still show the text.
  useEffect(() => {
    const t = window.setTimeout(playIntro, 1800)
    return () => window.clearTimeout(t)
  }, [playIntro])

  return (
    <section className="mx-auto grid max-w-[1160px] gap-10 px-5 pb-16 pt-8 sm:px-8 lg:grid-cols-[1.3fr_1fr] lg:items-center lg:gap-6 lg:pb-24 lg:pt-10">
      <div ref={textRef} className="intro-hidden">
        <h1 className="display text-[2.4rem] sm:text-[3.3rem] lg:text-[3.55rem]">
          <span className="line-mask">
            <span data-line className="block lg:whitespace-nowrap">
              I build software
            </span>
          </span>
          <span className="line-mask">
            <span data-line className="block lg:whitespace-nowrap">
              that asks before
            </span>
          </span>
          <span className="line-mask">
            <span data-line className="block lg:whitespace-nowrap">
              it acts.
            </span>
          </span>
        </h1>
        <p data-fade className="measure mt-7 text-lg sm:text-xl">
          I’m Parram Nainani, a computer science student at UPES and the founder of NaviiGo. I make local AI tools,
          agents and web products that explain what they want to do, wait for your approval, and can be undone.
        </p>
        <p data-fade className="muted mt-4">
          B.Tech CSE (AI and ML), graduating 2028. Based in New Delhi. Open to software engineering internships.
        </p>
        <div data-fade className="mt-7 flex flex-wrap items-center gap-3">
          <a href="#work" className="btn btn-primary">
            See my work
          </a>
          <a href={RESUME} target="_blank" rel="noopener" className="btn btn-quiet">
            Open résumé
          </a>
        </div>
        <ul data-fade className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-[0.98rem]" aria-label="Links">
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
      <div className="order-first lg:order-none">
        <DiffusionPortrait onReady={playIntro} />
      </div>
    </section>
  )
}
