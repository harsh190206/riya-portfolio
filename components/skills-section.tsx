'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { Float, PerspectiveCamera, OrbitControls, Environment } from '@react-three/drei'
import { useRef } from 'react'
import * as THREE from 'three'
import { Suspense } from 'react'

function AnimatedSkillCube({ color }: any) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.003
      meshRef.current.rotation.y += 0.005
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.2
    }
  })

  return (
    <group>
      <mesh ref={meshRef}>
        <boxGeometry args={[0.8, 0.8, 0.8]} />
        <meshStandardMaterial 
          color={color}
          emissive={color}
          emissiveIntensity={0.3}
          metalness={0.7}
          roughness={0.3}
        />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.85, 0.85, 0.85]} />
        <meshStandardMaterial 
          color={color} 
          transparent 
          opacity={0.15}
          wireframe
        />
      </mesh>
    </group>
  )
}

function SkillVisualizer({ color }: any) {
  return (
    <Canvas>
      <PerspectiveCamera position={[3, 2, 3]} makeDefault fov={50} />
      <Environment preset="studio" />
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} color={color} />
      <directionalLight position={[-5, -5, -5]} intensity={0.5} color="#0891b2" />
      <Suspense fallback={null}>
        <Float speed={2} rotationIntensity={0.5} floatingRange={[-0.1, 0.1]}>
          <AnimatedSkillCube color={color} />
        </Float>
      </Suspense>
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2} />
    </Canvas>
  )
}

export default function SkillsSection() {
  const skills = [
    { name: 'Genomic and plasmid isolation from plant cell an bacteria', icon: '🧬', color: '#06b6d4' },
    { name: 'RNA isolation from plant cell', icon: '🦠', color: '#0891b2' },
    { name: 'Isolation of bacteria from soil culture', icon: '🔬', color: '#22d3ee' },
    { name: 'PCR', icon: '📊', color: '#06b6d4' },
  ]

  return (
    <section className="relative py-32 px-4 bg-gradient-to-b from-background via-secondary/10 to-background overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-40 right-20 w-96 h-96 bg-cyan-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-40 left-20 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1.5s'}}></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-300 bg-clip-text text-transparent">
              Core Skills
            </span>
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full mx-auto" />
          <p className="text-foreground/70 mt-4 text-lg">Advanced biotechnology expertise and laboratory techniques</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="group relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-2 border-cyan-500/30 rounded-2xl overflow-hidden hover:border-cyan-400 hover:shadow-2xl hover:shadow-cyan-500/30 transition-all duration-500 hover:-translate-y-3 transform"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-blue-500/0 group-hover:from-cyan-500/10 group-hover:to-blue-500/10 transition-all duration-500" />
              
              <div className="relative z-10 p-6 h-full flex flex-col">
                <div className="text-5xl mb-4 group-hover:scale-125 transition-transform duration-300 origin-left">{skill.icon}</div>
                <h3 className="text-lg font-bold text-cyan-200 mb-4 group-hover:text-cyan-100 transition-colors">{skill.name}</h3>
                
                <div className="flex-1 rounded-lg overflow-hidden border border-cyan-500/30 opacity-0 group-hover:opacity-100 transition-all duration-300 mt-4">
                  <SkillVisualizer color={skill.color} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
