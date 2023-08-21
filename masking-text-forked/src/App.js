import { useRef, useState } from 'react'
import { Canvas, extend, useFrame } from '@react-three/fiber'
import { Text, MeshPortalMaterial, useCursor, CameraControls } from '@react-three/drei'
import { suspend } from 'suspend-react'
import { geometry, easing } from 'maath'

extend(geometry)

const regular = import('@pmndrs/assets/fonts/inter_regular.woff')
const black = import('@pmndrs/assets/fonts/inter_black.woff')

export const App = () => (
  <Canvas>
    <Card caption="P.">
      The Infinite was entirely unknown, and diffused no light before the luminous point violently broke through into vision.
    </Card>
    <CameraControls />
  </Canvas>
)

function Card({ caption, children, ...props }) {
  const ref = useRef()
  const material = useRef()
  const [hovered, hover] = useState(false)
  useCursor(hovered)

  useFrame((state, delta) => {
    easing.damp3(ref.current.position, [0, hovered ? 1.5 : 0, 0], 0.15, delta)
    easing.damp(material.current, 'blur', hovered ? 0.3 : 1.5, 0.25, delta)
  })

  return (
    <group {...props}>
      <mesh position={[0, 0, -0.1]} onPointerOver={() => hover(true)} onPointerOut={() => hover(false)}>
        <roundedPlaneGeometry args={[3.2, 3.2]} />
      </mesh>
      <mesh>
        <roundedPlaneGeometry args={[3, 3]} />
        <MeshPortalMaterial ref={material} transparent blur={20}>
          <group ref={ref}>
            <Label position={[0, 0, -2]} font={black} color="indianred" fontSize={3} lineHeight={0.9}>
              {caption}
            </Label>
            <Label position={[0, -2.2, 0]} fontSize={0.2} maxWidth={2.5} lineHeight={1}>
              {children}
            </Label>
          </group>
        </MeshPortalMaterial>
      </mesh>
    </group>
  )
}

const Label = ({ children, font = regular, ...props }) => (
  <Text font={suspend(font).default} letterSpacing={-0.025} color="black" {...props}>
    {children}
  </Text>
)
