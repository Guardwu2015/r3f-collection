import {
  ContactShadows,
  Environment,
  PerspectiveCamera,
  Text
} from "@react-three/drei";
import { useControls, Leva } from "leva";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { DissolveMaterial } from "./DissolveMaterial";
import { Canvas, useThree } from "@react-three/fiber";
import { Model } from "./Model";
import { Branding } from "./Branding";

function Scene() {
  const props = useControls({
    debug: {
      value: false
    },
    mode: {
      options: ["translate", "rotate", "scale"],
      value: "translate"
    },
    feather: {
      value: 6,
      min: 0,
      max: 10,
      step: 0.1
    },
    thickness: {
      value: 0.1,
      min: 0,
      max: 1,
      step: 0.01
    },
    color: {
      value: "#eb5a13"
    },
    intensity: {
      value: 4.5,
      min: 1,
      max: 10,
      step: 0.1
    }
  });

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 2, 8]} fov={40} />
      <Environment preset="apartment" />
      <Model material={<DissolveMaterial {...props} />} />
      <ContactShadows resolution={512} blur={2} />
      <Environment background preset="dawn" blur={0.8} />

      <Text
        font="/font.ttf"
        position={[0, 2, 0]}
        scale={[2, 4, 2]}
        fillOpacity={0.75}
        color="white"
      >
        DISSOLVE
      </Text>
    </>
  );
}

export default function App() {
  return (
    <>
      <div className="canvas">
        <Canvas shadows>
          <fog attach="fog" args={["black", 15, 21.5]} />
          <Scene />

          <EffectComposer disableNormalPass>
            <Bloom luminanceThreshold={2} mipmapBlur />
          </EffectComposer>
        </Canvas>
      </div>

      <Leva collapsed />
      <Branding />
    </>
  );
}
