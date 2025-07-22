"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function Experience() {
  const sectionRef = useRef<HTMLDivElement>(null)

  const experiences = [
    {
      title: "Student Developer",
      organization: "UPES Tech Community",
      period: "2023 - Present",
      description: "Leading development projects and mentoring junior students in Python and Flutter development.",
      achievements: ["Built 3+ mobile applications", "Mentored 10+ students", "Organized coding workshops"],
    },
    {
      title: "Open Source Contributor",
      organization: "Various Projects",
      period: "2023 - Present",
      description: "Contributing to open source projects and building tools for the developer community.",
      achievements: ["20+ contributions", "Bug fixes and features", "Documentation improvements"],
    },
    {
      title: "Freelance Developer",
      organization: "Independent",
      period: "2023 - Present",
      description: "Developing custom solutions for small businesses and startups using Python and Flutter.",
      achievements: ["5+ client projects", "Mobile app development", "Backend API development"],
    },
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Simple timeline line
      gsap.fromTo(
        ".timeline-line",
        { height: 0 },
        {
          height: "100%",
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
          },
        },
      )

      // Experience cards entrance
      gsap.fromTo(
        ".experience-item",
        {
          x: -100,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.3,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        },
      )

      // Timeline dots with energy rings
      document.querySelectorAll(".timeline-dot").forEach((dot, index) => {
        // Create energy rings
        for (let i = 0; i < 2; i++) {
          const ring = document.createElement("div")
          ring.className = "absolute inset-0 border border-white rounded-full opacity-20"
          ring.style.transform = `scale(${1 + i * 0.5})`
          dot.appendChild(ring)

          gsap.to(ring, {
            scale: 2.5 + i,
            opacity: 0,
            duration: 2 + i * 0.5,
            repeat: -1,
            ease: "power2.out",
            delay: index * 0.5 + i * 0.3,
          })
        }

        // Pulsing core
        gsap.to(dot, {
          boxShadow: "0 0 20px rgba(139, 92, 246, 0.6)",
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: index * 0.3,
        })
      })

      // Magnetic hover effect for experience cards
      document.querySelectorAll(".experience-item").forEach((item) => {
        const handleMouseMove = (e: Event) => {
          const mouseEvent = e as MouseEvent
          const rect = (item as HTMLElement).getBoundingClientRect()
          const centerX = rect.left + rect.width / 2
          const centerY = rect.top + rect.height / 2
          const deltaX = (mouseEvent.clientX - centerX) * 0.02
          const deltaY = (mouseEvent.clientY - centerY) * 0.02

          gsap.to(item, {
            x: deltaX,
            y: deltaY,
            duration: 0.6,
            ease: "power2.out",
          })
        }

        const handleMouseEnter = () => {
          gsap.to(item, {
            scale: 1.01,
            duration: 0.4,
            ease: "power2.out",
          })

          // Particle burst
          for (let i = 0; i < 4; i++) {
            const particle = document.createElement("div")
            particle.className = "absolute w-1 h-1 bg-purple-400 rounded-full opacity-70"
            particle.style.left = "50%"
            particle.style.top = "50%"
            particle.style.pointerEvents = "none"
            item.appendChild(particle)

            gsap.to(particle, {
              x: (Math.random() - 0.5) * 100,
              y: (Math.random() - 0.5) * 100,
              scale: 0,
              opacity: 0,
              duration: 1,
              ease: "power2.out",
              onComplete: () => particle.remove(),
            })
          }
        }

        const handleMouseLeave = () => {
          gsap.to(item, {
            x: 0,
            y: 0,
            scale: 1,
            duration: 0.6,
            ease: "elastic.out(1, 0.3)",
          })
        }

        item.addEventListener("mousemove", handleMouseMove)
        item.addEventListener("mouseenter", handleMouseEnter)
        item.addEventListener("mouseleave", handleMouseLeave)
      })

      // Achievement items hover
      document.querySelectorAll(".achievement-item").forEach((item) => {
        item.addEventListener("mouseenter", () => {
          gsap.to(item, {
            x: 5,
            color: "#8b5cf6",
            duration: 0.3,
            ease: "power2.out",
          })
        })

        item.addEventListener("mouseleave", () => {
          gsap.to(item, {
            x: 0,
            color: "#d1d5db",
            duration: 0.3,
            ease: "power2.out",
          })
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={sectionRef} className="min-h-screen py-20 bg-white bg-opacity-5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-5xl md:text-6xl font-bold text-center mb-16">Experience</h2>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 w-0.5 bg-white bg-opacity-30 timeline-line" />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div key={exp.title} className="experience-item relative pl-20 cursor-pointer">
                {/* Timeline dot */}
                <div className="timeline-dot absolute left-6 w-4 h-4 bg-white rounded-full transform -translate-x-1/2 relative" />

                <div className="bg-white bg-opacity-5 p-8 rounded-xl backdrop-blur-sm hover:bg-opacity-8 transition-all duration-500">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-bold mb-2">{exp.title}</h3>
                      <p className="text-xl text-gray-300">{exp.organization}</p>
                    </div>
                    <span className="text-gray-400 mt-2 md:mt-0">{exp.period}</span>
                  </div>

                  <p className="text-gray-300 mb-6 leading-relaxed">{exp.description}</p>

                  <div className="space-y-2">
                    <h4 className="font-semibold text-white">Key Achievements:</h4>
                    <ul className="list-disc list-inside text-gray-300 space-y-1">
                      {exp.achievements.map((achievement, i) => (
                        <li
                          key={i}
                          className="achievement-item hover:text-white transition-colors duration-300 cursor-pointer"
                        >
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
