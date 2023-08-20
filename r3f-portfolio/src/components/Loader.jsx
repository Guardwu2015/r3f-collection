import { Html, useProgress } from '@react-three/drei'


import './bios/loader.css'
import { useFrame } from '@react-three/fiber'
import { useState } from 'react'

const vertexShader = `
  void main()
  {
      gl_Position = vec4(position, 1.0);
  }
`

const fragmentShader = `
  uniform float uAlpha;

  void main()
  {
      gl_FragColor = vec4(0.4, 0.6, 1.0, uAlpha);
  }
`

export default function Loader() {
  const { progress } = useProgress()

  const [progressWidth, setProgressWidth] = useState(0)

  useFrame((state, delta)=> {
    if(progressWidth < 190) setProgressWidth(progressWidth + (delta * 300))
  })

  return <>
    <Html center>
      <div className='loader'>
        One second please :)
        <div className='progress'>
          <div className='progressValue' style={{width: progressWidth + 'px'}}></div>
        </div>
      </div>
      
      </Html>
    <mesh>
        <planeGeometry args={[2, 2, 1, 1]} />
        <shaderMaterial
            fragmentShader={fragmentShader}
            vertexShader={vertexShader}
            uniforms={{uAlpha: { value: 1 }}}
            transparent
        />
    </mesh>
  </>
}