"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Clock } from "@/components/clock"
import { TimeLever } from "@/components/time-lever"
import { FullScreenClock } from "@/components/full-screen-clock"
import { PastPage } from "@/components/pages/past-page"
import { PresentPage } from "@/components/pages/present-page"
import { FuturePage } from "@/components/pages/future-page"
import { Footer } from "@/components/footer"

export type TimeEra = "past" | "present" | "future"

export default function HomePage() {
  const [currentEra, setCurrentEra] = useState<TimeEra>("present")

  const renderCurrentPage = () => {
    switch (currentEra) {
      case "past":
        return <PastPage key="past" />
      case "present":
        return <PresentPage key="present" />
      case "future":
        return <FuturePage key="future" />
      default:
        return <PresentPage key="present" />
    }
  }

  const getBackgroundClass = () => {
    switch (currentEra) {
      case "past":
        return "bg-gradient-to-b from-amber-50 to-amber-100 relative overflow-hidden"
      case "present":
        return "bg-gradient-to-b from-emerald-50 to-teal-100 relative overflow-hidden"
      case "future":
        return "bg-gradient-to-b from-slate-900 to-slate-800 relative overflow-hidden"
      default:
        return "bg-gradient-to-b from-emerald-50 to-teal-100 relative overflow-hidden"
    }
  }

  return (
    <div className="relative">
      {/* Hero Section - Clock and Lever Only */}
      <section
        className={`min-h-screen flex flex-col items-center justify-center px-6 transition-all duration-1000 ${getBackgroundClass()}`}
      >
        {/* PAST - Medieval Manuscript Vibes */}
        {currentEra === "past" && (
          <>
            {/* Parchment Background with Texture */}
            <div className="absolute inset-0 opacity-40">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-200/60 via-yellow-100/40 to-amber-300/60" />
              {/* Multiple Coffee Stains */}
              <div className="absolute top-20 left-16 w-32 h-32 bg-amber-800/30 rounded-full blur-md" />
              <div className="absolute bottom-32 right-20 w-24 h-24 bg-amber-900/25 rounded-full blur-sm" />
              <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-amber-700/35 rounded-full blur-sm" />
              <div className="absolute top-1/3 right-1/3 w-20 h-20 bg-amber-600/20 rounded-full blur-lg" />
              {/* Ink Splatters */}
              <div className="absolute top-1/4 right-1/4 w-12 h-12 bg-slate-800/40 rounded-full blur-[3px]" />
              <div className="absolute bottom-1/4 left-1/4 w-8 h-8 bg-slate-700/35 rounded-full blur-[2px]" />
              <div className="absolute top-3/4 right-1/2 w-6 h-6 bg-slate-600/30 rounded-full blur-[1px]" />
            </div>

            {/* Torn Paper Edges - More Dramatic */}
            <div
              className="absolute top-0 left-0 w-full h-12 bg-gradient-to-b from-amber-300/80 to-transparent"
              style={{ clipPath: "polygon(0 0, 100% 0, 92% 100%, 8% 100%)" }}
            />
            <div
              className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-amber-300/80 to-transparent"
              style={{ clipPath: "polygon(8% 0, 92% 0, 100% 100%, 0 100%)" }}
            />
            <div
              className="absolute left-0 top-0 w-8 h-full bg-gradient-to-r from-amber-300/60 to-transparent"
              style={{ clipPath: "polygon(0 0, 100% 5%, 100% 95%, 0 100%)" }}
            />
            <div
              className="absolute right-0 top-0 w-8 h-full bg-gradient-to-l from-amber-300/60 to-transparent"
              style={{ clipPath: "polygon(0 5%, 100% 0, 100% 100%, 0 95%)" }}
            />

            {/* Vintage Stamps Collection */}
            <div className="absolute top-12 right-12 w-20 h-24 border-4 border-amber-800/50 bg-amber-100/70 rotate-12 flex flex-col items-center justify-center shadow-lg">
              <span className="text-amber-800/70 text-xs font-bold">VINTAGE</span>
              <span className="text-amber-700/60 text-[8px]">1885</span>
            </div>
            <div className="absolute top-20 right-40 w-16 h-20 border-3 border-red-800/40 bg-red-100/60 -rotate-6 flex items-center justify-center shadow-md">
              <span className="text-red-800/60 text-[10px] font-bold">CLASSIC</span>
            </div>

            {/* Wax Seals */}
            <div className="absolute bottom-16 left-12 w-16 h-16 bg-red-800/50 rounded-full flex items-center justify-center shadow-xl">
              <div className="w-12 h-12 bg-red-900/70 rounded-full flex items-center justify-center">
                <span className="text-red-100/80 text-xs font-bold">W</span>
              </div>
            </div>
            <div className="absolute bottom-32 left-32 w-12 h-12 bg-blue-800/40 rounded-full flex items-center justify-center shadow-lg">
              <div className="w-8 h-8 bg-blue-900/60 rounded-full" />
            </div>

            {/* Floating Dust Particles */}
            {[...Array(25)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-amber-600/30 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  x: [0, Math.random() * 20 - 10, 0],
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  duration: 4 + Math.random() * 3,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: Math.random() * 2,
                }}
              />
            ))}

            {/* Quill Pen Animation */}
            <motion.div
              className="absolute bottom-20 right-16 w-32 h-2 bg-amber-800/60 rounded-full origin-left"
              animate={{ rotate: [0, 5, -2, 0] }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
            >
              <div className="absolute -right-2 -top-1 w-4 h-4 bg-amber-900/70 rounded-full" />
            </motion.div>
          </>
        )}

        {/* PRESENT - Ultra Modern Tech Vibes */}
        {currentEra === "present" && (
          <>
            {/* Dynamic Grid System */}
            <div className="absolute inset-0 opacity-15">
              <motion.div
                className="absolute inset-0"
                style={{
                  backgroundImage: `
                  linear-gradient(rgba(16, 185, 129, 0.3) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(16, 185, 129, 0.3) 1px, transparent 1px)
                `,
                  backgroundSize: "50px 50px",
                }}
                animate={{
                  backgroundPosition: ["0px 0px", "50px 50px"],
                }}
                transition={{
                  duration: 20,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              />
            </div>

            {/* Floating Geometric Shapes */}
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className={`absolute ${
                  i % 3 === 0
                    ? "w-4 h-4 bg-emerald-400/40 rounded-full"
                    : i % 3 === 1
                      ? "w-6 h-6 bg-teal-400/30 rotate-45"
                      : "w-3 h-8 bg-emerald-500/35 rounded-full"
                }`}
                style={{
                  left: `${15 + i * 7}%`,
                  top: `${20 + i * 6}%`,
                }}
                animate={{
                  y: [0, -40, 0],
                  rotate: [0, 180, 360],
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  duration: 6 + Math.random() * 4,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: i * 0.5,
                }}
              />
            ))}

            {/* Glassmorphism Bubbles */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-white/10 backdrop-blur-sm border border-white/20"
                style={{
                  width: `${60 + i * 20}px`,
                  height: `${60 + i * 20}px`,
                  left: `${10 + i * 10}%`,
                  top: `${15 + i * 8}%`,
                }}
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.1, 0.3, 0.1],
                  y: [0, -20, 0],
                }}
                transition={{
                  duration: 4 + Math.random() * 2,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: i * 0.3,
                }}
              />
            ))}

            {/* Particle Stream */}
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-emerald-400/60 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: Math.random() * 3,
                }}
              />
            ))}

            {/* Morphing Gradient Orbs */}
            <motion.div
              className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-br from-emerald-400/20 to-teal-400/20 rounded-full blur-xl"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: 8,
                repeat: Number.POSITIVE_INFINITY,
              }}
            />
            <motion.div
              className="absolute bottom-1/3 right-1/3 w-24 h-24 bg-gradient-to-br from-teal-400/20 to-emerald-400/20 rounded-full blur-xl"
              animate={{
                scale: [1.2, 0.8, 1.2],
                opacity: [0.3, 0.1, 0.3],
              }}
              transition={{
                duration: 6,
                repeat: Number.POSITIVE_INFINITY,
                delay: 1,
              }}
            />
          </>
        )}

        {/* FUTURE - Cyberpunk Matrix Overdrive */}
        {currentEra === "future" && (
          <>
            {/* Enhanced Matrix Digital Rain */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(30)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-cyan-400/40 font-mono text-sm"
                  style={{
                    left: `${(i * 3.33) % 100}%`,
                    top: "-10%",
                  }}
                  animate={{
                    y: ["0vh", "110vh"],
                  }}
                  transition={{
                    duration: 2 + Math.random() * 3,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: Math.random() * 2,
                    ease: "linear",
                  }}
                >
                  {Array.from({ length: 15 }, () => String.fromCharCode(0x30a0 + Math.random() * 96)).join("")}
                </motion.div>
              ))}
            </div>

            {/* Holographic Grid with Pulse */}
            <motion.div
              className="absolute inset-0 opacity-30"
              animate={{
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
              }}
            >
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `
                  linear-gradient(rgba(6, 182, 212, 0.6) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(6, 182, 212, 0.6) 1px, transparent 1px)
                `,
                  backgroundSize: "30px 30px",
                }}
              />
            </motion.div>

            {/* Multiple Scan Lines */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/20 to-transparent h-6"
                animate={{
                  y: ["-100vh", "100vh"],
                }}
                transition={{
                  duration: 2 + i,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                  delay: i * 0.7,
                }}
              />
            ))}

            {/* Enhanced Floating Holograms */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(15)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute bg-cyan-400/70 rounded-full shadow-lg shadow-cyan-400/50"
                  style={{
                    width: `${8 + (i % 3) * 4}px`,
                    height: `${8 + (i % 3) * 4}px`,
                    left: `${10 + i * 6}%`,
                    top: `${15 + i * 5}%`,
                  }}
                  animate={{
                    scale: [1, 2, 1],
                    opacity: [0.7, 1, 0.7],
                    y: [0, -30, 0],
                    boxShadow: [
                      "0 0 10px rgba(6, 182, 212, 0.5)",
                      "0 0 30px rgba(6, 182, 212, 1)",
                      "0 0 10px rgba(6, 182, 212, 0.5)",
                    ],
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </div>

            {/* Data Streams */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-px h-full bg-gradient-to-b from-transparent via-cyan-400/60 to-transparent"
                style={{
                  left: `${20 + i * 15}%`,
                }}
                animate={{
                  opacity: [0, 1, 0],
                  scaleY: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: i * 0.3,
                }}
              />
            ))}

            {/* Intense Glitch Effects */}
            <motion.div
              className="absolute inset-0 bg-cyan-400/10"
              animate={{
                opacity: [0, 0.3, 0],
                scaleX: [1, 1.05, 1],
                skewX: [0, 2, 0],
              }}
              transition={{
                duration: 0.1,
                repeat: Number.POSITIVE_INFINITY,
                repeatDelay: 2 + Math.random() * 3,
              }}
            />

            {/* Floating Code Snippets */}
            {["</>", "{ }", "=>", "&&", "||"].map((code, i) => (
              <motion.div
                key={i}
                className="absolute text-cyan-300/60 font-mono text-lg font-bold"
                style={{
                  left: `${20 + i * 15}%`,
                  top: `${30 + i * 10}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.6, 1, 0.6],
                  rotate: [0, 5, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: i * 0.5,
                }}
              >
                {code}
              </motion.div>
            ))}

            {/* Neural Network Connections */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
              {[...Array(8)].map((_, i) => (
                <motion.line
                  key={i}
                  x1={`${20 + i * 10}%`}
                  y1={`${30 + i * 8}%`}
                  x2={`${30 + i * 8}%`}
                  y2={`${40 + i * 6}%`}
                  stroke="rgb(6, 182, 212)"
                  strokeWidth="1"
                  animate={{
                    opacity: [0, 0.8, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: i * 0.3,
                  }}
                />
              ))}
            </svg>
          </>
        )}

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex flex-col items-center space-y-16 relative z-10"
        >
          <Clock era={currentEra} size="large" />
          <TimeLever currentEra={currentEra} onEraChange={setCurrentEra} />
        </motion.div>

        {/* Enhanced Scroll Hints */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-8 text-center"
        >
          <motion.p
            className={`text-sm font-medium ${
              currentEra === "past"
                ? "text-amber-800 font-serif"
                : currentEra === "future"
                  ? "text-cyan-400 font-mono"
                  : "text-emerald-700 font-sans"
            }`}
            animate={
              currentEra === "future"
                ? {
                    opacity: [1, 0.5, 1],
                    textShadow: [
                      "0 0 5px rgba(6, 182, 212, 0.5)",
                      "0 0 15px rgba(6, 182, 212, 1)",
                      "0 0 5px rgba(6, 182, 212, 0.5)",
                    ],
                  }
                : currentEra === "present"
                  ? { opacity: [1, 0.8, 1], y: [0, -2, 0] }
                  : {}
            }
            transition={
              currentEra === "future"
                ? { duration: 2, repeat: Number.POSITIVE_INFINITY }
                : currentEra === "present"
                  ? { duration: 3, repeat: Number.POSITIVE_INFINITY }
                  : {}
            }
          >
            {currentEra === "past" && "✦ Scroll to unveil the ancient chronicles ✦"}
            {currentEra === "present" && "◆ Scroll to explore the journey ◆"}
            {currentEra === "future" && "> INITIALIZE_TEMPORAL_SEQUENCE.exe"}
          </motion.p>
        </motion.div>
      </section>

      {/* Full Screen Clock Section */}
      <FullScreenClock era={currentEra} />

      {/* Portfolio Content */}
      <section className="relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentEra}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            {renderCurrentPage()}
          </motion.div>
        </AnimatePresence>
      </section>

      {/* Footer */}
      <Footer era={currentEra} />
    </div>
  )
}
