import { useTexture } from '@react-three/drei'
import { useFrame, useThree, extend } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import { PlaneGeometry, RepeatWrapping, Vector3 } from 'three'
import { Water } from 'three/examples/jsm/objects/Water.js'
extend({ Water })

export function Ocean() {
  const ref = useRef()
  const gl = useThree((state) => state.gl)
  const waterNormals = useTexture('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/waternormals.jpg')

  waterNormals.wrapS = waterNormals.wrapT = RepeatWrapping
  const geom = useMemo(() => new PlaneGeometry(300, 300), [])
  const config = useMemo(
    () => ({
      textureWidth: 512,
      textureHeight: 512,
      waterNormals,
      sunDirection: new Vector3(),
      sunColor: 0xeb8934,
      waterColor: 0x0064b5,
      distortionScale: 20,
      fog: false,
      format: gl.encoding
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [waterNormals]
  )
  useFrame((state, delta) => (ref.current.material.uniforms.time.value += delta))
  return <water ref={ref} args={[geom, config]} rotation-x={-Math.PI / 2} position={[0, 0, 0]} />
}
