"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Code2, Database, Smartphone, Palette, Zap, Globe, Brain, Navigation, Trophy, Circle } from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"

export function PresentPage() {
  const [expandedProjects, setExpandedProjects] = useState<Record<string, boolean>>({})
  const [showAllProjects, setShowAllProjects] = useState(false)
  const isMobile = useIsMobile()
  const skills = [
    { name: "React, Next.js & TypeScript", level: 88, icon: Code2, color: "bg-blue-600" },
    { name: "Node.js, Express & PostgreSQL", level: 80, icon: Database, color: "bg-orange-500" },
    { name: "Python, PyTorch & scikit-learn", level: 85, icon: Brain, color: "bg-blue-500" },
    { name: "Flutter & Firebase", level: 80, icon: Smartphone, color: "bg-pink-500" },
    { name: "Tailwind, GSAP & WebGL", level: 85, icon: Palette, color: "bg-purple-500" },
    { name: "Shopify & Liquid", level: 80, icon: Globe, color: "bg-green-500" },
  ]

  const projects = [
    {
      title: "NaviiGo: Connected Travel Companion",
      description:
        "Travel-tech startup I founded and lead (team of 5-7). naviigo.in helps travellers discover places, plan routes and itineraries, and keep bookings in one journey workspace; I build its flight, rail and hotel search and booking handoffs.",
      tech: ["Next.js", "Vercel", "Booking integrations", "Product leadership"],
      status: "Live",
      highlight: true,
      link: "https://naviigo.in",
    },
    {
      title: "Finance Dashboard Backend",
      description:
        "REST API with JWT authentication and role-based access for Viewer, Analyst and Admin roles; filterable, paginated transaction CRUD with soft deletes; aggregate summaries of totals, daily trends and categories; Zod validation and Swagger docs.",
      tech: ["Node.js", "Express.js", "PostgreSQL", "Prisma", "JWT", "Docker"],
      status: "Completed",
      highlight: true,
      link: "https://github.com/ParramNainani/Project-Backend",
    },
    {
      title: "Kshetrajna Drift: Local AI Filing Agent",
      description:
        "Local open-weight AI agent (Llama 3.1 8B via Ollama) that sorts loose files by purpose, explains each choice and moves only approved files. SHA-256 re-checks, a SQLite intent journal with undo and crash recovery, expiring single-use approvals, 31 tests.",
      tech: ["Python", "Llama 3.1", "Ollama", "SQLite", "Human-in-the-loop"],
      status: "Completed",
      highlight: true,
      link: "https://github.com/ParramNainani/kshetrajna-drift",
    },
    {
      title: "ReVoice: Interruption-Safe Voice Agent",
      description:
        "Voice support agent built for the Rime hackathon. Every user task carries a generation ID, so an interruption invalidates in-flight tool calls and stale results are discarded before they are spoken; an acceptance test replays the scenario.",
      tech: ["TypeScript", "LiveKit Agents", "Deepgram", "OpenAI", "React"],
      status: "Completed",
      highlight: true,
      link: "https://github.com/ParramNainani/DataForge",
    },
    {
      title: "Customer-Support Triage RL Environment",
      description:
        "OpenEnv environment where an LLM agent triages support tickets (resolve, investigate or escalate) across easy, medium and hard tasks with graded rewards from 0 to 1. Dockerised for Hugging Face Spaces.",
      tech: ["Python", "OpenEnv", "Reinforcement learning", "Docker", "Gradio"],
      status: "Completed",
      highlight: false,
      link: "https://github.com/ParramNainani/OpenENV-ScalerSchool",
    },
    {
      title: "COE Nexus Websites",
      description:
        "7+ production event and media sites for COE Nexus, including coe-nexus.com, GCC Catalyst Summit, COE Awards Hyderabad and BFSI Bulletin, with WebGL and GSAP animation.",
      tech: ["React", "Firebase", "GSAP", "WebGL"],
      status: "Ongoing",
      highlight: false,
      link: "https://www.coe-nexus.com/",
    },
    {
      title: "SankatMochan-AI",
      description:
        "Cross-platform Flutter app with a Python engine that computes planetary positions (Swiss Ephemeris) and Vimshottari Dasha periods, with ML pattern detection and chart generation",
      tech: ["Flutter", "Python", "Firebase", "Swiss Ephemeris", "Matplotlib"],
      status: "Ongoing",
      highlight: false,
      link: "https://github.com/ParramNainani/Sankatmochan-ai",
    },
    {
      title: "Apna Camphor",
      description:
        "Developed and launched complete Shopify store for camphor brand with custom features and optimizations",
      tech: ["Shopify", "Liquid", "Payment Integration", "SEO", "Custom Features"],
      status: "Completed", // Changed from "Live"
      highlight: false,
    },
    {
      title: "ArtMosaic.co.uk",
      description:
        "Took over half-finished Shopify project, redesigned UI, optimized UX, and successfully launched (now closed)",
      tech: ["Shopify", "Liquid", "JavaScript", "CSS", "UX Design"],
      status: "Completed",
      highlight: false,
    },
    {
      title: "Vedic AI Research",
      description:
        "Experimental projects exploring Upagrahas, Ashtakavarga calculations, and memory pattern extraction through conversational AI",
      tech: ["Python", "AI", "Swiss Ephemeris", "Data Science", "Conversational AI"],
      status: "Research",
      highlight: true,
    },
    {
      title: "LSGA‑ViT+CNN Image Recognizers",
      description:
        "Faculty-supervised research (Nitika Nigam): a CNN stem for local textures feeding Vision Transformer blocks with Local Self-Gating Attention for small-feature sensitivity.",
      tech: ["ViT", "CNN", "LSGA", "PyTorch", "Deep Learning"],
      status: "Research",
      highlight: false,
    },
  ]

  const techStack = [
    "TypeScript",
    "JavaScript",
    "Python",
    "React",
    "Next.js",
    "Node.js",
    "Express.js",
    "PostgreSQL",
    "Prisma",
    "Firebase",
    "Flutter",
    "PyTorch",
    "scikit-learn",
    "Docker",
    "Tailwind CSS",
    "GSAP",
    "WebGL",
    "Shopify Liquid",
    "OpenCV",
  ]

  return (
    <div className="min-h-[100svh] safe-screen bg-gradient-to-b from-emerald-50 to-teal-100 relative overflow-hidden overflow-x-hidden px-3 sm:px-0">
      {/* Enhanced Modern Background */}
      <div className="absolute inset-0 opacity-10">
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `
            linear-gradient(rgba(16, 185, 129, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(16, 185, 129, 0.3) 1px, transparent 1px)
          `,
            backgroundSize: "60px 60px",
          }}
          animate={{
            backgroundPosition: ["0px 0px", "60px 60px"],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8 sm:mb-12 pt-8 sm:pt-12">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-emerald-900 mb-3 sm:mb-4">Current Arsenal</h1>
          <p className="text-lg sm:text-2xl text-emerald-700 leading-relaxed">
            <strong>Parram Nainani</strong> • Software Engineer (Full-Stack &amp; AI/ML) | Founder, NaviiGo
          </p>
          <p className="text-base sm:text-lg text-emerald-600 mt-2">📍 New Delhi, India</p>
          <div className="mt-4 sm:mt-6 flex flex-wrap justify-center gap-3">
            <div className="px-4 py-2 bg-emerald-100 text-emerald-800 rounded-full text-sm font-semibold flex items-center gap-2">
              <Circle className="w-3 h-3" /> B.Tech CSE (AI &amp; ML), UPES
            </div>
            <div className="px-4 py-2 bg-teal-100 text-teal-800 rounded-full text-sm font-semibold flex items-center gap-2">
              <Circle className="w-3 h-3" /> MeitY GENESIS EiR, Cohort 2
            </div>
            <div className="px-4 py-2 bg-amber-100 text-amber-900 rounded-full text-sm font-semibold flex items-center gap-2">
              <Trophy className="w-4 h-4" /> SIH 2025 Grand Finale
            </div>
            <div className="px-4 py-2 bg-cyan-100 text-cyan-900 rounded-full text-sm font-semibold flex items-center gap-2">
              <Navigation className="w-4 h-4" /> Founder, NaviiGo
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 mobile-only-stacked">
          {/* Skills Section */}
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            <h2 className="text-3xl sm:text-4xl font-bold text-emerald-900 mb-6 sm:mb-8">Technical Mastery</h2>
            <div className="space-y-6">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="bg-white/80 rounded-xl p-5 sm:p-6 shadow-lg border border-emerald-100 backdrop-blur-sm hover:shadow-xl transition-all"
                  whileHover={{ scale: 1.02, y: -2 }}
                >
                  <div className="flex items-center space-x-4 mb-4">
                    <div className={`p-3 ${skill.color} rounded-lg shadow-lg`}>
                      <skill.icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="font-bold text-emerald-900 text-lg">{skill.name}</span>
                  </div>
                  <div className="w-full bg-emerald-100 rounded-full h-3 overflow-hidden">
                    <motion.div
                      className={`h-3 rounded-full ${skill.color} shadow-sm`}
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ delay: 0.5 + index * 0.1, duration: 1.5, ease: "easeOut" }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Tech Stack */}
            <div className="mt-12">
              <h3 className="text-xl sm:text-2xl font-bold text-emerald-900 mb-4 sm:mb-6">Technology Stack</h3>
              <div className="flex flex-wrap gap-3">
                {techStack.map((tech, index) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1 + index * 0.05 }}
                    className="px-3 sm:px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-full text-xs sm:text-sm font-semibold shadow-lg hover:shadow-xl transition-all cursor-default inline-flex items-center gap-2"
                    whileHover={{ scale: 1.05, y: -2 }}
                  >
                    <Circle className="w-3 h-3" /> {tech}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Projects Section */}
          <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
            <h2 className="text-3xl sm:text-4xl font-bold text-emerald-900 mb-6 sm:mb-8">Featured Projects</h2>
            <div className="space-y-5 sm:space-y-6">
              {(showAllProjects ? projects : projects.slice(0, 3)).map((project, index) => {
                const Wrapper = project.link ? motion.a : motion.div;
                const isExpanded = !!expandedProjects[project.title]
                const canTruncate = project.description.length > 140
                const displayText = !isExpanded && canTruncate
                  ? `${project.description.slice(0, 140).trim()}...`
                  : project.description
                return (
                  <Wrapper
                    key={project.title}
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    whileHover={{ scale: 1.02, y: -5 }}
                    className={`block bg-white/90 rounded-xl p-4 sm:p-6 shadow-lg border-2 hover:shadow-xl transition-all backdrop-blur-sm ${
                      project.highlight
                        ? "border-emerald-300 bg-gradient-to-br from-white to-emerald-50"
                        : "border-emerald-100"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        {project.highlight && <Zap className="w-5 h-5 text-emerald-600" />}
                        <h3 className="text-xl font-bold text-emerald-900">{project.title}</h3>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold inline-flex items-center gap-2 ${
                          project.status === "Live"
                            ? "bg-green-100 text-green-800"
                            : project.status === "Ongoing"
                              ? "bg-yellow-100 text-yellow-800"
                              : project.status === "Completed"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-purple-100 text-purple-800"
                        }`}
                      >
                        <Circle className="w-3 h-3" /> {project.status}
                      </span>
                    </div>
                    <p className="text-emerald-700 mb-4 leading-relaxed">{displayText}</p>
                    {canTruncate && (
                      <button
                        onClick={(e) => {
                          e.preventDefault()
                          setExpandedProjects((prev) => ({ ...prev, [project.title]: !isExpanded }))
                        }}
                        className="text-sm font-semibold text-emerald-700 underline-offset-4 hover:underline"
                      >
                        {isExpanded ? "Show less" : "Show more"}
                      </button>
                    )}
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-lg text-sm font-medium inline-flex items-center gap-2"
                        >
                          <Circle className="w-3 h-3" /> {tech}
                        </span>
                      ))}
                    </div>
                  </Wrapper>
                )
              })}
              {projects.length > 3 && (
                <div className="pt-1">
                  <button
                    onClick={() => setShowAllProjects((v) => !v)}
                    className="text-sm font-semibold text-emerald-800 underline-offset-4 hover:underline"
                  >
                    {showAllProjects ? "Show less projects" : "Show more projects"}
                  </button>
                </div>
              )}
            </div>

            {/* Current Role */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="mt-10 sm:mt-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl p-5 sm:p-6 text-white shadow-xl"
            >
              <h3 className="text-2xl font-bold mb-3">Current Role</h3>
              <p className="text-emerald-100 text-lg leading-relaxed">
                <strong>Freelance Full-Stack Web Developer & AI Hobbyist</strong>
                <br />
                Building intelligent solutions that bridge e-commerce, AI, and human consciousness
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}