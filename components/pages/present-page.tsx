"use client"

import { motion } from "framer-motion"
import { Code2, Database, Smartphone, Palette, Zap, Globe, Brain, Link } from "lucide-react"

export function PresentPage() {
  const skills = [
    { name: "Python & AI", level: 95, icon: Brain, color: "bg-blue-500" },
    { name: "Shopify Development", level: 90, icon: Globe, color: "bg-green-500" },
    { name: "React & Next.js", level: 85, icon: Code2, color: "bg-blue-600" },
    { name: "Tailwind CSS", level: 88, icon: Palette, color: "bg-purple-500" },
    { name: "Firebase & APIs", level: 80, icon: Database, color: "bg-orange-500" },
    { name: "UI/UX Design", level: 82, icon: Smartphone, color: "bg-pink-500" },
  ]

  const projects = [
    {
      title: "SankatMochan-AI",
      description:
        "Real-time AI-powered life prediction engine combining Vedic astrology, personalized memory logs, and machine learning with Dasha analysis",
      tech: ["Python", "AI/ML", "Swiss Ephemeris", "Matplotlib", "Vedic Astrology", "Panchang"],
      status: "Ongoing",
      highlight: true,
      link: "https://github.com/ParramNainani/SankatMochan-AI",
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
  ]

  const techStack = [
    "Python",
    "JavaScript",
    "React",
    "Next.js",
    "Tailwind CSS",
    "Firebase",
    "Shopify Liquid",
    "HTML/CSS",
    "Astro",
    "Flutter",
    "OpenCV",
    "Matplotlib",
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-teal-100 py-12 relative overflow-hidden">
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

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <h1 className="text-6xl font-bold text-emerald-900 mb-6">Current Arsenal</h1>
          <p className="text-2xl text-emerald-700 leading-relaxed">
            <strong>Param Nainani</strong> • Shopify Web Developer | Python & AI Engineer | UI Designer
          </p>
          <p className="text-lg text-emerald-600 mt-2">📍 New Delhi, India</p>
          <div className="mt-6 flex justify-center space-x-3">
            <div className="px-4 py-2 bg-emerald-100 text-emerald-800 rounded-full text-sm font-semibold">
              B.Tech Computer Science
            </div>
            <div className="px-4 py-2 bg-teal-100 text-teal-800 rounded-full text-sm font-semibold">
              Certified Shopify Developer
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Skills Section */}
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            <h2 className="text-4xl font-bold text-emerald-900 mb-8">Technical Mastery</h2>
            <div className="space-y-6">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="bg-white/80 rounded-xl p-6 shadow-lg border border-emerald-100 backdrop-blur-sm hover:shadow-xl transition-all"
                  whileHover={{ scale: 1.02, y: -2 }}
                >
                  <div className="flex items-center space-x-4 mb-4">
                    <div className={`p-3 ${skill.color} rounded-lg shadow-lg`}>
                      <skill.icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="font-bold text-emerald-900 text-lg">{skill.name}</span>
                    <span className="ml-auto text-emerald-700 font-semibold">{skill.level}%</span>
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
              <h3 className="text-2xl font-bold text-emerald-900 mb-6">Technology Stack</h3>
              <div className="flex flex-wrap gap-3">
                {techStack.map((tech, index) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1 + index * 0.05 }}
                    className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-full text-sm font-semibold shadow-lg hover:shadow-xl transition-all cursor-default"
                    whileHover={{ scale: 1.05, y: -2 }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Projects Section */}
          <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
            <h2 className="text-4xl font-bold text-emerald-900 mb-8">Featured Projects</h2>
            <div className="space-y-6">
              {projects.map((project, index) => {
                const Wrapper = project.link ? motion.a : motion.div;
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
                    className={`block bg-white/90 rounded-xl p-6 shadow-lg border-2 hover:shadow-xl transition-all backdrop-blur-sm ${
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
                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                          project.status === "Live"
                            ? "bg-green-100 text-green-800"
                            : project.status === "Ongoing"
                              ? "bg-yellow-100 text-yellow-800"
                              : project.status === "Completed"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-purple-100 text-purple-800"
                        }`}
                      >
                        {project.status}
                      </span>
                    </div>
                    <p className="text-emerald-700 mb-4 leading-relaxed">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-lg text-sm font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </Wrapper>
                )
              })}
            </div>

            {/* Current Role */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="mt-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl p-6 text-white shadow-xl"
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