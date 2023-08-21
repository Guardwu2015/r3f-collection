import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, OrthographicCamera, Sphere, Cone, Cylinder, View } from '@react-three/drei'

let index = 1
const AngleSteps = 45 / 2.0
function AddScene(views, viewContainers, caseName, shape) {
  for (let angle = 0; angle <= 180; angle += AngleSteps) {
    const keyAndId = `sphere-${angle}`
    let ref = useRef()
    viewContainers.push(<div key={keyAndId} ref={ref} id={keyAndId} style={{ width: 128, height: 128, display: 'inline-block' }}></div>)

    views.push(
      <View key={keyAndId} index={index++} track={ref}>
        <OrthographicCamera makeDefault zoom={40} left={-2} right={2} top={-2} bottom={2} near={0.001} far={2000} position={[0, 0, 4]} />
        <directionalLight position={[Math.sin((angle / 180) * Math.PI), 0, Math.cos((angle / 180) * Math.PI)]} />
        {shape}
      </View>
    )
  }
  viewContainers.push(<br />)
}

export default function App() {
  const ratio = window.innerHeight / window.innerWidth
  // [0,180] is front lit though to back lit with 90 degrees being lit from the right
  const viewContainers = []
  const views = []
  const angleSteps = 45 / 2.0
  let index = 1

  // Spheres
  AddScene(
    views,
    viewContainers,
    'sphere',
    <Sphere args={[1, 64, 512]} position={[0, 0, 0]}>
      <meshStandardMaterial color="white" />
    </Sphere>
  )

  // Cones
  AddScene(
    views,
    viewContainers,
    'cone',
    <Cone args={[1, 2, 512]} position={[0, 0, 0]}>
      <meshStandardMaterial color="white" />
    </Cone>
  )

  // Cones Tilted
  AddScene(
    views,
    viewContainers,
    'cone-tilted',
    <Cone args={[1, 2, 512]} position={[0, 0, 0]} rotation={[0, 0, -Math.PI / 4]}>
      <meshStandardMaterial color="white" />
    </Cone>
  )

  // Cylinders
  AddScene(
    views,
    viewContainers,
    'cylinders',
    <Cylinder args={[0.75, 0.75, 2, 512]} position={[0, 0, 0]}>
      <meshStandardMaterial color="white" />
    </Cylinder>
  )

  // Cylinders Tilted
  AddScene(
    views,
    viewContainers,
    'cylinders-tilted',
    <Cylinder args={[0.75, 0.75, 2, 512]} position={[0, 0, 0]} rotation={[0, 0, -Math.PI / 4]}>
      <meshStandardMaterial color="white" />
    </Cylinder>
  )

  return (
    <div>
      {viewContainers}
      <Canvas className={'canvas'}>{views}</Canvas>
    </div>
  )
}
