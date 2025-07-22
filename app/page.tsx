"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Hero from "@/components/hero"
import About from "@/components/about"
import Skills from "@/components/skills"
import Projects from "@/components/projects"
import Experience from "@/components/experience"
import Hobbies from "@/components/hobbies"
import Contact from "@/components/contact"
import Navigation from "@/components/navigation"
import CustomCursor from "@/components/custom-cursor"

gsap.registerPlugin(ScrollTrigger)

export default function Home() {
  const mainRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Smooth scrolling setup
    gsap.set(mainRef.current, { opacity: 1 })

    // Page load animation for sections after hero
    gsap.fromTo(
      ".page-load",
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power3.out" },
    )

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <div ref={mainRef} className="overflow-x-hidden">
      <CustomCursor />
      <Navigation />

      <main className="relative">
        {/* Hero takes full control of the initial experience */}
        <Hero />

        {/* Rest of the sections start after the zoom transition */}
        <div className="bg-black text-white">
          <section id="about" className="page-load">
            <About />
          </section>

          <section id="skills" className="page-load">
            <Skills />
          </section>

          <section id="projects" className="page-load">
            <Projects />
          </section>

          <section id="experience" className="page-load">
            <Experience />
          </section>

          <section id="hobbies" className="page-load">
            <Hobbies />
          </section>

          <section id="contact" className="page-load">
            <Contact />
          </section>
        </div>
      </main>
    </div>
  )
}
