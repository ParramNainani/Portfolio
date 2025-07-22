"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null)

  const projects = [
    {
      title: "Smart Campus App",
      description:
        "Flutter-based mobile app for UPES students with Firebase backend for real-time updates, attendance tracking, and campus navigation.",
      tech: ["Flutter", "Firebase", "Google Maps API"],
      status: "In Development",
      gradient: "from-purple-500 to-pink-600",
    },
    {
      title: "Python Data Analyzer",
      description:
        "Automated data analysis tool that processes CSV files and generates insightful visualizations and reports.",
      tech: ["Python", "Pandas", "Matplotlib", "Streamlit"],
      status: "Completed",
      gradient: "from-green-500 to-teal-600",
    },
    {
      title: "Task Management System",
      description: "Web-based project management tool with real-time collaboration features and progress tracking.",
      tech: ["React", "Node.js", "MongoDB", "Socket.io"],
      status: "In Development",
      gradient: "from-orange-500 to-red-600",
    },
    {
      title: "Weather Prediction ML",
      description:
        "Machine learning model that predicts weather patterns using historical data and provides accurate forecasts.",
      tech: ["Python", "TensorFlow", "Scikit-learn", "API Integration"],
      status: "Completed",
      gradient: "from-purple-500 to-pink-600",
    },
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Simple card entrance
      gsap.fromTo(
        ".project-card",
        {
          y: 80,
          opacity: 0,
          scale: 0.9,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          stagger: 0.2,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        },
      )

      // Magnetic hover effect
      document.querySelectorAll(".project-card").forEach((card) => {
        const handleMouseMove = (e: Event) => {
          const mouseEvent = e as MouseEvent
          const rect = (card as HTMLElement).getBoundingClientRect()
          const centerX = rect.left + rect.width / 2
          const centerY = rect.top + rect.height / 2
          const deltaX = (mouseEvent.clientX - centerX) * 0.03
          const deltaY = (mouseEvent.clientY - centerY) * 0.03

          gsap.to(card, {
            x: deltaX,
            y: deltaY,
            duration: 0.6,
            ease: "power2.out",
          })
        }

        const handleMouseEnter = () => {
          gsap.to(card, {
            scale: 1.02,
            duration: 0.4,
            ease: "power2.out",
          })

          // Create energy particles
          for (let i = 0; i < 8; i++) {
            const particle = document.createElement("div")
            particle.className = "absolute w-1 h-1 bg-purple-400 rounded-full"
            particle.style.left = Math.random() * 100 + "%"
            particle.style.top = Math.random() * 100 + "%"
            particle.style.pointerEvents = "none"
            card.appendChild(particle)

            gsap.fromTo(
              particle,
              { scale: 0, opacity: 1 },
              {
                scale: 2,
                opacity: 0,
                x: (Math.random() - 0.5) * 100,
                y: (Math.random() - 0.5) * 100,
                duration: 1.2,
                ease: "power2.out",
                onComplete: () => particle.remove(),
              },
            )
          }
        }

        const handleMouseLeave = () => {
          gsap.to(card, {
            x: 0,
            y: 0,
            scale: 1,
            duration: 0.6,
            ease: "elastic.out(1, 0.3)",
          })
        }

        card.addEventListener("mousemove", handleMouseMove)
        card.addEventListener("mouseenter", handleMouseEnter)
        card.addEventListener("mouseleave", handleMouseLeave)
      })

      // Gradient lines with liquid animation
      document.querySelectorAll(".gradient-line").forEach((line, index) => {
        gsap.fromTo(
          line,
          { backgroundPosition: "-200% 0" },
          {
            backgroundPosition: "200% 0",
            duration: 3,
            repeat: -1,
            ease: "sine.inOut",
          },
        )
      })

      // Tech tags with physics
      document.querySelectorAll(".tech-tag").forEach((tag) => {
        tag.addEventListener("mouseenter", () => {
          gsap.to(tag, {
            scale: 1.05,
            duration: 0.3,
            ease: "back.out(1.7)",
          })
        })

        tag.addEventListener("mouseleave", () => {
          gsap.to(tag, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
          })
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={sectionRef} className="min-h-screen py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-5xl md:text-6xl font-bold text-center mb-16 projects-title">Featured Projects</h2>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className="project-card interactive bg-white bg-opacity-5 p-8 rounded-xl backdrop-blur-sm border border-white border-opacity-10 hover:border-opacity-30 transition-all duration-300 transform-gpu cursor-pointer"
            >
              {/* Gradient accent */}
              <div className={`gradient-line w-full h-1 bg-gradient-to-r ${project.gradient} rounded-full mb-6`} />

              <div className="flex justify-between items-start mb-4">
                <h3 className="project-title text-2xl font-bold">{project.title}</h3>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    project.status === "Completed"
                      ? "bg-green-500 bg-opacity-20 text-green-300 border border-green-500 border-opacity-30"
                      : "bg-yellow-500 bg-opacity-20 text-yellow-300 border border-yellow-500 border-opacity-30"
                  }`}
                >
                  {project.status}
                </span>
              </div>

              <p className="text-gray-300 mb-6 leading-relaxed">{project.description}</p>

              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="tech-tag px-3 py-1 bg-white bg-opacity-10 rounded-full text-sm text-gray-300 border border-white border-opacity-20 hover:bg-opacity-20 transition-all duration-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <p className="text-xl text-gray-300 mb-8">Want to see more of my work?</p>
          <button className="interactive px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full font-semibold hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-purple-500/30">
            View GitHub Profile
          </button>
        </div>
      </div>
    </div>
  )
}
