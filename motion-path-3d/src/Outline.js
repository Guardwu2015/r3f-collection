import * as THREE from 'three'
import React, { useRef } from 'react'
import { useFrame } from 'react-three-fiber'

const Outline = () => {
  const ref = useRef()
  useFrame(({ clock }) => {
    ref.current.uniforms.iTime.value = clock.getElapsedTime()
  })

  return (
    <mesh>
      <planeBufferGeometry args={[2, 2]} />
      <shaderMaterial
        ref={ref}
        uniforms={{
          iTime: { value: 0 },
          iResolution: { value: new THREE.Vector3() },
          iChannel0: { value: new THREE.TextureLoader().load('texture.png') },
          iChannelResolution: {
            value: [new THREE.Vector3(512, 512, 1)]
          }
        }}
        fragmentShader={`
          #define PI 3.14159265359
          #define SAMPLES 32
          #define WIDTH 0.8
          #define COLOR vec4(0.0,0.0,1.0,1.0)
          #define NUM_FRAMES 6.0
          
          uniform float iTime;
          uniform vec3 iResolution;
          uniform sampler2D iChannel0;
          uniform vec3 iChannelResolution[4];
          
          void main() {
            vec2 v_texCoord = gl_FragCoord.xy / iResolution.xy;
            
            vec2 u_textureRes = iChannelResolution[0].xy - vec2(15.0,0.0);
            float frame = floor(mod(iTime*10.0, NUM_FRAMES));
            float frameWidth = u_textureRes.x / NUM_FRAMES;
            
            float catUVWidth = u_textureRes.x / iChannelResolution[0].x;
            vec4 u_textureBoundsUV = vec4(catUVWidth/NUM_FRAMES * frame, 0.0, catUVWidth/6.0 * (frame+1.0), 1.0);
            
            vec2 catScale = vec2(0.10);
            vec2 catPos = vec2(0.0-(frameWidth-2.5)*frame,0.0) + vec2(10.0,0.0);
            vec2 catUV = clamp((gl_FragCoord*catScale-catPos) / u_textureRes, u_textureBoundsUV.xy, u_textureBoundsUV.zw );
            
            //OUTLINE
            float outlineAlpha = 0.0;
            float angle = 0.0;
            for( int i=0; i<SAMPLES; i++ ){
              angle += 1.0/(float(SAMPLES)/2.0) * PI;
              vec2 testPoint = vec2( (WIDTH/u_textureRes.x)*cos(angle), (WIDTH/u_textureRes.y)*sin(angle) );
              testPoint = clamp( catUV + testPoint, u_textureBoundsUV.xy, u_textureBoundsUV.zw );
              float sampledAlpha = texture( iChannel0,  testPoint ).a;
              outlineAlpha = max( outlineAlpha, sampledAlpha );
            }
            gl_FragColor = mix( vec4(0.0), COLOR, outlineAlpha );
        
            //TEXTURE
            vec4 tex0 = texture( iChannel0, catUV );
            gl_FragColor = mix( gl_FragColor, tex0, tex0.a );
          }
        `}
      />
    </mesh>
  )
}

export default Outline
