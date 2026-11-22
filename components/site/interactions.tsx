"use client"

import { useEffect } from "react"

/**
 * Small page-wide touches, all in response to the visitor:
 * - .tilt      leans toward the pointer with a soft spotlight
 * - .magnetic  buttons drift a little toward the pointer
 * - [data-copy] copies text and confirms
 * - .timeline  fills its line as you scroll and lights each stop
 */
export function Interactions() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches
    const offs: (() => void)[] = []

    if (fine && !reduced) {
      document.querySelectorAll<HTMLElement>(".tilt").forEach((el) => {
        const move = (e: PointerEvent) => {
          const r = el.getBoundingClientRect()
          const x = (e.clientX - r.left) / r.width
          const y = (e.clientY - r.top) / r.height
          el.style.setProperty("--mx", `${x * 100}%`)
          el.style.setProperty("--my", `${y * 100}%`)
          el.style.setProperty("--ry", `${(x - 0.5) * 8}deg`)
          el.style.setProperty("--rx", `${(0.5 - y) * 8}deg`)
          el.classList.add("is-tilting")
        }
        const leave = () => {
          el.style.setProperty("--ry", "0deg")
          el.style.setProperty("--rx", "0deg")
          el.classList.remove("is-tilting")
        }
        el.addEventListener("pointermove", move)
        el.addEventListener("pointerleave", leave)
        offs.push(() => {
          el.removeEventListener("pointermove", move)
          el.removeEventListener("pointerleave", leave)
        })
      })

      document.querySelectorAll<HTMLElement>(".magnetic").forEach((el) => {
        const move = (e: PointerEvent) => {
          const r = el.getBoundingClientRect()
          const dx = e.clientX - (r.left + r.width / 2)
          const dy = e.clientY - (r.top + r.height / 2)
          el.style.transform = `translate(${dx * 0.18}px, ${dy * 0.28}px)`
        }
        const leave = () => {
          el.style.transform = ""
        }
        el.addEventListener("pointermove", move)
        el.addEventListener("pointerleave", leave)
        offs.push(() => {
          el.removeEventListener("pointermove", move)
          el.removeEventListener("pointerleave", leave)
        })
      })
    }

    document.querySelectorAll<HTMLButtonElement>("[data-copy]").forEach((btn) => {
      const label = btn.querySelector<HTMLElement>("[data-copy-label]")
      const original = label?.textContent ?? ""
      const click = async () => {
        try {
          await navigator.clipboard.writeText(btn.dataset.copy ?? "")
          if (label) label.textContent = "Copied to clipboard"
        } catch {
          if (label) label.textContent = btn.dataset.copy ?? ""
        }
        window.setTimeout(() => {
          if (label) label.textContent = original
        }, 1800)
      }
      btn.addEventListener("click", click)
      offs.push(() => btn.removeEventListener("click", click))
    })

    let killGsap = () => {}
    ;(async () => {
      const timeline = document.querySelector<HTMLElement>(".timeline")
      if (!timeline) return
      const items = Array.from(timeline.querySelectorAll<HTMLElement>("li"))
      if (reduced) {
        timeline.style.setProperty("--fill", "1")
        items.forEach((li) => li.classList.add("is-lit"))
        return
      }
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([import("gsap"), import("gsap/ScrollTrigger")])
      gsap.registerPlugin(ScrollTrigger)
      const triggers = [
        ScrollTrigger.create({
          trigger: timeline,
          start: "top 70%",
          end: "bottom 55%",
          onUpdate: (self) => timeline.style.setProperty("--fill", String(self.progress)),
        }),
        ...items.map((li) =>
          ScrollTrigger.create({
            trigger: li,
            start: "top 68%",
            onEnter: () => li.classList.add("is-lit"),
            onLeaveBack: () => li.classList.remove("is-lit"),
          }),
        ),
      ]
      killGsap = () => triggers.forEach((t) => t.kill())
    })()

    return () => {
      offs.forEach((f) => f())
      killGsap()
    }
  }, [])

  return null
}
