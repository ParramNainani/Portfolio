"use client"

import { motion } from "framer-motion"
import { Rocket, Brain, Globe2, Zap, Target, Code, Cpu } from "lucide-react"

export function FuturePage() {
  const roadmapItems = [
    {
      quarter: "2024-2026",
      title: "Academic & Practical AI Mastery",
      description:
        "Deepening expertise in core AI/ML domains, aligning with advanced subjects like Deep Learning, NLP, and Computer Vision offered at UPES.",
      icon: Code,
      status: "in-progress",
    },
    {
      quarter: "2026",
      title: "SankatMochan-AI Capstone Project",
      description:
        "Developing SankatMochan-AI into a comprehensive final year project, showcasing advanced AI/ML capabilities and launching it as a SaaS platform.",
      icon: Brain,
      status: "planning",
    },
    {
      quarter: "2027",
      title: "AI/ML Engineer Role",
      description:
        "Secure a challenging role as an AI/ML Engineer at a product-based company, applying academic knowledge to solve real-world problems.",
      icon: Target,
      status: "upcoming",
    },
    {
      quarter: "2028+",
      title: "SaaS Empire",
      description: "Build profitable SaaS product serving 10,000+ users with AI-powered life insights, evolving from the initial SankatMochan-AI concept.",
      icon: Rocket,
      status: "future",
    },
  ]

  const dreamProjects = [
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
      title: "Mood-Adaptive Chrome Extension",
      description: "Browser extension that reads user mood and adapts interface accordingly",
      icon: Zap,
      tech: ["Chrome APIs", "Computer Vision", "React", "Firebase"],
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 py-12 text-white relative overflow-hidden">
      {/* Enhanced Cyberpunk Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Matrix Rain */}
        {[...Array(25)].map((_, i) => (
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
              duration: 3 + Math.random() * 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
              ease: "linear",
            }}
          >
            {Array.from({ length: 12 }, () => String.fromCharCode(0x30a0 + Math.random() * 96)).join("")}
          </motion.div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <h1 className="text-6xl font-bold text-cyan-400 mb-6 font-mono">FUTURE.PROTOCOL</h1>
          <p className="text-2xl text-cyan-300 font-mono leading-relaxed">
            {">"} Param_Nainani.exe - Building the intersection of AI and consciousness
          </p>
          <div className="mt-6 flex justify-center space-x-4">
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

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Roadmap Section */}
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            <h2 className="text-4xl font-bold text-cyan-400 mb-8 font-mono">{">"} ROADMAP.EXE</h2>

            <div className="space-y-6">
              {roadmapItems.map((item, index) => (
                <motion.div
                  key={item.quarter}
                  initial={{ opacity: 0, x: -100 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.2 }}
                  className="bg-slate-800/80 border border-cyan-400/30 rounded-lg p-6 hover:border-cyan-400/60 transition-all backdrop-blur-sm hover:shadow-lg hover:shadow-cyan-400/20"
                  whileHover={{ scale: 1.02, x: 10 }}
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
            <div className="mt-12">
              <h3 className="text-2xl font-bold text-cyan-400 mb-6 font-mono">{">"} TECH_STACK.upgrade()</h3>
              <div className="flex flex-wrap gap-3">
                {techToLearn.map((tech, index) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1 + index * 0.1 }}
                    className="px-4 py-2 bg-slate-800/60 border border-cyan-400/40 text-cyan-300 rounded-lg text-sm font-mono hover:bg-cyan-400/10 hover:border-cyan-400/60 transition-all cursor-default"
                    whileHover={{ scale: 1.05, y: -2 }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Dream Projects */}
          <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
            <h2 className="text-4xl font-bold text-cyan-400 mb-8 font-mono">{">"} DREAM_PROJECTS.init()</h2>

            <div className="space-y-6">
              {dreamProjects.map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  whileHover={{ scale: 1.02, backgroundColor: "rgba(6, 182, 212, 0.05)" }}
                  className="bg-slate-800/60 border border-cyan-400/20 rounded-lg p-6 hover:border-cyan-400/40 transition-all backdrop-blur-sm"
                >
                  <div className="flex items-start space-x-4 mb-4">
                    <div className="bg-cyan-400/20 p-2 rounded-lg">
                      <project.icon className="w-5 h-5 text-cyan-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white mb-2">{project.title}</h3>
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
          </motion.div>
        </div>

        {/* Vision Statement */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-20"
        >
          <div className="bg-gradient-to-r from-cyan-400/20 to-blue-400/20 border border-cyan-400/30 rounded-xl p-12 backdrop-blur-sm">
            <Rocket className="w-16 h-16 text-cyan-400 mx-auto mb-6" />
            <h3 className="text-3xl font-bold text-white mb-6 font-mono">MISSION_STATEMENT.exe</h3>
            <p className="text-gray-300 mb-8 text-lg leading-relaxed max-w-4xl mx-auto">
              To become a thought leader in the AI + Human Behavior space, building intelligent SaaS platforms that fuse
              artificial intelligence with human consciousness. By 2026, launch a profitable SaaS product serving
              thousands while leading a team of passionate creators who believe technology can enhance human potential.
            </p>
            <div className="flex justify-center space-x-6">
              <motion.a
                href="https://github.com/ParramNainani"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(6, 182, 212, 0.5)" }}
                whileTap={{ scale: 0.95 }}
                className="bg-cyan-400 text-slate-900 px-8 py-4 rounded-lg font-semibold font-mono hover:bg-cyan-300 transition-all"
              >
                GITHUB.access()
              </motion.a>
              <motion.a
                href="https://linkedin.com/in/parramnainani"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(6, 182, 212, 0.5)" }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-cyan-400 text-cyan-400 px-8 py-4 rounded-lg font-semibold font-mono hover:bg-cyan-400/10 transition-all"
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