"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const followerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const follower = followerRef.current

    if (!cursor || !follower) return

    // Add scroll listener for color changes
    const handleScroll = () => {
      const isInDarkSection = window.scrollY > window.innerHeight * 1.5

      if (isInDarkSection) {
        cursor.style.backgroundColor = "white"
        follower.style.borderColor = "white"
      } else {
        cursor.style.backgroundColor = "black"
        follower.style.borderColor = "black"
      }
    }

    window.addEventListener("scroll", handleScroll)

    // Subtle trail particles
    const createTrailParticle = (x: number, y: number) => {
      const particle = document.createElement("div")
      particle.className =
        "fixed w-0.5 h-0.5 bg-white rounded-full pointer-events-none z-30 mix-blend-difference opacity-40"
      particle.style.left = x + "px"
      particle.style.top = y + "px"
      document.body.appendChild(particle)

      gsap.to(particle, {
        scale: 0,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        onComplete: () => particle.remove(),
      })
    }

    let trailCounter = 0
    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "power2.out",
      })

      gsap.to(follower, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3,
        ease: "power2.out",
      })

      // Create subtle trail particles less frequently
      trailCounter++
      if (trailCounter % 8 === 0) {
        createTrailParticle(e.clientX, e.clientY)
      }
    }

    const handleMouseEnter = () => {
      gsap.to([cursor, follower], {
        scale: 1.8,
        duration: 0.3,
        ease: "back.out(1.7)",
      })
    }

    const handleMouseLeave = () => {
      gsap.to([cursor, follower], {
        scale: 1,
        duration: 0.3,
        ease: "back.out(1.7)",
      })
    }

    // Subtle click effect
    const handleClick = () => {
      gsap.to(cursor, {
        scale: 0.8,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut",
      })
    }

    document.addEventListener("mousemove", moveCursor)
    document.addEventListener("click", handleClick)

    const interactiveElements = document.querySelectorAll("a, button, .interactive")
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter)
      el.addEventListener("mouseleave", handleMouseLeave)
    })

    return () => {
      document.removeEventListener("mousemove", moveCursor)
      document.removeEventListener("click", handleClick)
      window.removeEventListener("scroll", handleScroll)
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter)
        el.removeEventListener("mouseleave", handleMouseLeave)
      })
    }
  }, [])

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed w-4 h-4 bg-black rounded-full pointer-events-none z-50 mix-blend-difference transition-colors duration-300"
        style={{ transform: "translate(-50%, -50%)" }}
      />
      <div
        ref={followerRef}
        className="fixed w-8 h-8 border border-black rounded-full pointer-events-none z-40 mix-blend-difference transition-colors duration-300"
        style={{ transform: "translate(-50%, -50%)" }}
      />
    </>
  )
}
