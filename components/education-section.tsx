'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { Float, PerspectiveCamera } from '@react-three/drei'
import { useRef, Suspense } from 'react'
import * as THREE from 'three'

function FloatingBook() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.005
      groupRef.current.position.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.2
    }
  })

  return (
    <group ref={groupRef}>
      <mesh>
        <boxGeometry args={[0.4, 0.6, 0.1]} />
        <meshStandardMaterial 
          color="#0891b2"
          emissive="#06b6d4"
          emissiveIntensity={0.4}
          metalness={0.6}
          roughness={0.4}
        />
      </mesh>
      <mesh position={[0, 0, 0.05]}>
        <boxGeometry args={[0.38, 0.58, 0.02]} />
        <meshStandardMaterial 
          color="#22d3ee"
          emissive="#22d3ee"
          emissiveIntensity={0.3}
        />
      </mesh>
    </group>
  )
}

export default function EducationSection() {
  const education = [
    {
      degree: 'Bachelor of Technology in Biotechnology',
      institution: 'Kashi Institute of Technology, Varanasi',
      year: 'Pursuing (5th Semester)',
      cgpa: '7.4',
      description: 'Currently focused on advanced biotechnology courses and research methodologies',
    },
    {
      degree: 'Class 12th',
      institution: 'MRM College, Darbhanga',
      year: '2021',
      percentage: '64%',
      description: 'Science stream with strong foundation in biology and chemistry',
    },
    {
      degree: 'Class 10th',
      institution: 'Woodbine Modern School, Darbhanga',
      year: '2019',
      percentage: '64%',
      description: 'Strong academic foundation across all subjects',
    },
  ]

  return (
    <section className="relative py-32 px-4 bg-gradient-to-b from-background via-secondary/10 to-background overflow-hidden">
      <div className="absolute inset-0 opacity-15">
        <div className="absolute top-20 left-10 w-80 h-80 bg-blue-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-cyan-500 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="relative max-w-4xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-300 bg-clip-text text-transparent">
              Education
            </span>
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full mx-auto" />
        </div>

        <div className="space-y-6">
          {education.map((item, index) => (
            <div
              key={index}
              className="group relative bg-gradient-to-r from-slate-800/40 to-slate-900/40 border-2 border-cyan-500/30 rounded-2xl overflow-hidden hover:border-cyan-400 hover:shadow-2xl hover:shadow-cyan-500/30 transition-all duration-500 hover:-translate-y-2 flex"
            >
              <div className="hidden md:block w-32 flex-shrink-0 p-4 border-r border-cyan-500/30 bg-gradient-to-r from-slate-900/50 to-transparent">
                <Canvas camera={{ position: [0, 0, 1.5], fov: 50 }}>
                  <ambientLight intensity={0.8} />
                  <directionalLight position={[5, 5, 5]} intensity={1} color="#06b6d4" />
                  <Suspense fallback={null}>
                    <Float speed={1.5} rotationIntensity={0.4}>
                      <FloatingBook />
                    </Float>
                  </Suspense>
                </Canvas>
              </div>
              
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 to-blue-500/0 group-hover:from-cyan-500/5 group-hover:to-blue-500/5 transition-all" />
              
              <div className="relative flex-1 p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-cyan-200 group-hover:text-cyan-100 transition-colors">{item.degree}</h3>
                  <span className="px-4 py-2 bg-cyan-500/20 text-cyan-300 rounded-full text-sm font-semibold border border-cyan-500/50 group-hover:bg-cyan-500/30 transition-colors">
                    {item.year}
                  </span>
                </div>

                <p className="text-base text-cyan-400 font-semibold mb-2">{item.institution}</p>
                <p className="text-foreground/70 mb-4">{item.description}</p>

                <div className="flex gap-6 text-sm">
                  {item.cgpa && (
                    <div className="flex items-center gap-2 px-3 py-2 bg-cyan-500/10 rounded-lg border border-cyan-500/30 group-hover:border-cyan-500/50">
                      <span className="text-muted-foreground">CGPA:</span>
                      <span className="font-bold text-cyan-300">{item.cgpa}</span>
                    </div>
                  )}
                  {item.percentage && (
                    <div className="flex items-center gap-2 px-3 py-2 bg-cyan-500/10 rounded-lg border border-cyan-500/30 group-hover:border-cyan-500/50">
                      <span className="text-muted-foreground">Percentage:</span>
                      <span className="font-bold text-cyan-300">{item.percentage}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
