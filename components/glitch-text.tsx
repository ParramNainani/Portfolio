"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"

interface GlitchTextProps {
  text: string
  className?: string
}

export default function GlitchText({ text, className = "" }: GlitchTextProps) {
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = textRef.current
    if (!element) return

    // Create smooth glitch effect with GSAP
    const createSmoothGlitch = () => {
      const tl = gsap.timeline()

      // Subtle color shift
      tl.to(element, {
        color: "#00ff41",
        duration: 0.1,
        ease: "power2.inOut",
      })

      // Slight position glitch
      tl.to(
        element,
        {
          x: gsap.utils.random(-2, 2),
          y: gsap.utils.random(-1, 1),
          duration: 0.05,
          ease: "power2.inOut",
        },
        0,
      )

      // Text shadow effect
      tl.to(
        element,
        {
          textShadow: "2px 0 #ff0000, -2px 0 #00ffff",
          duration: 0.1,
          ease: "power2.inOut",
        },
        0,
      )

      // Reset
      tl.to(element, {
        x: 0,
        y: 0,
        color: "#22c55e",
        textShadow: "0 0 10px #22c55e",
        duration: 0.2,
        ease: "power2.out",
      })

      return tl
    }

    // Smooth letter flip animation
    const createLetterFlip = () => {
      const letters = text.split("")
      const spans = letters.map((letter, i) => {
        const span = document.createElement("span")
        span.textContent = letter === " " ? "\u00A0" : letter
        span.style.display = "inline-block"
        span.style.transformOrigin = "center"
        return span
      })

      element.innerHTML = ""
      spans.forEach((span) => element.appendChild(span))

      const tl = gsap.timeline()

      // Smooth wave flip effect
      spans.forEach((span, i) => {
        tl.to(
          span,
          {
            rotationY: 360,
            color: "#00ff41",
            scale: 1.1,
            duration: 0.6,
            ease: "power2.inOut",
          },
          i * 0.05,
        )

        tl.to(
          span,
          {
            scale: 1,
            color: "#22c55e",
            duration: 0.3,
            ease: "power2.out",
          },
          i * 0.05 + 0.3,
        )
      })

      return tl
    }

    // Hover effect
    element.addEventListener("mouseenter", () => {
      createSmoothGlitch()
    })

    // Auto effects
    const autoGlitch = setInterval(() => {
      if (Math.random() > 0.5) {
        createSmoothGlitch()
      } else {
        createLetterFlip()
      }
    }, 3000)

    // Initial effect
    setTimeout(() => {
      createLetterFlip()
    }, 1000)

    // Continuous subtle glow
    gsap.to(element, {
      textShadow: "0 0 20px #22c55e, 0 0 40px #22c55e",
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    })

    return () => {
      clearInterval(autoGlitch)
    }
  }, [text])

  return (
    <div
      ref={textRef}
      className={`cursor-pointer transition-all duration-300 ${className}`}
      style={{
        textShadow: "0 0 10px #22c55e",
        color: "#22c55e",
      }}
    >
      {text}
    </div>
  )
}
