'use client'

import { useState, useEffect } from 'react'
import Hero3D from '@/components/3d-hero'
import ProfessionalNav from '@/components/professional-nav'
import AboutSection from '@/components/about-section'
import SkillsSection from '@/components/skills-section'
import EducationSection from '@/components/education-section'
import AchievementsSection from '@/components/achievements-section'
import ExperienceSection from '@/components/experience-section'
import ContactSection from '@/components/contact-section'

export default function Home() {
  const [activeSection, setActiveSection] = useState('home')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted || typeof window === 'undefined') return

    // Use requestAnimationFrame for better scroll handling
    let rafId: number

    const handleScroll = () => {
      rafId = requestAnimationFrame(() => {
        const sections = ['home', 'about', 'skills', 'education', 'achievements', 'experience', 'contact']
        
        for (const section of sections) {
          const element = document.getElementById(section)
          if (!element) continue
          
          const rect = element.getBoundingClientRect()
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            setActiveSection(section)
            break
          }
        }
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [mounted])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setActiveSection(sectionId)
    }
  }

  if (!mounted) {
    return <div className="bg-background min-h-screen" />
  }

  return (
    <main className="bg-background text-foreground overflow-x-hidden">
      <ProfessionalNav activeSection={activeSection} scrollToSection={scrollToSection} />
      
      <section id="home" className="w-full">
        <Hero3D />
      </section>

      <section id="about" className="w-full pt-20">
        <AboutSection />
      </section>

      <section id="skills" className="w-full">
        <SkillsSection />
      </section>

      <section id="education" className="w-full">
        <EducationSection />
      </section>

      <section id="achievements" className="w-full">
        <AchievementsSection />
      </section>

      <section id="experience" className="w-full">
        <ExperienceSection />
      </section>

      <section id="contact" className="w-full">
        <ContactSection />
      </section>
    </main>
  )
}
