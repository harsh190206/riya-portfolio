'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { Float, PerspectiveCamera, Environment } from '@react-three/drei'
import { useState, useRef, Suspense } from 'react'
import { Mail, Phone, MapPin, ArrowRight, Send } from 'lucide-react'
import * as THREE from 'three'

function RotatingOrb() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.003
      meshRef.current.rotation.y += 0.005
      meshRef.current.scale.x = 1 + Math.sin(state.clock.elapsedTime) * 0.1
      meshRef.current.scale.y = 1 + Math.sin(state.clock.elapsedTime) * 0.1
      meshRef.current.scale.z = 1 + Math.sin(state.clock.elapsedTime) * 0.1
    }
  })

  return (
    <group>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1, 4]} />
        <meshStandardMaterial 
          color="#06b6d4" 
          emissive="#06b6d4"
          emissiveIntensity={0.5}
          metalness={0.8}
          roughness={0.2}
          wireframe
        />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[0.95, 4]} />
        <meshStandardMaterial 
          color="#22d3ee"
          emissive="#22d3ee"
          emissiveIntensity={0.3}
          metalness={0.6}
          roughness={0.4}
        />
      </mesh>
    </group>
  )
}

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const mailtoLink = `mailto:riya.kri.2706@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`
    )}`
    window.location.href = mailtoLink
  }

  return (
    <section className="relative py-32 px-4 bg-gradient-to-b from-background via-secondary/10 to-background overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-cyan-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1.5s'}}></div>
      </div>

      <div className="relative max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-300 bg-clip-text text-transparent">
              Get in Touch
            </span>
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full mx-auto mb-4" />
          <p className="text-lg text-foreground/75 max-w-2xl mx-auto">
            Let's collaborate on exciting biotechnology projects and research opportunities. I'm always open to discussing new ideas.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-6">
            <div className="h-64 rounded-2xl overflow-hidden border-2 border-cyan-500/30 mb-8">
              <Canvas>
                <PerspectiveCamera position={[2, 2, 2]} makeDefault fov={50} />
                <Environment preset="studio" />
                <ambientLight intensity={0.8} />
                <directionalLight position={[5, 5, 5]} intensity={1.5} color="#06b6d4" />
                <Suspense fallback={null}>
                  <Float speed={1.5} rotationIntensity={0.6}>
                    <RotatingOrb />
                  </Float>
                </Suspense>
              </Canvas>
            </div>

            <div className="group flex items-start gap-4 p-4 rounded-xl bg-cyan-500/5 hover:bg-cyan-500/15 border border-cyan-500/30 hover:border-cyan-400 transition-all duration-300">
              <div className="w-12 h-12 rounded-lg bg-cyan-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-cyan-500/40 transition-colors">
                <Mail className="w-6 h-6 text-cyan-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-cyan-200 mb-1">Email</h3>
                <a
                  href="mailto:riya.kri.2706@gmail.com"
                  className="text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-2"
                >
                  riya.kri.2706@gmail.com
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div className="group flex items-start gap-4 p-4 rounded-xl bg-cyan-500/5 hover:bg-cyan-500/15 border border-cyan-500/30 hover:border-cyan-400 transition-all duration-300">
              <div className="w-12 h-12 rounded-lg bg-cyan-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-cyan-500/40 transition-colors">
                <Phone className="w-6 h-6 text-cyan-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-cyan-200 mb-1">Phone</h3>
                <a href="tel:+916201020751" className="text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-2">
                  +91 6201020751
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div className="group flex items-start gap-4 p-4 rounded-xl bg-cyan-500/5 hover:bg-cyan-500/15 border border-cyan-500/30 hover:border-cyan-400 transition-all duration-300">
              <div className="w-12 h-12 rounded-lg bg-cyan-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-cyan-500/40 transition-colors">
                <MapPin className="w-6 h-6 text-cyan-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-cyan-200 mb-1">Location</h3>
                <p className="text-foreground/70">Post – Putai, Dist – Darbhanga, Bihar – 847423</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-4 bg-gradient-to-br from-slate-800/40 to-slate-900/40 border-2 border-cyan-500/30 p-8 rounded-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-bold text-cyan-300 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-slate-900/50 border-2 border-cyan-500/30 rounded-lg text-white placeholder-foreground/40 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-bold text-cyan-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-slate-900/50 border-2 border-cyan-500/30 rounded-lg text-white placeholder-foreground/40 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                  placeholder="Your email"
                />
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-bold text-cyan-300 mb-2">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-slate-900/50 border-2 border-cyan-500/30 rounded-lg text-white placeholder-foreground/40 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                placeholder="Subject"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-bold text-cyan-300 mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-3 bg-slate-900/50 border-2 border-cyan-500/30 rounded-lg text-white placeholder-foreground/40 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all resize-none"
                placeholder="Your message"
              />
            </div>

            <button
              type="submit"
              className="w-full px-6 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 hover:scale-105 transition-all duration-300 font-bold flex items-center justify-center gap-2 group"
            >
              Send Message
              <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="mt-16 pt-12 border-t border-cyan-500/30 text-center">
          <p className="text-cyan-200 mb-2 font-semibold">© 2025 Riya Kumari. All rights reserved.</p>
          <p className="text-sm text-foreground/60">
            Crafted with passion for biotechnology | Researcher & Student
          </p>
        </div>
      </div>
    </section>
  )
}
