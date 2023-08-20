/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import { Sparkles, useGLTF } from "@react-three/drei";
import React, { useRef } from "react";
export function Cauldron(props) {
  const group = useRef();
  const { nodes, materials } = useGLTF("./models/cauldron/model.gltf");
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh
        geometry={nodes.Sphere015.geometry}
        material={materials["Black.005"]}
      />
      <mesh
        geometry={nodes.Sphere015_1.geometry}
        material={materials.GreenLight}
      >
        <Sparkles
          count={64}
          scale={2}
          size={40}
          speed={0.4}
          color={"#77FF77"}
          position={[0, 0.5, 0]}
        />
      </mesh>
      <mesh geometry={nodes.Sphere015_2.geometry} material={materials.Green} />
      <mesh
        geometry={nodes.Sphere015_3.geometry}
        material={materials.BrownDark}
      />
    </group>
  );
}

useGLTF.preload("./models/cauldron/model.gltf");