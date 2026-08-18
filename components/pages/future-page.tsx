"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { Rocket, Brain, Globe2, Zap, Target, Code, Cpu, Navigation } from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"

export function FuturePage() {
  const isMobile = useIsMobile()
  const roadmapItems = [
    {
      quarter: "2026-2027",
      title: "NaviiGO Global Scale & Enterprise SaaS",
      description:
        "Scaling NaviiGO to become globally recognized as the benchmark in smart navigation and spatial intelligence, alongside launching SankatMochan-AI enterprise platforms worldwide.",
      icon: Navigation,
      status: "in-progress",
    },
    {
      quarter: "2027",
      title: "Enterprise Deployments & Global Hubs",
      description:
        "Deploying NaviiGO across international airports, transit networks, campuses, and mega-venues worldwide while spearheading high-impact AI/ML innovations.",
      icon: Target,
      status: "planning",
    },
    {
      quarter: "2028",
      title: "Global Industry Standard & Worldwide Reach",
      description:
        "Solidifying NaviiGO as an internationally recognized household brand and global navigation standard serving millions of users across multiple continents.",
      icon: Rocket,
      status: "upcoming",
    },
    {
      quarter: "2029+",
      title: "Autonomous AI & Consciousness Tech Frontier",
      description:
        "Building a multi-product deep tech ecosystem fusing autonomous AI systems, spatial computing, and human consciousness enhancements.",
      icon: Cpu,
      status: "future",
    },
  ]

  const dreamProjects = [
    {
      title: "NaviiGO Worldwide",
      description:
        "A globally recognized, AI-driven spatial navigation ecosystem seamlessly guiding millions through complex international airports, transit hubs, universities, and smart cities.",
      icon: Navigation,
      tech: ["Spatial AI", "Computer Vision", "Real-Time Geo-Mapping", "Next.js", "Cloud Infrastructure", "IoT"],
    },
    {
      title: "SankatMochan-AI Enterprise",
      description:
        "Advanced version with Upagrahas, Ashtakavarga, real-time planetary motion, and conversational AI for personalized predictions",
      icon: Brain,
      tech: ["Advanced AI", "Swiss Ephemeris", "Matplotlib", "Conversational AI", "Vedic Algorithms"],
    },
    {
      title: "Automated E-commerce Builder",
      description: "Full-stack platform that builds Shopify stores using AI and user preferences",
      icon: Globe2,
      tech: ["Next.js", "Shopify API", "AI/ML", "PostgreSQL"],
    },
    {
      title: "Consciousness-Tech Platform",
      description: "SaaS platform fusing AI with human consciousness for personal development",
      icon: Cpu,
      tech: ["Advanced AI", "Quantum Computing", "Blockchain", "IoT"],
    },
  ]

  const techToLearn = [
    "TensorFlow",
    "LangChain",
    "Astro.js",
    "Docker",
    "PostgreSQL",
    "GraphQL",
    "Advanced Flutter",
    "Quantum Computing",
    "Blockchain",
  ]

  const matrixCount = isMobile ? 10 : 25
  const [showAllRoadmap, setShowAllRoadmap] = useState(false)
  const [showAllDreams, setShowAllDreams] = useState(false)

  const roadmapToRender = isMobile && !showAllRoadmap ? roadmapItems.slice(0, 2) : roadmapItems
  const dreamsToRender = isMobile && !showAllDreams ? dreamProjects.slice(0, 2) : dreamProjects

  return (
    <div className="min-h-[100svh] safe-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white relative overflow-hidden">
      {/* Enhanced Cyberpunk Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Matrix Rain */}
        {[...Array(matrixCount)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-cyan-400/30 font-mono text-xs"
            style={{
              left: `${(i * 4) % 100}%`,
              top: "-10%",
            }}
            animate={{
              y: ["0vh", "110vh"],
            }}
            transition={{
              duration: 3 + ((i % 4) * (isMobile ? 0.5 : 0.7)),
              repeat: Number.POSITIVE_INFINITY,
              delay: (i * 0.3) % 2,
              ease: "linear",
            }}
          >
            {Array.from({ length: 12 }, (_, j) => String.fromCharCode(0x30a0 + ((i * 13 + j * 5) % 96))).join("")}
          </motion.div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8 sm:mb-12 pt-8 sm:pt-12">
          <h1 className="text-4xl sm:text-6xl font-bold text-cyan-400 mb-3 sm:mb-4 font-mono">FUTURE.PROTOCOL</h1>
          <p className="text-lg sm:text-2xl text-cyan-300 font-mono leading-relaxed">
            {">"} Parram_Nainani.exe - Building the intersection of AI and consciousness
          </p>
          <div className="mt-4 sm:mt-6 flex justify-center space-x-4">
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
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-16">
          {/* Roadmap Section */}
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            <h2 className="text-3xl sm:text-4xl font-bold text-cyan-400 mb-6 sm:mb-8 font-mono">{">"} ROADMAP.EXE</h2>

            <div className="space-y-6">
              {roadmapToRender.map((item, index) => (
                <motion.div
                  key={item.quarter}
                  initial={{ opacity: 0, x: -100 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="bg-slate-800/80 border border-cyan-400/30 rounded-lg p-5 sm:p-6 transition-all backdrop-blur-sm hover:border-cyan-400/60 hover:shadow-lg hover:shadow-cyan-400/20"
                  whileHover={isMobile ? undefined : { scale: 1.02, x: 10 }}
                >
                  <div className="flex items-start space-x-4">
                    <div className="bg-cyan-400/20 p-3 rounded-lg border border-cyan-400/30">
                      <item.icon className="w-6 h-6 text-cyan-400" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="text-cyan-300 font-mono text-sm font-bold">{item.quarter}</span>
                        <div
                          className={`px-2 py-1 rounded text-xs font-mono font-bold ${
                            item.status === "planning"
                              ? "bg-yellow-500/20 text-yellow-400 border border-yellow-400/30"
                              : item.status === "in-progress"
                                ? "bg-green-500/20 text-green-400 border border-green-400/30"
                                : item.status === "upcoming"
                                  ? "bg-blue-500/20 text-blue-400 border border-blue-400/30"
                                  : "bg-purple-500/20 text-purple-400 border border-purple-400/30"
                          }`}
                        >
                          {item.status.toUpperCase()}
                        </div>
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                      <p className="text-gray-300 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Technologies to Learn */}
            <div className="mt-10 sm:mt-12">
              <h3 className="text-xl sm:text-2xl font-bold text-cyan-400 mb-4 sm:mb-6 font-mono">{">"} TECH_STACK.upgrade()</h3>
              <div className="flex flex-wrap gap-3">
                {techToLearn.map((tech, index) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1 + index * 0.1 }}
                    className="px-3 sm:px-4 py-2 bg-slate-800/60 border border-cyan-400/40 text-cyan-300 rounded-lg text-xs sm:text-sm font-mono hover:bg-cyan-400/10 hover:border-cyan-400/60 transition-all cursor-default"
                    whileHover={{ scale: 1.05, y: -2 }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>

            {isMobile && (
              <div className="mt-6">
                <button
                  onClick={() => setShowAllRoadmap((v) => !v)}
                  className="px-4 py-2 border border-cyan-400/40 text-cyan-300 rounded-lg text-sm font-mono hover:bg-cyan-400/10 hover:border-cyan-400/60 transition-all"
                >
                  {showAllRoadmap ? "Show less" : "Show more"}
                </button>
              </div>
            )}
          </motion.div>

          {/* Dream Projects */}
          <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
            <h2 className="text-3xl sm:text-4xl font-bold text-cyan-400 mb-6 sm:mb-8 font-mono">{">"} DREAM_PROJECTS.init()</h2>

            <div className="space-y-6">
              {dreamsToRender.map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  whileHover={isMobile ? undefined : { scale: 1.02, backgroundColor: "rgba(6, 182, 212, 0.05)" }}
                  className="bg-slate-800/60 border border-cyan-400/20 rounded-lg p-5 sm:p-6 hover:border-cyan-400/40 transition-all backdrop-blur-sm"
                >
                  <div className="flex items-start space-x-4 mb-4">
                    <div className="bg-cyan-400/20 p-2 rounded-lg">
                      <project.icon className="w-5 h-5 text-cyan-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-base sm:text-lg font-semibold text-white mb-2">{project.title}</h3>
                      <p className="text-gray-300 text-sm leading-relaxed mb-3">{project.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech) => (
                          <span key={tech} className="px-2 py-1 bg-cyan-400/10 text-cyan-300 rounded text-xs font-mono">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {isMobile && (
              <div className="mt-6">
                <button
                  onClick={() => setShowAllDreams((v) => !v)}
                  className="px-4 py-2 border border-cyan-400/40 text-cyan-300 rounded-lg text-sm font-mono hover:bg-cyan-400/10 hover:border-cyan-400/60 transition-all"
                >
                  {showAllDreams ? "Show less" : "Show more"}
                </button>
              </div>
            )}
          </motion.div>
        </div>

        {/* Vision Statement */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-14 sm:mt-20"
        >
          <div className="bg-gradient-to-r from-cyan-400/20 to-blue-400/20 border border-cyan-400/30 rounded-xl p-6 sm:p-12 backdrop-blur-sm">
            <Rocket className="w-12 h-12 sm:w-16 sm:h-16 text-cyan-400 mx-auto mb-4 sm:mb-6" />
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6 font-mono">MISSION_STATEMENT.exe</h3>
            <p className="text-gray-300 mb-6 sm:mb-8 text-base sm:text-lg leading-relaxed max-w-4xl mx-auto">
              To establish NaviiGO as a globally recognized leader and benchmark in spatial intelligence and navigation,
              while engineering pioneering platforms that fuse artificial intelligence with human consciousness. Scaling
              transformative SaaS solutions to empower millions worldwide and leading visionary teams that elevate human
              potential through code.
            </p>
            <div className="flex flex-wrap justify-center gap-4 sm:space-x-6">
              <motion.a
                href="https://github.com/ParramNainani"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(6, 182, 212, 0.5)" }}
                whileTap={{ scale: 0.95 }}
                className="bg-cyan-400 text-slate-900 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold font-mono hover:bg-cyan-300 transition-all"
              >
                GITHUB.access()
              </motion.a>
              <motion.a
                href="https://linkedin.com/in/parramnainani"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(6, 182, 212, 0.5)" }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-cyan-400 text-cyan-400 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold font-mono hover:bg-cyan-400/10 transition-all"
              >
                LINKEDIN.connect()
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}