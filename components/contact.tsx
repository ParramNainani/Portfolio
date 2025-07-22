"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-item",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        },
      )

      // Floating animation for contact cards
      gsap.to(".contact-card", {
        y: -10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        stagger: 0.3,
        ease: "power2.inOut",
      })

      // Hidden signal waves
      for (let i = 0; i < 6; i++) {
        const wave = document.createElement("div")
        wave.className = "signal-wave absolute w-2 h-2 border border-white opacity-10 rounded-full"
        wave.style.left = Math.random() * 100 + "%"
        wave.style.top = Math.random() * 100 + "%"
        sectionRef.current?.appendChild(wave)

        gsap.to(wave, {
          scale: 3,
          opacity: 0,
          duration: 2,
          repeat: -1,
          ease: "power2.out",
          delay: Math.random() * 2,
        })
      }

      // Contact card hover effects
      document.querySelectorAll(".contact-card").forEach((card) => {
        card.addEventListener("mouseenter", () => {
          gsap.to(card, {
            scale: 1.05,
            rotationY: 5,
            boxShadow: "0 20px 40px rgba(255,255,255,0.1)",
            duration: 0.3,
            ease: "power2.out",
          })

          // Icon bounce
          gsap.to(card.querySelector(".contact-icon"), {
            scale: 1.2,
            rotation: 10,
            duration: 0.3,
            ease: "back.out(1.7)",
          })
        })

        card.addEventListener("mouseleave", () => {
          gsap.to(card, {
            scale: 1,
            rotationY: 0,
            boxShadow: "none",
            duration: 0.3,
            ease: "power2.out",
          })

          gsap.to(card.querySelector(".contact-icon"), {
            scale: 1,
            rotation: 0,
            duration: 0.3,
            ease: "power2.out",
          })
        })
      })

      // CTA button pulse
      gsap.to(".cta-button", {
        boxShadow: "0 0 30px rgba(255,255,255,0.3)",
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const contactMethods = [
    {
      icon: "📧",
      title: "Email",
      value: "parramnainani@gmail.com",
      link: "mailto:parramnainani@gmail.com",
    },
    {
      icon: "💼",
      title: "LinkedIn",
      value: "linkedin.com/in/parramnainani",
      link: "https://www.linkedin.com/in/parramnainani/",
    },
    {
      icon: "🐙",
      title: "GitHub",
      value: "github.com/ParramNainani",
      link: "https://github.com/ParramNainani",
    },
    {
      icon: "📱",
      title: "Phone",
      value: "+91 9953897180",
      link: "tel:+919953897180",
    },
  ]

  return (
    <div ref={sectionRef} className="min-h-screen py-20 bg-white bg-opacity-5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="contact-item text-5xl md:text-6xl font-bold mb-8">Let's Connect</h2>
          <p className="contact-item text-xl text-gray-300 max-w-3xl mx-auto">
            I'm always excited to discuss new opportunities, collaborate on projects, or just chat about technology.
            Feel free to reach out!
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {contactMethods.map((method, index) => (
            <a
              key={method.title}
              href={method.link}
              className="contact-card interactive block bg-white bg-opacity-5 p-6 rounded-xl backdrop-blur-sm text-center hover:bg-opacity-10 transition-all duration-300 transform cursor-pointer"
            >
              <div className="contact-icon text-4xl mb-4">{method.icon}</div>
              <h3 className="text-xl font-bold mb-2">{method.title}</h3>
              <p className="text-gray-300 text-sm break-all">{method.value}</p>
            </a>
          ))}
        </div>

        <div className="contact-item text-center">
          <h3 className="text-3xl font-bold mb-8">Ready to Start Something Amazing?</h3>
          <button className="cta-button interactive px-12 py-4 bg-white text-black rounded-full font-bold text-lg hover:bg-gray-200 transition-colors transform hover:scale-105">
            Get In Touch
          </button>
        </div>

        <div className="contact-item text-center mt-16 pt-16 border-t border-white border-opacity-20">
          <p className="text-gray-400">© 2024 Parram Nainani. Built with Next.js, GSAP, and lots of ☕</p>
        </div>
      </div>
    </div>
  )
}
