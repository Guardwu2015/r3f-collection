import { Suspense, useState } from "react"
import { Canvas } from "@react-three/fiber"
import { GizmoHelper, GizmoViewport, Lightformer, Bounds, Environment, ArcballControls } from "@react-three/drei"
import { EffectComposer, SSAO, Selection, Outline } from "@react-three/postprocessing"
import { Engine } from "./Engine"

export default function App({ positions = [2, 0, 2, 0, 2, 0, 2, 0] }) {
  const [radius, setRadius] = useState(0)
  return (
    <Canvas orthographic dpr={[1, 2]} camera={{ position: [0, 0, 100], fov: 35, near: 0.1, far: 200 }}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.75} />

        <Selection>
          <EffectComposer autoClear={false}>
            <SSAO radius={radius} intensity={150} luminanceInfluence={0.5} color="black" />
            <Outline visibleEdgeColor="white" hiddenEdgeColor="white" blur edgeStrength={100} />
          </EffectComposer>
          <Bounds fit clip margin={1.2} damping={0} onFit={(e) => setRadius(e.distance / 4000)}>
            <Engine rotation={[Math.PI / 2, 0, 0]} />
          </Bounds>
        </Selection>

        <Environment resolution={256}>
          <group rotation={[-Math.PI / 2, 0, 0]}>
            <Lightformer intensity={2} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={[10, 10, 1]} />
            {positions.map((x, i) => (
              <Lightformer key={i} form="circle" intensity={4} rotation={[Math.PI / 2, 0, 0]} position={[x, 4, i * 4]} scale={[4, 1, 1]} />
            ))}
            <Lightformer intensity={2} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={[50, 2, 1]} />
            <Lightformer intensity={2} rotation-y={Math.PI / 2} position={[-5, -1, -1]} scale={[50, 2, 1]} />
            <Lightformer intensity={2} rotation-y={-Math.PI / 2} position={[10, 1, 0]} scale={[50, 2, 1]} />
          </group>
        </Environment>
      </Suspense>

      <ArcballControls enableZoom={false} enablePan={false} makeDefault />
    </Canvas>
  )
}
