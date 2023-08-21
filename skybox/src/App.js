import { Canvas, useFrame } from '@react-three/fiber'
import { Float, ContactShadows, OrbitControls, Torus, Tube, Circle } from '@react-three/drei'
import * as THREE from 'three'
import { useEffect, useState, useRef, useMemo, useCallback } from 'react'
import { Curves, angle } from 'three-addons'
import _ from 'lodash'
import { Skybox } from './Skybox'

//
export default function App() {
  useEffect(() => {}, [])

  return (
    <Canvas shadows camera={{ position: [0, -4, 20], fov: 90 }}>
      <ambientLight intensity={0.7} />
      <hemisphereLight intensity={4} color="red" groundColor="blue" />
      <OrbitControls autoRotate autoRotateSpeed={0.15} />

      <Skybox skybox_texture={'/bg.jpg'} depth_texture={'/depth_bg.jpg'} />
    </Canvas>
  )
}
