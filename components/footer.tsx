"use client"

import { motion } from "framer-motion"
import { Github, Linkedin, Mail, Globe } from "lucide-react"
import type { TimeEra } from "@/app/page"

interface FooterProps {
  era: TimeEra
}

export function Footer({ era }: FooterProps) {
  const socialLinks = [
    { icon: Github, href: "https://github.com/ParramNainani", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com/in/parramnainani", label: "LinkedIn" },
    { icon: Mail, href: "mailto:parramnainani@gmail.com", label: "Email" },
    { icon: Globe, href: "https://paramnainani.dev", label: "Portfolio" },
  ]

  const getFooterStyles = () => {
    switch (era) {
      case "past":
        return {
          bg: "bg-amber-100 border-amber-300",
          text: "text-amber-900",
          accent: "text-amber-700",
          hover: "hover:text-amber-600",
        }
      case "future":
        return {
          bg: "bg-slate-900 border-cyan-400/30",
          text: "text-cyan-400",
          accent: "text-cyan-300",
          hover: "hover:text-cyan-200",
        }
      default:
        return {
          bg: "bg-white border-emerald-200",
          text: "text-emerald-900",
          accent: "text-emerald-600",
          hover: "hover:text-emerald-500",
        }
    }
  }

  const styles = getFooterStyles()

  return (
    <footer className={`border-t ${styles.bg} ${styles.text} py-12 mt-16`}>
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0"
        >
          {/* Connect Section */}
          <div className="text-center md:text-left">
            <h3
              className={`text-2xl font-bold mb-3 ${
                era === "past" ? "font-serif" : era === "future" ? "font-mono" : "font-sans"
              }`}
            >
              {era === "future" ? "> CONNECT.protocol" : "Let's Connect"}
            </h3>
            <p
              className={`${styles.accent} text-lg ${
                era === "past" ? "font-serif italic" : era === "future" ? "font-mono text-sm" : "text-base"
              }`}
            >
              {era === "past"
                ? "Ready to embark on a journey through code and consciousness?"
                : era === "future"
                  ? "Establishing quantum communication channels..."
                  : "Building the future, one line of code at a time"}
            </p>
            <p className={`${styles.accent} text-sm mt-2`}>
              <strong>Param Nainani</strong> • New Delhi, India
            </p>
          </div>

          {/* Social Links */}
          <div className="flex space-x-8">
            {socialLinks.map((link, index) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.2, y: -5 }}
                whileTap={{ scale: 0.9 }}
                className={`${styles.text} ${styles.hover} transition-all p-3 rounded-lg ${
                  era === "future" ? "hover:bg-cyan-400/10 border border-cyan-400/20" : "hover:bg-gray-100"
                }`}
                aria-label={link.label}
              >
                <link.icon className="w-7 h-7" />
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className={`text-center mt-8 pt-8 border-t ${
            era === "past" ? "border-amber-200" : era === "future" ? "border-cyan-400/20" : "border-emerald-200"
          }`}
        >
          <p
            className={`text-sm ${styles.accent} ${
              era === "past" ? "font-serif" : era === "future" ? "font-mono" : "font-sans"
            }`}
          >
            {era === "future"
              ? "© 2024 Param_Nainani | TEMPORAL_PORTFOLIO.v3.0 | AI_CONSCIOUSNESS.enabled"
              : "© 2024 Param Nainani | Bridging Ancient Wisdom with Modern Technology"}
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
