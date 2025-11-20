'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { PerspectiveCamera, OrbitControls, Environment, Float, Sphere } from '@react-three/drei'
import { Suspense, useRef } from 'react'
import * as THREE from 'three'
import Image from 'next/image'

function RotatingMolecule() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.x += 0.003
      groupRef.current.rotation.y += 0.005
    }
  })

  return (
    <group ref={groupRef}>
      <mesh>
        <sphereGeometry args={[0.6, 32, 32]} />
        <meshStandardMaterial 
          color="#06b6d4" 
          emissive="#06b6d4"
          emissiveIntensity={0.5}
          metalness={0.8}
          roughness={0.1}
        />
      </mesh>

      {[0, 1, 2].map((i) => (
        <group key={i} rotation={[Math.PI / 3 * i, 0, Math.PI / 4 * i]}>
          <mesh>
            <torusGeometry args={[1.8 + i * 0.5, 0.12, 20, 100]} />
            <meshStandardMaterial 
              color={i === 0 ? '#22d3ee' : i === 1 ? '#06b6d4' : '#0891b2'}
              emissive={i === 0 ? '#22d3ee' : i === 1 ? '#06b6d4' : '#0891b2'}
              emissiveIntensity={0.4}
            />
          </mesh>
        </group>
      ))}

      {[...Array(16)].map((_, i) => {
        const angle = (i / 16) * Math.PI * 2
        const distance = 2.5
        return (
          <mesh key={i} position={[Math.cos(angle) * distance, Math.sin(angle) * distance * 0.6, Math.cos(angle) * distance * 0.3]}>
            <sphereGeometry args={[0.12, 20, 20]} />
            <meshStandardMaterial 
              color="#22d3ee"
              emissive="#22d3ee"
              emissiveIntensity={0.6}
            />
          </mesh>
        )
      })}
    </group>
  )
}

export default function AboutSection() {
  return (
    <section className="relative py-32 px-4 bg-gradient-to-b from-background via-secondary/10 to-background overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="h-96 rounded-2xl overflow-hidden border-2 border-cyan-500/50 shadow-2xl shadow-cyan-500/20 transform hover:scale-105 transition-transform duration-300">
            <Canvas>
              <PerspectiveCamera position={[5, 3, 5]} makeDefault fov={50} />
              <Environment preset="warehouse" />
              <ambientLight intensity={0.8} />
              <directionalLight position={[10, 10, 10]} intensity={1.5} color="#06b6d4" />
              <directionalLight position={[-10, -5, -5]} intensity={0.6} color="#0891b2" />
              <Suspense fallback={null}>
                <Float speed={2} rotationIntensity={0.6} floatingRange={[-0.15, 0.15]}>
                  <RotatingMolecule />
                </Float>
              </Suspense>
              <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={3} />
            </Canvas>
          </div>

          {/* Content with animations */}
          <div className="space-y-6 animate-fade-in-up">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-300 bg-clip-text text-transparent">
                  About Me
                </span>
              </h2>
              <div className="h-1 w-16 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full" />
            </div>

            <p className="text-lg text-foreground/85 leading-relaxed">
              A dedicated and motivated biotechnology student with a strong focus on maintaining a creative mindset while striving 
              to achieve my goals and enhance my skills and knowledge in genomic research.
            </p>

            <p className="text-lg text-foreground/85 leading-relaxed">
              Currently pursuing my Bachelor of Technology in Biotechnology at Kashi Institute of Technology, 
              passionate about molecular biology, genomic sequencing, and innovative laboratory techniques.
            </p>

            <div className="grid grid-cols-3 gap-4 pt-6">
              <div className="p-4 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/50 rounded-xl text-center hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 transform hover:scale-110">
                <div className="text-3xl font-bold text-cyan-300">5th</div>
                <div className="text-sm text-cyan-200/70 mt-2">Semester</div>
              </div>
              <div className="p-4 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/50 rounded-xl text-center hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 transform hover:scale-110">
                <div className="text-3xl font-bold text-blue-300">7.4</div>
                <div className="text-sm text-blue-200/70 mt-2">CGPA</div>
              </div>
              <div className="p-4 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/50 rounded-xl text-center hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 transform hover:scale-110">
                <div className="text-3xl font-bold text-cyan-300">3</div>
                <div className="text-sm text-cyan-200/70 mt-2">Awards</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
