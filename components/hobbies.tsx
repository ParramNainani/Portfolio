"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"

export default function Hobbies() {
  const sectionRef = useRef<HTMLDivElement>(null)

  const hobbies = [
    {
      icon: "🎮",
      title: "Gaming",
      description:
        "Strategic thinking through competitive gaming - from chess to esports, every game teaches problem-solving and quick decision-making under pressure.",
      quote: "Every game is a puzzle waiting to be solved.",
    },
    {
      icon: "📚",
      title: "Tech Literature",
      description:
        "Immersing myself in the latest technological discourse - from research papers to industry insights, staying ahead of the curve in our rapidly evolving digital landscape.",
      quote: "Knowledge is the only currency that appreciates with sharing.",
    },
    {
      icon: "🏃‍♂️",
      title: "Fitness & Wellness",
      description:
        "Maintaining physical and mental equilibrium through regular exercise and mindful practices - because a healthy mind resides in a healthy body.",
      quote: "Discipline in fitness translates to discipline in code.",
    },
    {
      icon: "🎵",
      title: "Musical Exploration",
      description:
        "Finding rhythm in both melodies and algorithms - music provides the creative balance to technical precision, inspiring innovative solutions.",
      quote: "Code is poetry, music is mathematics.",
    },
    {
      icon: "📸",
      title: "Visual Storytelling",
      description:
        "Capturing moments and perspectives through photography - training the eye for composition, detail, and aesthetic sensibility that enhances UI/UX intuition.",
      quote: "Every frame tells a story, every pixel has purpose.",
    },
    {
      icon: "🌱",
      title: "Continuous Learning",
      description:
        "Embracing the philosophy of lifelong education - from new programming paradigms to personal development, growth is the only constant in excellence.",
      quote: "The day you stop learning is the day you start becoming obsolete.",
    },
  ]

  const extracurriculars = [
    {
      title: "Technical Community Leadership",
      role: "Lead Organizer, UPES Developer Circle",
      description:
        "Spearheading initiatives to foster collaborative learning and innovation among aspiring technologists.",
    },
    {
      title: "Educational Workshop Facilitation",
      role: "Senior Mentor & Workshop Conductor",
      description:
        "Designing and delivering comprehensive coding workshops, bridging the gap between theoretical knowledge and practical application.",
    },
    {
      title: "Competitive Programming",
      role: "Active Hackathon Participant",
      description:
        "Engaging in high-stakes problem-solving competitions, honing algorithmic thinking and rapid prototyping skills.",
    },
    {
      title: "Open Source Contribution",
      role: "Community Contributor",
      description:
        "Contributing to meaningful projects that impact the global developer ecosystem, believing in the power of collaborative innovation.",
    },
    {
      title: "Peer Mentorship Program",
      role: "Academic & Technical Mentor",
      description:
        "Guiding fellow students through their technological journey, fostering a culture of knowledge sharing and mutual growth.",
    },
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Elegant entrance for hobby cards
      gsap.fromTo(
        ".hobby-card",
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
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        },
      )

      // Sophisticated extracurricular animations
      gsap.fromTo(
        ".extracurricular-item",
        {
          x: -60,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".extracurriculars",
            start: "top 80%",
          },
        },
      )

      // Title animations
      gsap.fromTo(
        ".section-title",
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        },
      )

      // Enhanced hover effects
      const hobbyCards = document.querySelectorAll(".hobby-card")
      hobbyCards.forEach((card) => {
        card.addEventListener("mouseenter", () => {
          gsap.to(card, {
            y: -10,
            scale: 1.02,
            boxShadow: "0 20px 40px rgba(255,255,255,0.1)",
            duration: 0.3,
            ease: "power2.out",
          })
        })

        card.addEventListener("mouseleave", () => {
          gsap.to(card, {
            y: 0,
            scale: 1,
            boxShadow: "none",
            duration: 0.3,
            ease: "power2.out",
          })
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={sectionRef} className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="section-title text-5xl md:text-6xl font-bold text-center mb-8">Beyond Code</h2>
        <p className="text-xl text-gray-400 text-center mb-20 max-w-4xl mx-auto leading-relaxed italic">
          "The most profound technologies are those that disappear into the fabric of everyday life."
          <br />
          <span className="text-sm">— Mark Weiser</span>
        </p>

        {/* Hobbies Section */}
        <div className="mb-24">
          <h3 className="text-4xl font-bold text-center mb-16 text-gray-200">Personal Pursuits & Passions</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {hobbies.map((hobby, index) => (
              <div
                key={hobby.title}
                className="hobby-card interactive bg-white bg-opacity-5 p-8 rounded-xl backdrop-blur-sm border border-white border-opacity-10 hover:border-opacity-20 transition-all duration-300"
              >
                <div className="text-5xl mb-6 text-center">{hobby.icon}</div>
                <h4 className="text-2xl font-bold mb-4 text-center">{hobby.title}</h4>
                <p className="text-gray-300 leading-relaxed mb-4 text-justify">{hobby.description}</p>
                <blockquote className="text-sm italic text-gray-400 text-center border-l-2 border-gray-600 pl-4">
                  "{hobby.quote}"
                </blockquote>
              </div>
            ))}
          </div>
        </div>

        {/* Extracurriculars Section */}
        <div className="extracurriculars">
          <h3 className="text-4xl font-bold text-center mb-16 text-gray-200">Academic & Professional Engagement</h3>
          <div className="max-w-4xl mx-auto space-y-8">
            {extracurriculars.map((activity, index) => (
              <div
                key={activity.title}
                className="extracurricular-item bg-white bg-opacity-5 p-8 rounded-xl backdrop-blur-sm border border-white border-opacity-10"
              >
                <div className="flex items-start gap-6">
                  <div className="w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mt-2 flex-shrink-0" />
                  <div className="flex-1">
                    <h4 className="text-2xl font-bold mb-2">{activity.title}</h4>
                    <p className="text-lg text-purple-300 mb-3 font-semibold">{activity.role}</p>
                    <p className="text-gray-300 leading-relaxed text-justify">{activity.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-20">
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            These pursuits shape not merely my character, but my approach to technology—infusing creativity, discipline,
            and human understanding into every line of code I write.
          </p>
        </div>
      </div>
    </div>
  )
}
