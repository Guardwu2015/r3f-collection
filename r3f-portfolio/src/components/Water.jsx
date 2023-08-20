import vertexShader from '../shaders/water/vertexShader.js'
import fragmentShader from '../shaders/water/fragmentShader.js'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'

const uniforms = {
    iTime: { value: 0.0 },
    iResolution: { value: new THREE.Vector2(7000, 4000) }
    }

export default function Water() {

    const waterMaterial = useRef()

    useFrame((state, delta) => {
        // uniforms.iTime.value += delta
        waterMaterial.current.uniforms.iTime.value += delta
    })

    return <>
    <mesh rotation-x={ - Math.PI / 2 } position={[-1.5, 1.7, 1.6]}>
        <planeGeometry args={[4, 4.5, 4]} />
        <shaderMaterial
            ref={waterMaterial}
			fragmentShader={fragmentShader}
			vertexShader={vertexShader}
			uniforms={uniforms}
            transparent
        />
    </mesh>
    </>

}