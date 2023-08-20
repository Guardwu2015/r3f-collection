import { Bloom, BrightnessContrast, EffectComposer, FXAA, N8AO, Vignette } from '@react-three/postprocessing'

export function FX({ children = null, ...props }) {
  return (
    <EffectComposer multisampling={0} disableGamma disableNormalPass {...props}>
      <N8AO aoRadius={30} distanceFalloff={0.15} intensity={20} screenSpaceRadius />

      <FXAA />
      <Bloom luminanceThreshold={0.9} radius={0.84} intensity={0.125} levels={9} mipmapBlur />
      <BrightnessContrast brightness={0} contrast={0.2} />
      <Vignette />
    </EffectComposer>
  )
}
