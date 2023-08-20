import { useEffect, useRef, useState } from "react"
import { Html } from '@react-three/drei'

import './bios.css'


export default function ContactCard({sceneLetter, setSceneLetter}) {

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
        {sceneLetter === 'L2' && 
        <>
            <Html
                transform
                wrapperClass="macbookScreen"
                distanceFactor={ 1 }
                position={ [ -1.1, 2.4, 10.5 ] }
                rotation-x={ 0.05 }
                rotation-y={ -2.4 }
            >
                <div className={`contactCard ${visible && 'visible'}`} ref={wrapper}>
                    {/* <div className='contactButtons'>
                        <button className='backButton' onClick={handleClose}>⌦</button>
                    </div> */}
                    <hr></hr>
                    <div className='contactTitle'>
                    <span>
                        <button className='backButton' onClick={handleClose}>⌦</button>
                    </span> | where to find <span>me</span>
                    </div>
                    <hr></hr>
                    <div className='contactList'>
                        <ul>
                            <li><a href='https://twitter.com/_willdebras'>twitter dot com</a></li>
                            <li><a href='mailto:wbonnell123@gmail.com'>electronic mail</a></li>
                            <li><a href='https://github.com/willdebras'>github dot com</a></li>
                        </ul>
                    </div>
                </div>
            </Html>
        </>
        }
    </>
}