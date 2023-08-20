//Adapted from https://codepen.io/ste-vg/pen/GRwmqxq
import {
  Environment,
  Lightformer,
  Loader,
  MeshReflectorMaterial,
  Box,
  MeshTransmissionMaterial,
  OrbitControls,
  Plane,
  Preload,
  Sky,
  Sparkles,
  Stars,
  Text3D,
  useTexture,
  RoundedBox,
  ContactShadows
} from '@react-three/drei'
import { Canvas, useLoader, useThree } from '@react-three/fiber'
import { useControls } from 'leva'
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { RGBELoader } from 'three-stdlib'

import { gsap } from 'gsap'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'
import { Color, DoubleSide, LinearFilter, NearestFilter, RGBAFormat, TextureLoader, WebGLCubeRenderTarget } from 'three'
import { FX } from './FX'
import { Korrigan } from './Korrigan'
import { Ocean } from './Ocean'
import Tree from './Tree'
import { getRandomColor, getRandomIntInclusive } from './utils'

gsap.registerPlugin(MotionPathPlugin)

//Adapted from https://codesandbox.io/s/skybox-pnn932?file=/src/Skybox.js:1105-1179
function CubeEnv({ src, children, ...props }) {
  const { gl, scene } = useThree()
  const map = useTexture(src)
  useLayoutEffect(() => {
    const oldBg = scene.background
    map.colorSpace = gl.outputColorSpace
    const rt = new WebGLCubeRenderTarget(map.image.height)
    rt.fromEquirectangularTexture(gl, map)
    rt.texture.minFilter = NearestFilter
    rt.texture.magFilter = LinearFilter
    rt.texture.format = RGBAFormat
    rt.texture.generateMipmaps = false
    scene.background = rt.texture

    return () => (scene.background = oldBg)
  })
  return <>{children}</>
}

export function App() {
  const bounceConfig = useControls({
    bounceHeight: { min: 10, max: 20, value: 12 },
    bounceDuration: { min: 1, max: 2, value: 1.7 },
    bounceWobble: { min: 0.5, max: 2, value: 0.8 }
  })
  const [currentStyle, setCurrentStyle] = useState('A')
  const texture = useLoader(RGBELoader, 'https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/aerodynamics_workshop_1k.hdr')
  const dispMap = useLoader(TextureLoader, '/dispMapTest.png')
  const circMap = useLoader(TextureLoader, '/pat1.png')
  const circInvMap = useLoader(TextureLoader, '/pat2.png')

  useTexture.preload('/pat1.png')
  useTexture.preload('/pat2.png')
  useTexture.preload('/bg/lemons.jpg')
  useTexture.preload('/bg/sweets.jpg')
  useTexture.preload('/bg/scifi.jpg')
  useTexture.preload('/dispMapTest.png')
  useTexture.preload('/https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/aerodynamics_workshop_1k.hdr')

  const stdMtmConfig = useMemo(
    () => ({
      backside: true,
      resolution: 1024,
      transmission: 1,
      clearcoat: 0.5,
      clearcoatRoughness: 0.0,
      thickness: 0.3,
      chromaticAberration: 5,
      anisotropy: 0.3,
      roughness: 0,
      distortion: 0.5,
      distortionScale: 0.1,
      temporalDistortion: 0,
      ior: 1.5
    }),
    []
  )
  const stdMpmConfig = useMemo(
    () => ({
      side: DoubleSide,
      transmission: 1,
      clearcoat: 0,
      clearcoatRoughness: 0.0,
      metalness: 0.3,
      roughness: 0.3,
      toneMapped: false
    }),
    []
  )

  // function getMaterialConfig() {
  //   return {
  //     scale: getRandomIntInclusive(3, 8),
  //     backsideThickness: getRandomIntInclusive(0, 2),
  //     color: getRandomColor(),
  //     gColor: getRandomColor()
  //   }
  // }

  const sceneStyles = useMemo(() => {
    return {
      A: {
        sky: true,
        stars: true,
        bgColor: 'black',
        ground: <Ocean />,
        textMaterial: <MeshTransmissionMaterial attach="material" {...stdMtmConfig} backsideThickness={getRandomIntInclusive(0, 2)} background={texture} />
      },
      B: {
        name: 'lemonworld',
        sky: false,
        stars: true,
        bgColor: 'black',
        sparkles: true,
        customEnv: '/bg/lemons.jpg',
        textMaterial: <meshPhysicalMaterial {...stdMpmConfig} emissive={'gold'} emissiveIntensity={4} />
      },
      C: { sky: false, stars: false, bgColor: 'lightblue', preset: 'night', textMaterial: <meshPhysicalMaterial {...stdMpmConfig} map={circMap} /> },
      D: {
        sky: false,
        stars: false,
        bgColor: 'black',
        customEnv: '/bg/scifi.jpg',
        ground: (
          <Plane args={[100, 100]} rotation={[Math.PI / 2, 0, 0]}>
            <meshBasicMaterial color={'lightblue'} roughness={0} />
          </Plane>
        ),
        textMaterial: <meshPhysicalMaterial {...stdMpmConfig} map={circInvMap} emissiveMap={circMap} emissive={new Color(0, 1, 2)} emissiveIntensity={3} />
      },
      E: {
        sky: false,
        stars: false,
        bgColor: 'lightblue',
        customEnv: '/bg/sweets.jpg',
        textMaterial: (
          <MeshTransmissionMaterial {...stdMtmConfig} backsideThickness={getRandomIntInclusive(0, 2)} background={texture} color={getRandomColor()} />
        ),
        ground: (
          <Plane args={[100, 100]} rotation={[Math.PI / 2, 0, 0]}>
            <meshBasicMaterial color={'lightblue'} roughness={0} />
          </Plane>
        )
      },
      F: {
        sky: false,
        stars: true,
        bgColor: 'black',
        textMaterial: <meshPhysicalMaterial {...stdMpmConfig} displacementMap={dispMap} color={'silver'} />
      },
      '0': {
        sky: false,
        stars: true,
        bgColor: 'darkblue',
        trees: true,
        sparkles: true
      }
    }
  }, [])

  const onUpdate = (style) => {
    setCurrentStyle(style)
  }

  const {
    sky = false,
    ground = null,
    stars = false,
    bgColor = 'black',
    trees = false,
    sparkles = false,
    lightformers = false,
    textMaterial,
    customEnv = false
  } = sceneStyles[currentStyle]
  return (
    <>
      <Canvas shadows camera={{ position: [10, 20, 20] }} gl={{ preserveDrawingBuffer: true }}>
        <color attach="background" args={[bgColor]} />
        {/* <fog attach="fog" args={[bgColor]} near={30} far={50} /> */}

        {sky && <Sky />}
        {stars && <Stars />}
        {sparkles && <Sparkles count={1000} scale={30} />}
        <Text {...bounceConfig} onUpdate={(s) => onUpdate(s)}>
          {textMaterial}
        </Text>
        <OrbitControls autoRotateSpeed={-0.1} zoomSpeed={0.25} minZoom={0} maxZoom={140} enablePan={false} dampingFactor={0.05} />
        <group position={[0, -3, 0]}>
          {ground}
          {trees && (
            <group>
              <Tree scale={1} position={[20, 0, 5]} />
              <Tree scale={0.5} position={[-1, 0, -13]} />
              <Tree scale={1} position={[-30, 0, 10]} />
              <Tree scale={0.75} position={[-10, 0, 0]} />
              <Plane rotation={[Math.PI / 2, 0, 0]} args={[100, 100]}>
                <meshStandardMaterial side={DoubleSide} color="darkgreen" />
              </Plane>
            </group>
          )}
        </group>

        {customEnv ? (
          <CubeEnv resolution={32} src={customEnv}></CubeEnv>
        ) : (
          <Environment resolution={32} preset="dawn">
            {lightformers && (
              <group rotation={[-Math.PI / 4, -0.3, 0]}>
                <Lightformer intensity={20} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={[10, 10, 1]} />
                <Lightformer intensity={2} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={[10, 2, 1]} />
                <Lightformer intensity={2} rotation-y={Math.PI / 2} position={[-5, -1, -1]} scale={[10, 2, 1]} />
                <Lightformer intensity={2} rotation-y={-Math.PI / 2} position={[10, 1, 0]} scale={[20, 2, 1]} />
                <Lightformer type="ring" intensity={2} rotation-y={Math.PI / 2} position={[-0.1, -1, -5]} scale={10} />
              </group>
            )}
          </Environment>
        )}

        {/* <ContactShadows /> */}
        <FX />
        <Preload all />
      </Canvas>
      <Loader />
    </>
  )
}

function Text({ children, bounceWobble, bounceDuration, bounceHeight, font = '/Inter_Medium_Regular.json', onUpdate, ...props }) {
  const [letterCount, setLetterCount] = useState(0)

  const letters = useMemo(() => ['A', 'B', 'C', 'D', '0', 'E', 'F'], [])

  const textRef = useRef()
  const squishRef = useRef()

  function bounce() {
    const tl = gsap.timeline({
      defaults: { duration: bounceDuration * 0.5 },
      onComplete: () => {
        setLetter()
      }
    })
    tl.set(squishRef.current.scale, { y: bounceWobble, x: 1 + (1 - bounceWobble) })
    tl.to(squishRef.current.scale, { y: 1, x: 1, duration: bounceDuration * 0.6, ease: 'elastic' }, 0)
    tl.to(textRef.current.position, { y: bounceHeight, ease: 'circ.out' }, 0)
    // tl.to('.shadow', { opacity: 0.2, ease: 'circ.out' }, 0)
    tl.to(textRef.current.position, { y: -8, ease: 'circ.in' }, bounceDuration * 0.5)
    // tl.to('.shadow', { opacity: 1, ease: 'circ.in' }, BOUNCE_DURATION * 0.5)
    tl.to(
      textRef.current.rotation,
      { z: 'random(-2.61799, 2.61799)', y: 'random(-0.872665, 0.872665)', x: 'random(-0.872665, 0.872665)', duration: bounceDuration, ease: 'none' },
      0
    )
  }

  function setLetter() {
    setLetterCount((prev) => (prev < letters.length - 1 ? prev + 1 : 0))
    bounce()
  }

  useEffect(() => {
    bounce()
  }, [])

  useEffect(() => {
    if (onUpdate) onUpdate(letters[letterCount])
  }, [letterCount])

  const scale = getRandomIntInclusive(5, 10)
  return (
    <>
      <group ref={squishRef}>
        <group ref={textRef} scale={scale}>
          {letters[letterCount] !== '0' ? (
            <Text3D
              castShadow
              bevelEnabled
              font={font}
              letterSpacing={-0.03}
              height={0.25}
              bevelSize={0.1}
              bevelSegments={10}
              curveSegments={128}
              bevelThickness={0.1}>
              {letters[letterCount]}
              {children}
            </Text3D>
          ) : (
            <Korrigan />
          )}
        </group>
      </group>
    </>
  )
}
