import { Suspense, useEffect, useMemo } from 'react'
import { useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { useLoader } from '@react-three/fiber'
import { TextureLoader, WebGLCubeRenderTarget } from 'three'
import { FileAttachment } from 'react-file-utils'

export function Skybox({ skybox_texture, depth_texture }) {
  const { scene, gl } = useThree()

  const [texture, depthTex] = useLoader(TextureLoader, [skybox_texture, depth_texture])

  useEffect(() => {
    const rt = new WebGLCubeRenderTarget(texture.image.height)
    rt.fromEquirectangularTexture(gl, texture)
    rt.texture.minFilter = depthTex.minFilter = THREE.NearestFilter
    rt.texture.magFilter = depthTex.magFilter = THREE.LinearFilter
    rt.texture.format = depthTex.format = THREE.RGBAFormat
    rt.texture.generateMipmaps = depthTex.generateMipmaps = false
    rt.depthTexture = depthTex

    scene.background = rt.texture
  }, [texture, depthTex])

  return <Suspense fallback={null}>null</Suspense>
}
