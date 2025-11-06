"use client"

import { motion } from "framer-motion"
import { GraduationCap, Code, Award, Star, Zap } from "lucide-react"

export function PastPage() {
  const timelineEvents = [
    {
      year: "2020",
      title: "The Python Awakening",
      description:
        "Started coding journey with Python - the language that would become my gateway to infinite possibilities",
      icon: Code,
      color: "bg-amber-600",
    },
    {
      year: "2021",
      title: "First Digital Creation",
      description: "Built Python-based image sorter using OpenCV and Pillow - my first taste of computer vision magic",
      icon: Star,
      color: "bg-amber-700",
    },
    {
      year: "2022",
      title: "E-commerce Mastery Begins",
      description: "Launched Apna Camphor - my first Shopify store that opened the doors to web development",
      icon: Zap,
      color: "bg-amber-800",
    },
    {
      year: "2023",
      title: "Certified Shopify Developer",
      description: "Achieved Shopify certification while pursuing B.Tech in Computer Science Engineering",
      icon: Award,
      color: "bg-amber-900",
    },
    {
      year: "2024",
      title: "AI Meets Ancient Wisdom",
      description:
        "Built SankatMochan-AI - a revolutionary engine combining Vedic astrology with AI for real-time life predictions",
      icon: GraduationCap,
      color: "bg-amber-950",
    },
  ]

  return (
    <div className="min-h-svh safe-screen bg-gradient-to-b from-amber-50 to-amber-100 relative overflow-hidden">
      {/* Enhanced Vintage Background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none overflow-hidden">
        <div className="absolute top-10 left-10 w-40 h-40 bg-amber-800/20 rounded-full blur-xl max-sm:hidden" />
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-amber-900/15 rounded-full blur-lg max-sm:hidden" />
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-amber-700/25 rounded-full blur-md max-sm:hidden" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10 sm:mb-16">
          <h1 className="text-4xl sm:text-6xl font-serif text-amber-900 mb-4 sm:mb-6">The Genesis Chronicles</h1>
          <p className="text-lg sm:text-2xl text-amber-700 font-serif italic leading-relaxed">
            "From Python's first 'Hello World' to building AI that reads the stars..."
          </p>
          <div className="mt-4 flex justify-center space-x-4 text-amber-600">
            <span className="text-2xl">⚜</span>
            <span className="text-2xl">✦</span>
            <span className="text-2xl">⚜</span>
          </div>
        </motion.div>

        {/* About Section */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-amber-50/80 border-2 border-amber-200 rounded-lg p-5 sm:p-8 mb-10 sm:mb-12 shadow-xl backdrop-blur-sm"
        >
          <h2 className="text-3xl sm:text-4xl font-serif text-amber-900 mb-4 sm:mb-6">The Origin Story</h2>
          <div className="text-amber-800 leading-relaxed font-serif text-base sm:text-lg space-y-4">
            <p>
              In the bustling streets of <strong>New Delhi</strong>, a curious mind discovered the magic of code in
              2020. What started as simple Python scripts evolved into a journey that would bridge the ancient wisdom of
              Vedic astrology with cutting-edge artificial intelligence.
            </p>
            <p>
              From building image sorters with OpenCV to launching Shopify empires, from pursuing B.Tech in Computer
              Science to creating AI engines that decode planetary movements - this is the story of transformation
              through technology.
            </p>
            <p className="text-amber-700 italic">
              "Every line of code written in the past was a stepping stone to the AI-powered future we're building
              today."
            </p>
          </div>
          <motion.a
            href="https://drive.google.com/file/d/1wifQg0kPMvbeGwFIOPPwnJaA9iw0Qygq/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(217, 119, 6, 0.3)" }}
            whileTap={{ scale: 0.95 }}
            className="mt-8 inline-block bg-gradient-to-r from-amber-700 to-amber-800 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:from-amber-800 hover:to-amber-900 transition-all shadow-lg touch-target"
          >
            📜 Download Resume
          </motion.a>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          <h2 className="text-3xl sm:text-4xl font-serif text-amber-900 mb-8 sm:mb-12 text-center">The Journey Through Time</h2>

          {/* Timeline Line */}
          <div className="absolute left-6 sm:left-8 top-20 bottom-0 w-1 bg-gradient-to-b from-amber-400 via-amber-500 to-amber-600 shadow-lg"></div>

          <div className="space-y-8 sm:space-y-12">
            {timelineEvents.map((event, index) => (
              <motion.div
                key={event.year}
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.2 }}
                className="relative flex items-start space-x-6 sm:space-x-8"
              >
                {/* Timeline Dot */}
                <div
                  className={`relative z-10 w-14 h-14 sm:w-16 sm:h-16 ${event.color} rounded-full flex items-center justify-center shadow-xl border-4 border-amber-100`}
                >
                  <event.icon className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <motion.div
                  className="flex-1 bg-white/90 border-2 border-amber-200 rounded-xl p-5 sm:p-8 shadow-lg backdrop-blur-sm hover:shadow-xl transition-all"
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  <div className="flex items-center space-x-4 mb-4">
                    <span className="text-2xl sm:text-3xl font-bold text-amber-900 font-serif">{event.year}</span>
                    <div className="h-px bg-amber-300 flex-1"></div>
                    <h3 className="text-xl sm:text-2xl font-serif text-amber-800 font-semibold">{event.title}</h3>
                  </div>
                  <p className="text-amber-700 leading-relaxed text-base sm:text-lg font-serif">{event.description}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Decorative Elements */}
          <div className="mt-16 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 2 }}
              className="inline-flex items-center space-x-4 text-amber-600"
            >
              <span className="text-3xl">✦</span>
              <span className="font-serif text-xl text-amber-800">The foundation was laid...</span>
              <span className="text-3xl">✦</span>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}