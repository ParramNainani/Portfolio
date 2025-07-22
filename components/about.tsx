"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Simple card entrance
      gsap.fromTo(
        ".about-item",
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1.5,
          stagger: 0.3,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end: "bottom 30%",
            toggleActions: "play none none reverse",
          },
        },
      )

      // Advanced text reveal with split animation
      const textElements = document.querySelectorAll(".text-reveal")
      textElements.forEach((element) => {
        const text = element.textContent
        const chars = text?.split("") || []
        element.innerHTML = chars
          .map(
            (char) =>
              `<span class="char" style="display: inline-block; opacity: 0; transform: translateY(20px);">${char === " " ? "&nbsp;" : char}</span>`,
          )
          .join("")

        gsap.to(element.querySelectorAll(".char"), {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.02,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: element,
            start: "top 85%",
          },
        })
      })

      // Mouse-following particle system
      let mouseX = 0,
        mouseY = 0
      const particles: HTMLElement[] = []

      for (let i = 0; i < 15; i++) {
        const particle = document.createElement("div")
        particle.className = "absolute w-1 h-1 bg-purple-400 rounded-full opacity-20"
        particle.style.pointerEvents = "none"
        sectionRef.current?.appendChild(particle)
        particles.push(particle)
      }

      const updateMouse = (e: MouseEvent) => {
        const rect = sectionRef.current?.getBoundingClientRect()
        if (rect) {
          mouseX = e.clientX - rect.left
          mouseY = e.clientY - rect.top
        }
      }

      sectionRef.current?.addEventListener("mousemove", updateMouse)

      particles.forEach((particle, i) => {
        gsap.to(particle, {
          x: () => mouseX + Math.sin(Date.now() * 0.001 + i) * 30,
          y: () => mouseY + Math.cos(Date.now() * 0.001 + i) * 30,
          duration: 2 + i * 0.1,
          repeat: -1,
          ease: "none",
        })
      })

      // Simple card hover effects
      document.querySelectorAll(".about-item").forEach((card) => {
        card.addEventListener("mouseenter", () => {
          gsap.to(card, {
            scale: 1.02,
            y: -5,
            duration: 0.4,
            ease: "power2.out",
          })
        })

        card.addEventListener("mouseleave", () => {
          gsap.to(card, {
            scale: 1,
            y: 0,
            duration: 0.4,
            ease: "power2.out",
          })
        })
      })

      // Parallax title
      gsap.to(".about-title", {
        y: -50,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={sectionRef} className="min-h-screen flex items-center py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div ref={textRef}>
            <h2 className="about-title text-5xl md:text-6xl font-bold mb-8">About Me</h2>
            <div className="space-y-6 text-lg text-gray-300">
              <p className="text-reveal">
                Hey there! I'm Parram, a passionate B.Tech student in my second year at UPES Dehradun. I'm that guy who
                gets excited about clean code and smooth user experiences.
              </p>
              <p className="text-reveal">
                My journey in tech started with curiosity and has evolved into a love for creating digital solutions
                that make a difference. I'm cheerful yet serious about my craft, confident in my abilities, and always
                approachable for a good tech discussion.
              </p>
              <p className="text-reveal">
                When I'm not coding, you'll find me exploring new technologies, contributing to open source projects, or
                brainstorming the next big idea with fellow developers.
              </p>
            </div>
          </div>

          <div className="space-y-8">
            <div className="about-item bg-white bg-opacity-5 p-6 rounded-lg backdrop-blur-sm hover:bg-opacity-8 transition-all duration-500 cursor-pointer">
              <h3 className="text-2xl font-bold mb-4 text-white">🎓 Education</h3>
              <p className="text-gray-300">B.Tech Student, 2nd Year</p>
              <p className="text-gray-400">UPES Dehradun</p>
            </div>

            <div className="about-item bg-white bg-opacity-5 p-6 rounded-lg backdrop-blur-sm hover:bg-opacity-8 transition-all duration-500 cursor-pointer">
              <h3 className="text-2xl font-bold mb-4 text-white">💻 Focus Areas</h3>
              <p className="text-gray-300">Mobile & Web Development</p>
              <p className="text-gray-400">Backend Systems & Cloud</p>
            </div>

            <div className="about-item bg-white bg-opacity-5 p-6 rounded-lg backdrop-blur-sm hover:bg-opacity-8 transition-all duration-500 cursor-pointer">
              <h3 className="text-2xl font-bold mb-4 text-white">🚀 Personality</h3>
              <p className="text-gray-300">Confident • Bold • Playful</p>
              <p className="text-gray-400">Cheerful yet Serious • Approachable</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
