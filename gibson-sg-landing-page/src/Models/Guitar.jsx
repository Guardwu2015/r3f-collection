/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Author: Ryan_Nein (https://sketchfab.com/Ryan_Nein)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/gibson-sg-guitar-2007af7561fe46958d1f7e92dff8a40d
Title: Gibson SG Guitar
*/

import { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

export default function Guitar(props) {
  const { nodes, materials } = useGLTF("/gibson-sg.glb");
  const { canvasDiv } = props;
  const { size } = useThree();
  const groupRef = useRef();
  const meshRef = useRef();
  const mobileView = size.width < 768;
  const scale = mobileView ? 2.7 : 4.3;
  const rotationZ = mobileView ? -0.5 : -1;
  const STARTING__POSITION__VECTOR = mobileView
    ? new THREE.Vector3(-0.4, 1.1, 0)
    : new THREE.Vector3(-1, 1.2, 0);
  const ENDING__POSITION__VECTOR = mobileView
    ? new THREE.Vector3(0, -2.8, -1)
    : new THREE.Vector3(0, -4, -3.3);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(meshRef.current.position, {
        x: 0,
        y: 0,
        z: 0,
        duration: 1,
      });
      const touchDevice = "ontouchstart" in document.documentElement;
      if (touchDevice) {
        ScrollTrigger.normalizeScroll(true);
      }

      ScrollTrigger.create({
        trigger: canvasDiv.current,
        start: "top top",
        end: "50% top",
        onUpdate: (self) => {
          const progress = self.progress;

          groupRef.current.position.lerpVectors(
            STARTING__POSITION__VECTOR,
            ENDING__POSITION__VECTOR,
            progress
          );

          groupRef.current.rotation.z = gsap.utils.mapRange(
            0,
            1,
            rotationZ,
            0,
            progress
          );
        },
      });
    });

    return () => ctx.revert();
  }, [size.width]);

  useFrame((state, delta) => {
    meshRef.current.rotation.z += delta;
  });
  return (
    <group
      scale={scale}
      rotation-z={rotationZ}
      position={STARTING__POSITION__VECTOR}
      ref={groupRef}
      {...props}
      dispose={null}
    >
      <mesh
        ref={meshRef}
        castShadow
        receiveShadow
        geometry={nodes.guitar.geometry}
        material={materials["Material.001"]}
        position={[-0.1, 0.1, -0.5]}
        rotation={[-Math.PI / 2, 0, 0]}
      />
    </group>
  );
}

useGLTF.preload("/gibson-sg.glb");
