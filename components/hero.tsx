"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import GlitchText from "./glitch-text"

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const nameRef = useRef<HTMLDivElement>(null)
  const blackHoleRef = useRef<HTMLDivElement>(null)
  const portfolioRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial setup
      gsap.set(".black-hole", { scale: 0, opacity: 0 })
      gsap.set(".portfolio-content", { opacity: 0 })

      // Create the zoom sequence
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "+=200%",
          scrub: 1,
          pin: true,
          onUpdate: (self) => {
            // Show navigation after 70% progress
            if (self.progress > 0.7) {
              document.body.classList.add("show-nav")
            } else {
              document.body.classList.remove("show-nav")
            }
          },
        },
      })

      // Phase 1: Show name and start zoom (0-30%)
      tl.to(".hero-name", {
        scale: 3,
        duration: 1,
        ease: "power2.inOut",
      })

      // Phase 2: Show black hole and zoom into it (30-70%)
      tl.to(
        ".black-hole",
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
        },
        "-=0.3",
      )

      tl.to(".hero-name", {
        scale: 10,
        opacity: 0,
        duration: 1,
        ease: "power2.inOut",
      })

      tl.to(
        ".black-hole",
        {
          scale: 50,
          duration: 1,
          ease: "power2.inOut",
        },
        "-=0.5",
      )

      // Phase 3: Emerge from black into portfolio (70-100%)
      tl.to(
        ".portfolio-content",
        {
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
        },
        "-=0.2",
      )

      // Interactive name effects for initial display
      const letters = nameRef.current?.querySelectorAll(".letter")
      if (letters) {
        letters.forEach((letter) => {
          letter.addEventListener("mouseenter", () => {
            gsap.to(letter, {
              scale: 1.1,
              y: -5,
              color: "#8b5cf6",
              duration: 0.3,
              ease: "back.out(1.7)",
            })
          })

          letter.addEventListener("mouseleave", () => {
            gsap.to(letter, {
              scale: 1,
              y: 0,
              color: "#000000",
              duration: 0.3,
              ease: "back.out(1.7)",
            })
          })
        })
      }

      // Floating animation for name
      gsap.to(".hero-name", {
        y: -10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      })

      // Enhanced matrix rain animation
      gsap.to(".matrix-char", {
        y: "100vh",
        duration: () => Math.random() * 4 + 3,
        repeat: -1,
        ease: "none",
        stagger: {
          each: 0.2,
          repeat: -1,
        },
      })

      // Scroll indicator animation
      gsap.to(".scroll-indicator", {
        y: 10,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={heroRef} className="min-h-screen bg-white relative overflow-hidden">
      {/* Initial Name Display */}
      <div className="hero-name absolute inset-0 flex items-center justify-center z-10">
        <div ref={nameRef} className="text-center">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold text-black leading-none">
            {"PARRAM NAINANI".split("").map((letter, i) => (
              <span
                key={i}
                className="letter inline-block cursor-pointer transition-all duration-300"
                style={{ transformOrigin: "center" }}
              >
                {letter === " " ? "\u00A0" : letter}
              </span>
            ))}
          </h1>
        </div>

        {/* Scroll Indicator */}
        <div className="scroll-indicator absolute bottom-8 left-1/2 transform -translate-x-1/2 text-black">
          <div className="flex flex-col items-center">
            <span className="text-sm mb-2 opacity-70">Scroll to explore</span>
            <div className="w-6 h-10 border-2 border-black rounded-full flex justify-center">
              <div className="w-1 h-3 bg-black rounded-full mt-2"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Black Hole - appears in the negative space of letters */}
      <div
        ref={blackHoleRef}
        className="black-hole absolute inset-0 flex items-center justify-center z-20"
        style={{ transformOrigin: "center" }}
      >
        <div className="w-32 h-32 bg-black rounded-full" />
      </div>

      {/* Portfolio Content - emerges from black */}
      <div ref={portfolioRef} className="portfolio-content absolute inset-0 bg-black text-white z-30">
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
          {/* Enhanced Matrix rain background */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(25)].map((_, i) => (
              <div
                key={i}
                className="matrix-char absolute text-green-400 font-mono opacity-40"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `-20px`,
                  fontSize: `${Math.random() * 14 + 10}px`,
                  animationDelay: `${Math.random() * 5}s`,
                  textShadow: "0 0 5px currentColor",
                }}
              >
                {Math.random() > 0.5 ? "1" : "0"}
              </div>
            ))}
            {/* Japanese characters for authentic matrix feel */}
            {[...Array(15)].map((_, i) => (
              <div
                key={`jp-${i}`}
                className="matrix-char absolute text-green-300 font-mono opacity-30"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `-20px`,
                  fontSize: `${Math.random() * 12 + 8}px`,
                  animationDelay: `${Math.random() * 3}s`,
                  textShadow: "0 0 3px currentColor",
                }}
              >
                {String.fromCharCode(0x30a0 + Math.random() * 96)}
              </div>
            ))}
          </div>

          <div className="text-center z-10">
            {/* Premium glitch effect name */}
            <div className="mb-4">
              <GlitchText text="PARRAM NAINANI" className="text-6xl md:text-8xl font-bold" />
            </div>
            <p className="text-xl md:text-2xl text-gray-300 mb-8">Student Developer • Python • Flutter • Firebase</p>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed mb-12">
              B.Tech Student at UPES Dehradun crafting digital experiences with code and creativity
            </p>
            <button className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full font-bold text-lg hover:scale-110 transform transition-all duration-300 shadow-lg">
              Explore My Universe
            </button>
          </div>

          {/* Scroll Indicator for portfolio */}
          <div className="scroll-indicator absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white">
            <div className="flex flex-col items-center">
              <span className="text-sm mb-2 opacity-70">Continue exploring</span>
              <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
                <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
