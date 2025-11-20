'use client'

import { useState } from 'react'
import { Menu, X } from 'lucide-react'

interface NavProps {
  activeSection: string
  scrollToSection: (id: string) => void
}

export default function ProfessionalNav({ activeSection, scrollToSection }: NavProps) {
  const [isOpen, setIsOpen] = useState(false)

  const sections = [
    { id: 'home', label: 'HOME' },
    { id: 'about', label: 'ABOUT' },
    { id: 'skills', label: 'SKILLS' },
    { id: 'education', label: 'EDUCATION' },
    { id: 'achievements', label: 'ACHIEVEMENTS' },
    { id: 'experience', label: 'EXPERIENCE' },
    { id: 'contact', label: 'CONTACT' },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 bg-slate-950 bg-opacity-95 backdrop-blur-md z-50 border-b border-cyan-500 border-opacity-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              RK
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`px-4 py-2 text-sm font-semibold transition-all duration-300 relative group ${
                  activeSection === section.id
                    ? 'text-cyan-400'
                    : 'text-gray-300 hover:text-cyan-400'
                }`}
              >
                {section.label}
                <span className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-300 ${
                  activeSection === section.id ? 'w-full' : 'w-0 group-hover:w-full'
                }`} />
              </button>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 border-t border-cyan-500 border-opacity-20">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => {
                  scrollToSection(section.id)
                  setIsOpen(false)
                }}
                className={`block w-full text-left px-4 py-2 text-sm font-semibold transition-colors ${
                  activeSection === section.id
                    ? 'text-cyan-400 bg-cyan-500 bg-opacity-10'
                    : 'text-gray-300 hover:text-cyan-400'
                }`}
              >
                {section.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}
