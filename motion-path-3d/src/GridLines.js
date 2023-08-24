import { Canvas, useFrame, useThree, extend } from '@react-three/fiber'
import { shaderMaterial, Grid, EffectComposer, Bloom } from '@react-three/drei'
import * as THREE from 'three'

import { useEffect, useRef, useState } from 'react'

export function GridLines(props) {
  const { highlistPosRef } = props
  const ref = useRef()
  var options = {
    gridSize: [30, 30],
    cellSize: 1.0,
    cellThickness: 1.0,
    cellColor: '#707070',
    sectionSize: 5.0,
    sectionThickness: 1.5,
    sectionColor: '#e0c64e', //'#00ffd9',
    fadeDistance: 50,
    fadeStrength: 1,
    followCamera: false,
    infiniteGrid: true
  }

  useEffect(() => {
    console.log(ref)
    ref.current.material.toneMapped = false
  }, [])

  return (
    <group>
      <Grid ref={ref} position={[0, -0.01, 0]} args={options.gridSize} {...options} />
    </group>
  )
}
