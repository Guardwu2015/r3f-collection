import { useHelper, Environment } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useEffect, useRef } from "react"
// import { DirectionalLightHelper } from "three"

import { button, useControls } from 'leva'


export default function Lights()
{

    const { lightPosition } = useControls('lights', { 
        lightPosition: {
            value: { x: -4, y: 25, z:8},
            step: 0.01,
            joystick: 'invertY'
        },
    } )

    const light = useRef()
    
    // useHelper(light, DirectionalLightHelper, 10)

    useEffect(()=> {
        if(light.current) {
            light.current.target.position.z = 4
            light.current.target.position.x = -2
            light.current.target.updateMatrixWorld()
        }
    },[])

    // useFrame((state)=> {
    //     light.current.position.z = state.camera.position.z + 1 - 4
    //     light.current.target.position.z = state.camera.position.z - 4
    //     light.current.target.updateMatrixWorld()
    // })

    return <>

        {/* <directionalLight
            ref={light}
            castShadow
            position={ Object.values(lightPosition) }
            intensity={ 0.8 }
            shadow-mapSize={ [ 64, 64 ] }
            shadow-camera-near={ 1 }
            shadow-camera-far={ 100 }
            shadow-camera-top={ 100 }
            shadow-camera-right={ 100 }
            shadow-camera-bottom={ - 100 }
            shadow-camera-left={ - 100 }
        /> */}

        <directionalLight
            ref={light}
            castShadow
            position={ Object.values(lightPosition) }
            intensity={ 0.3 }
        />

        <ambientLight intensity={ 0.18 } />

        <Environment
            path = '/environmentMaps/2/'
            files= {['px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg']}
        />
    </>
}