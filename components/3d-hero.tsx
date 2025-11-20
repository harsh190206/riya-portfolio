'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, Float, Sphere, Torus } from '@react-three/drei'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import Image from 'next/image'

function AnimatedRings() {
  const ring1Ref = useRef<THREE.Mesh>(null)
  const ring2Ref = useRef<THREE.Mesh>(null)
  const ring3Ref = useRef<THREE.Mesh>(null)

  useFrame(() => {
    if (ring1Ref.current) ring1Ref.current.rotation.z += 0.005
    if (ring2Ref.current) ring2Ref.current.rotation.z -= 0.008
    if (ring3Ref.current) ring3Ref.current.rotation.x += 0.003
  })

  return (
    <group>
      <mesh ref={ring1Ref} position={[0, 0, 0]}>
        <torusGeometry args={[3, 0.2, 16, 100]} />
        <meshStandardMaterial color="#0891b2" emissive="#0891b2" emissiveIntensity={0.6} wireframe={false} />
      </mesh>
      <mesh ref={ring2Ref} position={[0, 0, 0]} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[3.5, 0.15, 16, 100]} />
        <meshStandardMaterial color="#06b6d4" emissive="#06b6d4" emissiveIntensity={0.5} wireframe transparent opacity={0.8} />
      </mesh>
      <mesh ref={ring3Ref} position={[0, 0, 0]} rotation={[0, Math.PI / 4, 0]}>
        <torusGeometry args={[4, 0.1, 16, 100]} />
        <meshStandardMaterial color="#22d3ee" emissive="#22d3ee" emissiveIntensity={0.4} wireframe transparent opacity={0.6} />
      </mesh>
    </group>
  )
}

function FloatingParticles() {
  const particlesRef = useRef<THREE.Points>(null)
  const positionAttribute = useRef<THREE.BufferAttribute>(null)

  useEffect(() => {
    if (!particlesRef.current) return

    const geometry = particlesRef.current.geometry as THREE.BufferGeometry
    positionAttribute.current = geometry.getAttribute('position') as THREE.BufferAttribute
  }, [])

  useFrame(() => {
    if (!positionAttribute.current) return
    
    const positions = positionAttribute.current.array as Float32Array
    for (let i = 1; i < positions.length; i += 3) {
      positions[i] += 0.02
      if (positions[i] > 20) positions[i] = -20
    }
    positionAttribute.current.needsUpdate = true
  })

  const particleCount = 300
  const positions = new Float32Array(particleCount * 3)

  for (let i = 0; i < particleCount * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 50
    positions[i + 1] = (Math.random() - 0.5) * 50
    positions[i + 2] = (Math.random() - 0.5) * 50
  }

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={particleCount} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial color="#06b6d4" size={0.08} sizeAttenuation transparent opacity={0.8} />
    </points>
  )
}

function OrbitingObjects() {
  const group1Ref = useRef<THREE.Group>(null)
  const group2Ref = useRef<THREE.Group>(null)

  useFrame(() => {
    if (group1Ref.current) group1Ref.current.rotation.z += 0.003
    if (group2Ref.current) group2Ref.current.rotation.z -= 0.002
  })

  return (
    <>
      <group ref={group1Ref}>
        {[...Array(4)].map((_, i) => {
          const angle = (i / 4) * Math.PI * 2
          const x = Math.cos(angle) * 5
          const z = Math.sin(angle) * 5
          return (
            <mesh key={`orb1-${i}`} position={[x, 0, z]}>
              <sphereGeometry args={[0.15, 32, 32]} />
              <meshStandardMaterial 
                color="#0891b2" 
                emissive="#0891b2"
                emissiveIntensity={0.8}
              />
            </mesh>
          )
        })}
      </group>
      <group ref={group2Ref}>
        {[...Array(6)].map((_, i) => {
          const angle = (i / 6) * Math.PI * 2
          const x = Math.cos(angle) * 6.5
          const z = Math.sin(angle) * 6.5
          return (
            <mesh key={`orb2-${i}`} position={[x, 0, z]}>
              <sphereGeometry args={[0.1, 24, 24]} />
              <meshStandardMaterial 
                color="#06b6d4" 
                emissive="#06b6d4"
                emissiveIntensity={0.6}
              />
            </mesh>
          )
        })}
      </group>
    </>
  )
}

export default function Hero3D() {
  return (
    <div className="w-full h-screen relative bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
      {/* 3D Canvas Background */}
      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
          <Environment preset="night" />
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={1} />
          
          <AnimatedRings />
          <FloatingParticles />
          <OrbitingObjects />

          <directionalLight position={[10, 10, 10]} intensity={2} color="#06b6d4" />
          <directionalLight position={[-10, -10, -10]} intensity={1} color="#0891b2" />
          <ambientLight intensity={0.4} />
        </Canvas>
      </div>

      {/* Content Overlay */}
      <div className="relative z-20 h-full flex flex-col items-center justify-center px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12 max-w-5xl w-full">
          {/* Profile Image Section */}
          <div className="flex-shrink-0 w-full lg:w-auto flex justify-center">
            <div className="relative group">
              {/* Animated glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-3xl blur-2xl opacity-75 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
              
              <div className="relative rounded-3xl overflow-hidden border-4 border-cyan-400/50 backdrop-blur-sm bg-slate-900/50 p-1 shadow-2xl transform group-hover:scale-105 transition-transform duration-300 w-80 h-auto">
                <Image
                  src="/images/design-mode/riya1.jpg"
                  alt="Riya Kumari"
                  width={320}
                  height={420}
                  className="rounded-2xl object-cover bg-slate-900 w-full"
                  priority
                  sizes="100vw"
                  unoptimized
                />
                
                {/* Shine effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>
          </div>

          {/* Text Content Section */}
          <div className="text-center lg:text-left space-y-4 animate-fade-in-up flex-1">
            <h1 className="text-5xl md:text-6xl font-bold text-white">
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-300 bg-clip-text text-transparent">
                Riya Kumari
              </span>
            </h1>
            <p className="text-xl md:text-2xl font-light text-cyan-300">
              Biotechnology Student & Researcher
            </p>
            <p className="text-base md:text-lg text-slate-300 leading-relaxed">
              Exploring the frontiers of genomic research with passion for innovation and scientific discovery
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start pt-4">
            <a
               href="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/riya-0MjoHgqcv0Uz0gkEhTUu0tUia3M5Vv.pdf"
               target="_blank"
               rel="noopener noreferrer"
               >
              <button className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 font-semibold transform hover:scale-110">
                View Resume
              </button>
              </a>
              <a
                  href="mailto:riya.kri.2706@gmail.com"
                  className="text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-2"
                >
              <button className="px-8 py-3 border-2 border-cyan-400 text-cyan-300 rounded-lg hover:bg-cyan-400/10 transition-colors duration-300 font-semibold transform hover:scale-110">
                Get in Touch
              </button>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce">
        <div className="text-3xl text-cyan-400">↓</div>
      </div>
    </div>
  )
}
