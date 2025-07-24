"use client"

import { useEffect, useRef, useState } from "react";
import GlitchText from "./glitch-text"

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const nameRef = useRef<HTMLDivElement>(null)
  const blackHoleRef = useRef<HTMLDivElement>(null)
  const portfolioRef = useRef<HTMLDivElement>(null)
  const [showPortfolio, setShowPortfolio] = useState(false)

  useEffect(() => {
    // Import GSAP and ScrollTrigger only on the client
    const gsap = require("gsap").default;
    const ScrollTrigger = require("gsap/ScrollTrigger").ScrollTrigger;
    gsap.registerPlugin(ScrollTrigger);

    // Set initial opacity of portfolio-content
    gsap.set(".portfolio-content", { opacity: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "+=100%",
        scrub: 1,
        pin: true,
        onUpdate: (self: any) => {
          if (self.progress >= 0.95) {
            setShowPortfolio(true);
            gsap.to(".portfolio-content", { opacity: 1, duration: 1.2, ease: "power3.inOut", overwrite: "auto" });
            document.body.classList.add("show-nav");
          } else {
            setShowPortfolio(false);
            gsap.to(".portfolio-content", { opacity: 0, duration: 0.5, ease: "power3.inOut", overwrite: "auto" });
            document.body.classList.remove("show-nav");
          }
        },
      }
    });
    tl.to(".hero-name", {
      scale: 1200,
      duration: 1.5,
      ease: "power3.inOut",
      overwrite: "auto"
    });

    // Floating animation for hero-name
    gsap.to(".hero-name", {
      y: -10,
      duration: 2.5,
      repeat: -1,
      yoyo: true,
      ease: "power3.inOut",
      overwrite: "auto"
    });

    // Scroll indicator bounce
    gsap.to(".scroll-indicator", {
      y: 10,
      duration: 1.8,
      repeat: -1,
      yoyo: true,
      ease: "power3.inOut",
      overwrite: "auto"
    });
  }, []);

  return (
    <div ref={heroRef} className="min-h-screen bg-white relative overflow-hidden">
      {/* Initial Name Display */}
      <div className="hero-name absolute inset-0 flex items-center justify-start z-10 bg-white text-black" style={{ transformOrigin: '20% center' }}>
        <div ref={nameRef} className="text-center">
          <h1 className="text-4xl md:text-7xl lg:text-[6rem] xl:text-[8rem] font-bold leading-none whitespace-nowrap">
            {"PARRAM NAINANI".split("").map((letter, i, arr) => (
              <span
                key={i}
                className={`letter inline-block cursor-pointer transition-all duration-300${i === 5 ? ' hero-m' : ''}`}
                style={{ transformOrigin: i === 5 ? "center" : "center" }}
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

      {/* Blackout overlay for Apple-like blackout effect */}
      <div className="blackout-overlay fixed inset-0 bg-white z-40 pointer-events-none" style={{ opacity: 0, transition: 'opacity 0.3s' }} />

      {/* Black Hole - appears in the negative space of letters */}
      {/* <div
        ref={blackHoleRef}
        className="black-hole absolute inset-0 flex items-center justify-center z-20"
        style={{ transformOrigin: "center" }}
      >
        <div className="w-32 h-32 bg-black rounded-full" />
      </div> */}

      {/* Portfolio Content - emerges from black */}
      <div ref={portfolioRef} className={`portfolio-content absolute inset-0 bg-black text-white z-30${showPortfolio ? '' : ' hidden'}`}>
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden px-2 md:px-0">
          {/* Enhanced Matrix rain background */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(25)].map((_, i) => (
              <div
                key={i}
                className="matrix-char absolute text-green-700 font-mono opacity-40 animate-matrix"
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
                className="matrix-char absolute text-green-600 font-mono opacity-30 animate-matrix"
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
              <GlitchText text="PARRAM NAINANI" className="text-3xl md:text-6xl font-bold text-black" />
            </div>
            <p className="text-base md:text-xl text-white mb-8">Student Developer • Python • Flutter • Firebase</p>
            <p className="text-sm md:text-lg text-white max-w-2xl mx-auto leading-relaxed mb-12">
              B.Tech Student at UPES Dehradun crafting digital experiences with code and creativity
            </p>
            <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full font-bold text-base md:text-lg hover:scale-110 transform transition-all duration-300 shadow-lg text-white">
              Explore My Universe
            </button>
          </div>

          {/* Scroll Indicator for portfolio */}
          <div className="scroll-indicator absolute bottom-8 left-1/2 transform -translate-x-1/2 text-black">
            <div className="flex flex-col items-center">
              <span className="text-sm mb-2 opacity-70">Continue exploring</span>
              <div className="w-6 h-10 border-2 border-black rounded-full flex justify-center">
                <div className="w-1 h-3 bg-black rounded-full mt-2"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
