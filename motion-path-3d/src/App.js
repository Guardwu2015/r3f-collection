import { Canvas, useFrame } from '@react-three/fiber'
import { Float, ContactShadows, OrbitControls, Torus, Tube, Circle } from '@react-three/drei'
import * as THREE from 'three'

import { useEffect, useState, useRef, useMemo, useCallback } from 'react'
import { Curves, angle } from 'three-addons'
import _ from 'lodash'
import { GridLines } from './GridLines'
import { Path } from './Path'

//
export default function App() {
  return (
    <Canvas shadows camera={{ position: [0, -4, 20], fov: 90 }}>
      <ambientLight intensity={0.8} color={'white'} />
      <color attach="background" args={['#131313']} />
      <pointLight color={'white'} intensity={100} position={[1, 5, 0]} />
      {/* <hemisphereLight intensity={4} color="red" groundColor="blue" /> */}
      <spotLight intensity={0.8} angle={0.1} penumbra={0.5} position={[0, 10, 5]} castShadow color={'white'} />
      <group position={[0, -4.5, 0]}>
        <GridLines />
      </group>
      <Path />
      <OrbitControls
      //maxPolarAngle={-Math.PI}
      //minPolarAngle={-Math.PI / 2}
      //enableRotate={false}
      />
    </Canvas>
  )
}
