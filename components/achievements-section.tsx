'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { Float, PerspectiveCamera, Environment } from '@react-three/drei'
import { useRef, Suspense } from 'react'
import * as THREE from 'three'

function Medal3D({ color }: any) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.5) * 0.3
      groupRef.current.rotation.z += 0.01
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.2
    }
  })

  return (
    <group ref={groupRef}>
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 0.15, 32]} />
        <meshStandardMaterial 
          color={color}
          emissive={color}
          emissiveIntensity={0.4}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
      <mesh position={[0, 0.8, 0]}>
        <boxGeometry args={[0.2, 0.8, 0.05]} />
        <meshStandardMaterial 
          color="#FFD700"
          emissive="#FFD700"
          emissiveIntensity={0.3}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.55, 0.55, 0.2, 32]} />
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

export default function AchievementsSection() {
  const achievements = [
    {
      title: '2nd Position in Badminton',
      event: 'AAHVAAN 25 (Inter College Tournament)',
      year: '2025',
      color: '#C0C0C0',
    },
    {
      title: '3rd Position in Poster Presentation',
      event: 'Manthan 2024 (Inter Department)',
      year: '2024',
      color: '#CD7F32',
    },
  ]

  return (
    <section className="relative py-32 px-4 bg-gradient-to-b from-background via-secondary/10 to-background overflow-hidden">
      <div className="absolute inset-0 opacity-15">
        <div className="absolute top-40 right-20 w-80 h-80 bg-amber-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-40 left-20 w-80 h-80 bg-cyan-500 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1.5s'}}></div>
      </div>

      <div className="relative max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan-400 via-amber-400 to-cyan-300 bg-clip-text text-transparent">
              Achievements
            </span>
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-cyan-400 to-amber-400 rounded-full mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className="group relative bg-gradient-to-br from-slate-800/40 to-slate-900/40 border-2 border-cyan-500/30 rounded-2xl overflow-hidden hover:border-cyan-400 hover:shadow-2xl hover:shadow-cyan-500/40 transition-all duration-500 hover:-translate-y-3"
            >
              <div className="grid grid-cols-3 gap-0 min-h-80">
                <div className="col-span-1 flex items-center justify-center p-4 border-r border-cyan-500/30 bg-gradient-to-br from-slate-900/60 via-slate-900/30 to-transparent">
                  <Canvas>
                    <PerspectiveCamera position={[2, 2, 2]} makeDefault fov={50} />
                    <Environment preset="warehouse" />
                    <ambientLight intensity={0.9} />
                    <directionalLight position={[5, 5, 5]} intensity={1.5} color="#ffffff" />
                    <directionalLight position={[-5, -5, -5]} intensity={0.7} color="#06b6d4" />
                    <Suspense fallback={null}>
                      <Float speed={2} rotationIntensity={0.5}>
                        <Medal3D color={achievement.color} />
                      </Float>
                    </Suspense>
                  </Canvas>
                </div>

                {/* Content */}
                <div className="col-span-2 p-6 flex flex-col justify-center bg-gradient-to-r from-transparent via-transparent to-cyan-500/5">
                  <span className="text-sm font-bold text-cyan-400 mb-3 px-3 py-1 bg-cyan-500/20 w-fit rounded-full border border-cyan-500/50">{achievement.year}</span>
                  <h3 className="text-2xl font-bold text-cyan-200 mb-3 group-hover:text-cyan-100 transition-colors">{achievement.title}</h3>
                  <p className="text-foreground/75 mb-4 leading-relaxed">{achievement.event}</p>
                  
                  <div className="inline-flex items-center gap-2 text-lg">
                    <span className="text-3xl animate-bounce">🏆</span>
                    <span className="text-sm font-bold text-cyan-400">Award Recipient</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
