"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import type { HTMLNavElement } from "react"

export default function Navigation() {
  const navRef = useRef<HTMLNavElement>(null)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    // Initially hide navigation
    gsap.set(navRef.current, { y: -100, opacity: 0 })

    const handleScroll = () => {
      // Change to white text after scrolling past the zoom point
      setIsScrolled(window.scrollY > window.innerHeight * 1.5)
    }

    // Listen for body class changes to show navigation
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "attributes" && mutation.attributeName === "class") {
          const target = mutation.target as HTMLElement
          if (target.classList.contains("show-nav")) {
            gsap.to(navRef.current, {
              y: 0,
              opacity: 1,
              duration: 1,
              ease: "power3.out",
            })
          } else {
            gsap.to(navRef.current, {
              y: -100,
              opacity: 0,
              duration: 0.5,
              ease: "power3.in",
            })
          }
        }
      })
    })

    observer.observe(document.body, { attributes: true })
    window.addEventListener("scroll", handleScroll)

    return () => {
      observer.disconnect()
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <nav ref={navRef} className="fixed top-0 left-0 right-0 z-40 p-6">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <div
          className={`text-2xl font-bold transition-colors duration-300 ${isScrolled ? "text-white" : "text-white"}`}
        >
          PN
        </div>

        <div className="hidden md:flex space-x-8">
          {["about", "skills", "projects", "experience", "hobbies", "contact"].map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item)}
              className={`interactive text-sm uppercase tracking-wider transition-colors duration-300 text-white hover:text-gray-300`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}
