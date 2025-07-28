"use client"

import { motion } from "framer-motion"
import type { TimeEra } from "@/app/page"

interface TimeLeverProps {
  currentEra: TimeEra
  onEraChange: (era: TimeEra) => void
}

export function TimeLever({ currentEra, onEraChange }: TimeLeverProps) {
  const getLeverPosition = () => {
    switch (currentEra) {
      case "past":
        return -25
      case "present":
        return 0
      case "future":
        return 25
      default:
        return 0
    }
  }

  const getThemeStyles = () => {
    switch (currentEra) {
      case "past":
        return {
          base: "bg-amber-100 border-amber-600 shadow-amber-200",
          handle: "bg-amber-700",
          knob: "bg-amber-800",
          text: "text-amber-800",
        }
      case "present":
        return {
          base: "bg-emerald-100 border-emerald-600 shadow-emerald-200",
          handle: "bg-emerald-700",
          knob: "bg-emerald-800",
          text: "text-emerald-800",
        }
      case "future":
        return {
          base: "bg-slate-800 border-cyan-400 shadow-cyan-400/20",
          handle: "bg-cyan-400",
          knob: "bg-cyan-300",
          text: "text-cyan-400",
        }
      default:
        return {
          base: "bg-emerald-100 border-emerald-600 shadow-emerald-200",
          handle: "bg-emerald-700",
          knob: "bg-emerald-800",
          text: "text-emerald-800",
        }
    }
  }

  const styles = getThemeStyles()

  return (
    <div className="flex flex-col items-center space-y-6">
      {/* Lever Mechanism */}
      <div className="relative">
        {/* Lever Base */}
        <div className={`relative w-40 h-20 rounded-xl border-3 ${styles.base} shadow-lg`}>
          {/* Lever Slot */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-1 h-16 bg-black/20 rounded-full" />

          {/* Lever Handle */}
          <motion.div
            className={`absolute top-1 left-1/2 -translate-x-1/2 w-3 h-16 ${styles.handle} rounded-full cursor-pointer shadow-lg`}
            style={{ transformOrigin: "center bottom" }}
            animate={{ rotate: getLeverPosition() }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              const eras: TimeEra[] = ["past", "present", "future"]
              const currentIndex = eras.indexOf(currentEra)
              const nextIndex = (currentIndex + 1) % eras.length
              onEraChange(eras[nextIndex])
            }}
          >
            {/* Lever Knob */}
            <div
              className={`absolute -top-1 -left-1.5 w-6 h-6 ${styles.knob} rounded-full shadow-md border-2 border-white/20`}
            />
          </motion.div>
        </div>

        {/* Era Indicator */}
        <div className={`text-center mt-3 text-sm font-mono ${styles.text} tracking-wider`}>
          {currentEra.toUpperCase()}
        </div>
      </div>

      {/* Era Selection Buttons */}
      <div className="flex space-x-3">
        {(["past", "present", "future"] as TimeEra[]).map((era) => {
          const isActive = currentEra === era
          const getButtonStyles = () => {
            if (isActive) {
              switch (era) {
                case "past":
                  return "bg-amber-600 text-white border-amber-700 shadow-amber-200"
                case "present":
                  return "bg-emerald-600 text-white border-emerald-700 shadow-emerald-200"
                case "future":
                  return "bg-cyan-600 text-white border-cyan-700 shadow-cyan-200"
                default:
                  return "bg-emerald-600 text-white border-emerald-700 shadow-emerald-200"
              }
            }
            return "bg-white text-gray-700 border-gray-300 hover:bg-gray-50 shadow-gray-100"
          }

          return (
            <motion.button
              key={era}
              onClick={() => onEraChange(era)}
              className={`px-6 py-3 rounded-lg font-semibold text-sm border-2 transition-all shadow-lg ${getButtonStyles()}`}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              {era.toUpperCase()}
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
