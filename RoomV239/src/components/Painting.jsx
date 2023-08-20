/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.4 painting.glb -T -p 6
*/

import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useBake } from "../hooks/useBake";

export function Painting(props) {
  const { nodes, materials } = useGLTF("/models/painting-transformed.glb");
  materials["Material.004"].envMapIntensity = 0.2;

  const material = useBake("painting");

  materials["Material.004"].lightMap = material.lightMap;
  materials["Material.004"].lightMapIntensity = 2;

  return (
    <group
      {...props}
      dispose={null}
    >
      <mesh
        geometry={nodes.Cube.geometry}
        material={materials["Material.004"]}
        position={[1.27843, 1.282249, -1.986724]}
        rotation={[0, -Math.PI / 2, 0]}
        scale={0.846958}
      />
    </group>
  );
}