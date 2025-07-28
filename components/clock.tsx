"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import type { TimeEra } from "@/app/page"

interface ClockProps {
  era: TimeEra
  size?: "normal" | "large"
}

export function Clock({ era, size = "normal" }: ClockProps) {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  if (era === "future") {
    return <DigitalClock time={time} size={size} />
  }

  return <AnalogClock time={time} era={era} size={size} />
}

function AnalogClock({ time, era, size }: { time: Date; era: TimeEra; size: "normal" | "large" }) {
  const hours = time.getHours() % 12
  const minutes = time.getMinutes()
  const seconds = time.getSeconds()

  const hourAngle = hours * 30 + minutes * 0.5
  const minuteAngle = minutes * 6
  const secondAngle = seconds * 6

  const clockSize = size === "large" ? "w-80 h-80" : "w-40 h-40"
  const borderWidth = size === "large" ? "border-8" : "border-4"

  const getClockStyles = () => {
    switch (era) {
      case "past":
        return {
          border: "border-amber-800",
          bg: "bg-gradient-to-br from-amber-50 to-amber-100",
          shadow: "shadow-2xl shadow-amber-800/30",
          numbers: "text-amber-900",
          hands: {
            hour: "bg-amber-900",
            minute: "bg-amber-800",
            center: "bg-amber-900",
          },
        }
      case "present":
        return {
          border: "border-emerald-600",
          bg: "bg-gradient-to-br from-white to-emerald-50",
          shadow: "shadow-2xl shadow-emerald-200/50",
          numbers: "text-emerald-800",
          hands: {
            hour: "bg-emerald-800",
            minute: "bg-emerald-700",
            center: "bg-emerald-800",
          },
        }
      default:
        return {
          border: "border-gray-500",
          bg: "bg-gradient-to-br from-white to-gray-50",
          shadow: "shadow-xl",
          numbers: "text-gray-800",
          hands: {
            hour: "bg-gray-800",
            minute: "bg-gray-700",
            center: "bg-gray-800",
          },
        }
    }
  }

  const styles = getClockStyles()

  return (
    <div className="flex flex-col items-center relative">
      {/* Vintage Clock Frame for Past */}
      {era === "past" && (
        <div className="absolute -inset-4 bg-gradient-to-br from-amber-800/20 to-amber-900/30 rounded-full blur-sm" />
      )}

      <div
        className={`relative ${clockSize} rounded-full ${borderWidth} ${styles.border} ${styles.bg} ${styles.shadow}`}
      >
        {/* Vintage Patina for Past */}
        {era === "past" && (
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-200/20 via-transparent to-amber-800/10" />
        )}

        {/* Clock Face */}
        <div
          className={`absolute ${size === "large" ? "inset-6" : "inset-3"} rounded-full flex items-center justify-center`}
        >
          {/* Roman Numerals for Past */}
          {size === "large" &&
            era === "past" &&
            ["XII", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI"].map((numeral, i) => (
              <div
                key={i}
                className="absolute text-2xl font-serif font-bold text-amber-900"
                style={{
                  transform: `rotate(${i * 30}deg) translateY(-110px) rotate(-${i * 30}deg)`,
                  transformOrigin: "center 110px",
                }}
              >
                {numeral}
              </div>
            ))}

          {/* Regular Numbers for Present */}
          {size === "large" &&
            era === "present" &&
            [...Array(12)].map((_, i) => (
              <div
                key={i}
                className="absolute text-3xl font-bold text-emerald-800"
                style={{
                  transform: `rotate(${i * 30}deg) translateY(-110px) rotate(-${i * 30}deg)`,
                  transformOrigin: "center 110px",
                }}
              >
                {i === 0 ? 12 : i}
              </div>
            ))}

          {/* Hour Hand */}
          <div
            className={`absolute ${size === "large" ? "w-2 h-16" : "w-1.5 h-8"} ${styles.hands.hour} rounded-full z-30 ${era === "past" ? "shadow-lg" : ""}`}
            style={{
              left: "50%",
              top: "50%",
              transformOrigin: "50% 100%",
              transform: `translate(-50%, -50%) rotate(${hourAngle}deg)`,
              marginTop: `-${size === "large" ? "32px" : "16px"}`,
            }}
          />

          {/* Minute Hand */}
          <div
            className={`absolute ${size === "large" ? "w-1.5 h-24" : "w-1 h-12"} ${styles.hands.minute} rounded-full z-20 ${era === "past" ? "shadow-lg" : ""}`}
            style={{
              left: "50%",
              top: "50%",
              transformOrigin: "50% 100%",
              transform: `translate(-50%, -50%) rotate(${minuteAngle}deg)`,
              marginTop: `-${size === "large" ? "48px" : "24px"}`,
            }}
          />

          {/* Second Hand */}
          <div
            className={`absolute w-0.5 ${size === "large" ? "h-28" : "h-14"} bg-red-500 rounded-full z-10`}
            style={{
              left: "50%",
              top: "50%",
              transformOrigin: "50% 100%",
              transform: `translate(-50%, -50%) rotate(${secondAngle}deg)`,
              marginTop: `-${size === "large" ? "56px" : "28px"}`,
            }}
          />

          {/* Center Dot */}
          <div
            className={`absolute ${size === "large" ? "w-4 h-4" : "w-3 h-3"} rounded-full ${styles.hands.center} z-40 shadow-lg`}
            style={{
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />
        </div>
      </div>

      {/* Enhanced Pendulum for Past Era */}
      {era === "past" && (
        <div className="relative mt-2">
          <motion.div
            className={`w-0.5 ${size === "large" ? "h-24" : "h-16"} bg-amber-800 origin-top mx-auto shadow-lg`}
            animate={{ rotate: [-8, 8, -8] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2, ease: "easeInOut" }}
          >
            <div
              className={`absolute -bottom-1 ${
                size === "large" ? "-left-3 w-6 h-6" : "-left-2 w-4 h-4"
              } bg-gradient-to-br from-amber-600 to-amber-800 rounded-full shadow-lg border border-amber-900`}
            />
          </motion.div>
        </div>
      )}
    </div>
  )
}

function DigitalClock({ time, size }: { time: Date; size: "normal" | "large" }) {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour12: false,
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

  return (
    <div className="relative">
      {/* Holographic Glow */}
      <div className="absolute -inset-4 bg-cyan-400/20 rounded-xl blur-lg" />

      <div
        className={`bg-slate-900 border-2 border-cyan-400 rounded-xl ${
          size === "large" ? "p-8 shadow-2xl" : "p-6 shadow-lg"
        } shadow-cyan-400/50 relative overflow-hidden`}
      >
        {/* Animated Circuit Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
              linear-gradient(rgba(6, 182, 212, 0.4) 1px, transparent 1px),
              linear-gradient(90deg, rgba(6, 182, 212, 0.4) 1px, transparent 1px)
            `,
              backgroundSize: "10px 10px",
            }}
          />
        </div>

        {/* Scan Line Effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent w-full h-0.5"
          animate={{
            y: [0, size === "large" ? 120 : 80],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />

        <motion.div
          className={`font-mono ${size === "large" ? "text-6xl" : "text-4xl"} text-cyan-400 tracking-wider text-center font-bold relative z-10`}
          animate={{
            opacity: [1, 0.8, 1],
            textShadow: [
              "0 0 10px rgba(6, 182, 212, 0.5)",
              "0 0 20px rgba(6, 182, 212, 0.8)",
              "0 0 10px rgba(6, 182, 212, 0.5)",
            ],
          }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1 }}
        >
          {formatTime(time)}
        </motion.div>

        {size === "large" && (
          <div className="text-lg text-cyan-300 text-center mt-4 font-mono tracking-wide relative z-10">
            {formatDate(time)}
          </div>
        )}

        <div
          className={`${size === "large" ? "text-sm" : "text-xs"} text-cyan-500 text-center mt-3 font-mono uppercase tracking-widest relative z-10`}
        >
          {size === "large" ? "◦ QUANTUM TEMPORAL INTERFACE ◦" : "FUTURE TIME"}
        </div>

        {/* Corner Decorations */}
        <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-cyan-400/60" />
        <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-cyan-400/60" />
        <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-cyan-400/60" />
        <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-cyan-400/60" />
      </div>
    </div>
  )
}
