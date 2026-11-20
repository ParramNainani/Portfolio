"use client"

import { useEffect, useRef } from "react"

const steps = [
  { step: "Observe" },
  { step: "Diagnose" },
  { step: "Explain" },
  { step: "Approve", tone: "is-consent" },
  { step: "Act" },
  { step: "Verify", tone: "is-verified" },
  { step: "Measure" },
  { step: "Recover" },
]

/** Kshetrajna's eight-step loop. When it scrolls into view, a pulse walks the steps once, pausing at Approve. */
export function ActionLoop() {
  const listRef = useRef<HTMLOListElement>(null)

  useEffect(() => {
    const list = listRef.current
    if (!list || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    let kill = () => {}
    ;(async () => {
      const { gsap } = await import("gsap")
      const { ScrollTrigger } = await import("gsap/ScrollTrigger")
      gsap.registerPlugin(ScrollTrigger)
      const items = Array.from(list.querySelectorAll("li"))
      const tl = gsap.timeline({ paused: true })
      items.forEach((li, i) => {
        tl.fromTo(li, { opacity: 0.35 }, { opacity: 1, duration: 0.18, ease: "none" }, i * 0.18 + (i > 3 ? 0.5 : 0))
        if (i === 3) tl.fromTo(li, { scale: 1 }, { scale: 1.06, yoyo: true, repeat: 1, duration: 0.25 }, ">")
      })
      gsap.set(items, { opacity: 0.35 })
      const st = ScrollTrigger.create({ trigger: list, start: "top 75%", once: true, onEnter: () => tl.play() })
      kill = () => {
        st.kill()
        tl.kill()
        gsap.set(items, { clearProps: "opacity,transform" })
      }
    })()
    return () => kill()
  }, [])

  return (
    <ol ref={listRef} className="loop mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
      {steps.map((s) => (
        <li key={s.step} className={`rounded-xl border border-[var(--rule)] px-3 py-3 font-semibold ${s.tone ?? ""}`}>
          {s.step}
        </li>
      ))}
    </ol>
  )
}
