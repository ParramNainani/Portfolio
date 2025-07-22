"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function Skills() {
  const sectionRef = useRef<HTMLDivElement>(null)

  const skills = [
    { name: "Python", level: 90, color: "#3776ab", icon: "🐍", quote: "Simple is better than complex." },
    { name: "Flutter", level: 85, color: "#02569B", icon: "📱", quote: "Build beautiful apps for any screen." },
    { name: "Firebase", level: 75, color: "#FFA000", icon: "🔥", quote: "Backend that scales with your dreams." },
    { name: "React", level: 70, color: "#61DAFB", icon: "⚛️", quote: "A library for building user interfaces." },
    { name: "JavaScript", level: 80, color: "#F7DF1E", icon: "⚡", quote: "The language of the web." },
    { name: "Git", level: 85, color: "#F05032", icon: "🌿", quote: "Version control for the modern developer." },
    { name: "SQL", level: 75, color: "#336791", icon: "🗃️", quote: "Data is the new oil." },
    { name: "Node.js", level: 65, color: "#339933", icon: "🟢", quote: "JavaScript everywhere." },
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Simple skill cards entrance
      gsap.fromTo(
        ".skill-item",
        {
          y: 60,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.15,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        },
      )

      // Magnetic hover effect
      document.querySelectorAll(".skill-item").forEach((item) => {
        const handleMouseMove = (e: Event) => {
          const mouseEvent = e as MouseEvent
          const rect = (item as HTMLElement).getBoundingClientRect()
          const centerX = rect.left + rect.width / 2
          const centerY = rect.top + rect.height / 2
          const deltaX = (mouseEvent.clientX - centerX) * 0.05
          const deltaY = (mouseEvent.clientY - centerY) * 0.05

          gsap.to(item, {
            x: deltaX,
            y: deltaY,
            duration: 0.6,
            ease: "power2.out",
          })
        }

        const resetMagnetic = () => {
          gsap.to(item, {
            x: 0,
            y: 0,
            duration: 0.6,
            ease: "elastic.out(1, 0.3)",
          })
        }

        item.addEventListener("mousemove", handleMouseMove)
        item.addEventListener("mouseleave", resetMagnetic)
      })

      // Liquid skill bars
      document.querySelectorAll(".skill-bar").forEach((bar, index) => {
        const skill = skills[index]

        // Create liquid effect
        const liquidBar = document.createElement("div")
        liquidBar.className = "absolute inset-0 rounded-full overflow-hidden"
        liquidBar.innerHTML = `
          <div class="liquid-fill h-full rounded-full" style="
            background: linear-gradient(45deg, ${skill.color}, ${skill.color}88);
            width: 0%;
            position: relative;
            overflow: hidden;
          ">
            <div class="liquid-wave absolute inset-0" style="
              background: radial-gradient(ellipse at center, rgba(255,255,255,0.3) 0%, transparent 70%);
              animation: wave 2s ease-in-out infinite;
            "></div>
          </div>
        `

        bar.appendChild(liquidBar)

        // Animate liquid fill
        gsap.to(liquidBar.querySelector(".liquid-fill"), {
          width: skill.level + "%",
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: bar,
            start: "top 80%",
          },
        })
      })

      // Floating skill icons
      document.querySelectorAll(".skill-icon").forEach((icon, index) => {
        gsap.to(icon, {
          y: Math.sin(index) * 5,
          duration: 3 + index * 0.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        })
      })

      // Particle explosion on hover
      document.querySelectorAll(".skill-item").forEach((item) => {
        item.addEventListener("mouseenter", () => {
          // Create particles
          for (let i = 0; i < 6; i++) {
            const particle = document.createElement("div")
            particle.className = "absolute w-1 h-1 bg-white rounded-full opacity-60"
            particle.style.left = "50%"
            particle.style.top = "50%"
            particle.style.pointerEvents = "none"
            item.appendChild(particle)

            gsap.to(particle, {
              x: (Math.random() - 0.5) * 80,
              y: (Math.random() - 0.5) * 80,
              scale: 0,
              opacity: 0,
              duration: 1,
              ease: "power2.out",
              onComplete: () => particle.remove(),
            })
          }
        })
      })

      // Title with subtle glow
      gsap.to(".skills-title", {
        textShadow: "0 0 20px #8b5cf6, 0 0 40px #06b6d4",
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={sectionRef} className="min-h-screen bg-white bg-opacity-5 py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="skills-title text-5xl md:text-6xl font-bold text-center mb-4">Skills & Technologies</h2>
        <p className="text-xl text-gray-400 text-center mb-20 italic">
          "The best way to predict the future is to create it." — Peter Drucker
        </p>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {skills.map((skill, index) => (
            <div
              key={skill.name}
              className="skill-item bg-white bg-opacity-5 p-6 rounded-xl backdrop-blur-sm cursor-pointer"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="skill-icon text-3xl">{skill.icon}</span>
                  <span className="skill-name text-2xl font-bold">{skill.name}</span>
                </div>
                <span className="skill-percentage text-xl text-gray-400 font-mono">{skill.level}%</span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-4 overflow-hidden shadow-inner mb-4 relative">
                <div
                  className="skill-bar h-full rounded-full transition-all duration-300 shadow-lg relative"
                  data-width={skill.level}
                />
              </div>
              <p className="text-sm text-gray-400 italic">"{skill.quote}"</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            "Technology is best when it brings people together." — Matt Mullenweg
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes wave {
          0%, 100% { transform: translateX(-100%) skewX(0deg); }
          50% { transform: translateX(0%) skewX(-15deg); }
        }
      `}</style>
    </div>
  )
}
