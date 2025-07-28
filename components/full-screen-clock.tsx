"use client"

import { useEffect, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import type { TimeEra } from "@/app/page"

interface FullScreenClockProps {
  era: TimeEra
}

export function FullScreenClock({ era }: FullScreenClockProps) {
  const [time, setTime] = useState(new Date())
  const { scrollYProgress } = useScroll()

  const opacity = useTransform(scrollYProgress, [0.1, 0.3, 0.7, 0.9], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0.1, 0.3, 0.7, 0.9], [0.8, 1, 1, 1.2])

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour12: era !== "future",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getBackgroundClass = () => {
    switch (era) {
      case "past":
        return "bg-gradient-to-br from-amber-900 via-amber-800 to-amber-700"
      case "present":
        return "bg-gradient-to-br from-emerald-800 via-teal-700 to-emerald-900"
      case "future":
        return "bg-gradient-to-br from-slate-900 via-slate-800 to-black"
      default:
        return "bg-gradient-to-br from-emerald-800 via-teal-700 to-emerald-900"
    }
  }

  const getTextStyles = () => {
    switch (era) {
      case "past":
        return {
          time: "text-amber-100 font-serif",
          date: "text-amber-200 font-serif",
          label: "text-amber-300 font-serif italic",
        }
      case "present":
        return {
          time: "text-emerald-100 font-sans",
          date: "text-emerald-200 font-sans",
          label: "text-emerald-300 font-sans",
        }
      case "future":
        return {
          time: "text-cyan-400 font-mono",
          date: "text-cyan-300 font-mono",
          label: "text-cyan-500 font-mono",
        }
      default:
        return {
          time: "text-emerald-100 font-sans",
          date: "text-emerald-200 font-sans",
          label: "text-emerald-300 font-sans",
        }
    }
  }

  const styles = getTextStyles()

  return (
    <motion.section
      style={{ opacity, scale }}
      className={`sticky top-0 h-screen flex items-center justify-center ${getBackgroundClass()} relative overflow-hidden`}
    >
      {/* Background Effects */}
      {era === "past" && (
        <div className="absolute inset-0 opacity-20">
          {/* Paper texture effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-amber-200/10 via-transparent to-amber-400/10" />
          <div className="absolute top-1/4 left-1/4 w-64 h-1 bg-amber-400/30 rotate-12" />
          <div className="absolute bottom-1/3 right-1/4 w-48 h-1 bg-amber-500/40 -rotate-6" />
        </div>
      )}

      {era === "present" && (
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
              linear-gradient(rgba(16, 185, 129, 0.2) 1px, transparent 1px),
              linear-gradient(90deg, rgba(16, 185, 129, 0.2) 1px, transparent 1px)
            `,
              backgroundSize: "60px 60px",
            }}
          />
        </div>
      )}

      {era === "future" && (
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
              linear-gradient(rgba(6, 182, 212, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(6, 182, 212, 0.3) 1px, transparent 1px)
            `,
              backgroundSize: "40px 40px",
            }}
          />
        </div>
      )}

      <div className="text-center space-y-8 relative z-10">
        {/* Main Time Display */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className={`text-8xl md:text-9xl font-bold ${styles.time} tracking-tight`}
        >
          {formatTime(time)}
        </motion.div>

        {/* Date Display */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className={`text-2xl md:text-3xl ${styles.date}`}
        >
          {formatDate(time)}
        </motion.div>

        {/* Era Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className={`text-lg md:text-xl ${styles.label} uppercase tracking-widest`}
        >
          {era === "past" && "Chronicles of Yesterday"}
          {era === "present" && "Living in the Moment"}
          {era === "future" && "Digital Horizons"}
        </motion.div>

        {/* Decorative Elements */}
        {era === "past" && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 2, delay: 0.8 }}
            className="flex justify-center space-x-4 text-amber-400"
          >
            <span className="text-4xl">⚜</span>
            <span className="text-4xl">⚜</span>
            <span className="text-4xl">⚜</span>
          </motion.div>
        )}

        {era === "present" && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="flex justify-center space-x-2"
          >
            <div className="w-3 h-3 bg-emerald-400 rounded-full" />
            <div className="w-3 h-3 bg-teal-400 rounded-full" />
            <div className="w-3 h-3 bg-emerald-400 rounded-full" />
          </motion.div>
        )}

        {era === "future" && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 2, delay: 0.8 }}
            className="flex justify-center space-x-8"
          >
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-cyan-400 rounded-full"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 2,
                  delay: i * 0.2,
                }}
              />
            ))}
          </motion.div>
        )}
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-1 h-1 rounded-full ${
              era === "past" ? "bg-amber-400/30" : era === "present" ? "bg-emerald-400/30" : "bg-cyan-400/30"
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 3 + Math.random() * 2,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </motion.section>
  )
}
