'use client'

import { useRef, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { PerspectiveCamera, OrbitControls, Environment, Text, Float } from '@react-three/drei'
import * as THREE from 'three'

interface HeroSectionProps {
  scrollToSection: (sectionId: string) => void
}

function FloatingDNA() {
  const meshRef = useRef<THREE.Group>(null)
  const particlesRef = useRef<THREE.Points>(null)

  useEffect(() => {
    if (particlesRef.current) {
      const geometry = particlesRef.current.geometry as THREE.BufferGeometry
      const positions = geometry.attributes.position as THREE.BufferAttribute

      for (let i = 0; i < positions.count; i++) {
        const x = (Math.random() - 0.5) * 8
        const y = (Math.random() - 0.5) * 8
        const z = (Math.random() - 0.5) * 8
        positions.setXYZ(i, x, y, z)
      }
      positions.needsUpdate = true
    }
  }, [])

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.0005
      meshRef.current.rotation.y += 0.0008
    }

    if (particlesRef.current) {
      particlesRef.current.rotation.x += 0.0002
      particlesRef.current.rotation.y += 0.0003
    }
  })

  const geometry = new THREE.BufferGeometry()
  const positions = new Float32Array(500 * 3)
  for (let i = 0; i < 500 * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 8
  }
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

  return (
    <group ref={meshRef}>
      <points ref={particlesRef} geometry={geometry}>
        <pointsMaterial size={0.08} color="#06b6d4" sizeAttenuation={true} />
      </points>

      <mesh position={[0, 0, 0]}>
        <torusGeometry args={[1.5, 0.3, 32, 200]} />
        <meshPhongMaterial color="#0891b2" wireframe={false} />
      </mesh>

      <mesh position={[0, 0, 0]} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[1.5, 0.3, 32, 200]} />
        <meshPhongMaterial color="#06b6d4" wireframe={true} transparent opacity={0.5} />
      </mesh>

      <mesh position={[0, 0, 0]} rotation={[0, Math.PI / 3, 0]}>
        <torusGeometry args={[1.5, 0.3, 32, 200]} />
        <meshPhongMaterial color="#06b6d4" wireframe={true} transparent opacity={0.5} />
      </mesh>
    </group>
  )
}

export default function HeroSection({ scrollToSection }: HeroSectionProps) {
  return (
    <div className="relative w-full h-screen pt-16 bg-gradient-to-b from-background to-primary/5 overflow-hidden">
      {/* 3D Canvas */}
      <div className="absolute inset-0">
        <Canvas>
          <PerspectiveCamera position={[0, 0, 5]} makeDefault />
          <Environment preset="city" />
          <ambientLight intensity={0.8} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <FloatingDNA />
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={2} />
        </Canvas>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4">
        <div className="text-center space-y-6 max-w-2xl">
          <div className="space-y-2">
            <h1 className="text-5xl md:text-7xl font-bold text-balance">
              <span className="bg-gradient-to-r from-chart-1 via-chart-2 to-primary bg-clip-text text-transparent">
                Riya Kumari
              </span>
            </h1>
            <p className="text-xl md:text-2xl font-light text-muted-foreground">
              Biotechnology Enthusiast | Researcher | Innovator
            </p>
          </div>

          <p className="text-base md:text-lg text-foreground/80 leading-relaxed font-light">
            A dedicated student exploring the frontiers of genomic research and biotechnology. 
            Passionate about advancing scientific knowledge through hands-on experimentation and continuous learning.
          </p>

          <div className="flex flex-wrap gap-4 justify-center pt-6">
            <button
              onClick={() => scrollToSection('about')}
              className="px-8 py-3 bg-chart-1 text-white rounded-lg hover:opacity-90 transition-opacity font-medium"
            >
              Explore More
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="px-8 py-3 border border-primary text-primary rounded-lg hover:bg-primary/10 transition-colors font-medium"
            >
              Get in Touch
            </button>
          </div>

          <div className="flex gap-6 justify-center pt-4 text-muted-foreground">
            <a href="tel:+916201020751" className="hover:text-foreground transition-colors">
              📱 +91 6201020751
            </a>
            <a href="mailto:riya.kri.2706@gmail.com" className="hover:text-foreground transition-colors">
              📧 Email
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce">
        <div className="text-2xl text-chart-1">↓</div>
      </div>
    </div>
  )
}
