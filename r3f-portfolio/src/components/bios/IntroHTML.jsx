import { useEffect, useRef, useState } from "react"
import { Html } from '@react-three/drei'

import './bios.css'
import Sparkles from './Sparkles.jsx'

export default function IntroHTML({sceneLetter, setSceneLetter}) {

    const wrapper = useRef()

    const closeButton = useRef()

    const [visible, setVisible] = useState(false)

    useEffect(()=> {
        setVisible(true)
    }, [])

    function handleClose() {
        setVisible(false)
        setTimeout(() => setSceneLetter(''), 300)
    }

    useEffect(()=> {
        handleClose()
    }, [closeButton])
    

    return <>
        {sceneLetter === 'W' && 
        <>
            <Html
                transform
                wrapperClass="macbookScreen"
                distanceFactor={ 1.6 }
                position={ [ 0.8, 3.3, -1.4 ] }
                rotation-x={ - 0.05 }
                rotation-y={ - 0.7 }
            >
                <div className={`introCard ${visible && 'visible'}`} ref={wrapper}>
                    <span><sup>I'm</sup></span> Will Bonnell <span><sup>aka</sup></span> willdebras
                    <hr></hr>
                    <div className='introSubtitle'> 
                        ▷ I'm a <span>creative developer</span> with a background in <span>data science</span> and <span>visualization</span>.
                    </div>
                </div>
            </Html>
            <Html
                transform
                wrapperClass="macbookScreen"
                distanceFactor={ 1.5 }
                position={ [ 3.4, 3.1, 3.5 ] }
                rotation-x={ 0 }
                rotation-y={ - 1 }
            >
                <div className={`introBack cloud ${visible && 'visible'}`} ref={wrapper}>
                    <button onClick={handleClose}>⭰</button>
                </div>
            </Html>
            <Html
                transform
                wrapperClass="macbookScreen"
                distanceFactor={ 1.5 }
                position={ [ 2.4, 3.3, 1.4 ] }
                rotation-x={ 0.025 }
                rotation-y={ - 1.25 }
            >
                <div className={`introCard ${visible && 'visible'}`} ref={wrapper}>
                    <div className='introSubtitle'> 
                    ▷ This portfolio exists as a <Sparkles className='flourish'>playground</Sparkles> for my three.js work. It includes explorations in design, <span>baked and hand-painted models</span>, <span>graphics shaders</span>, and more.
                    <div>▷ Click around and Enjoy!</div>
                    </div>
                </div>
            </Html>
        </>
        }
    </>
}