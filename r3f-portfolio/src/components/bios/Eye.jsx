import { useEffect, useRef, useState } from "react"

import TrainMap from '../../assets/transitmap.svg'
import './bios.css'

import { useClickAway } from "../../hooks/useClickAway.js"

export default function Eye({setSceneLetter}) {

    const wrapper = useClickAway(() => {
        setSceneLetter('')
      })

    const [visible, setVisible] = useState(false)

    const [windowSize, setWindowSize] = useState({
        height: window.innerHeight,
        width: window.innerWidth
    })

    const [scale, setScale] = useState(0)

    useEffect(()=> {
        setVisible(true)
        setScale(windowSize.height * 0.9 / 1200)
    }, [])

    function handleClose() {
        setVisible(false)
        setTimeout(() => setSceneLetter(''), 200)
    } 

    return <>
        <div className={`mapBio ${visible && 'visible'}`} style={{transform: `scale(${scale})`, left: `calc(50% - ${400*scale}px)`}} ref={wrapper}>
            <div className='headerBio'>
                <button className='backButton' onClick={handleClose}>{'<'}</button>
                <button className='closeButton' onClick={handleClose}>X</button>
            </div>
            <h1>
                WILL's JOURNEY:
            </h1>
            <div className="transitWrapper">
                <img src={TrainMap} alt="Fake transit map" />
                <div className='transitInfo'>
                </div>
                <div className='trainBullet grad'>
                    <h1>Graduated University of Virginia</h1>
                    <h2>Political Science</h2>
                    <h3>2018</h3>
                </div>
                <div className='trainBullet norc'>
                    <h1>NORC at the University of Chicago</h1>
                    <h2>Data Analyst, Visualization developer</h2>
                    <h3>2018 - 2021</h3>
                </div>
                <div className='trainBullet current'>
                    <h1>Oliver Wyman Actuarial</h1>
                    <h2>Manager of Visual Analytics</h2>
                    <h3>2021 - present</h3>
                    <hr></hr>
                    <p>
                        Currently, I work as a lead developer, building analytical web applications and systems in R and JavaScript. 
                        I manage and develop tools for dozens of clients, combining data science and frontend engineering into attractive, functional interfaces.
                    </p>
                </div>
                <div className='trainBullet next'>
                    <h1>The 'What's Next'</h1>
                    <h2>React, R3F, WebGL, D3</h2>
                    <h3>Excited about and open to new opportunities</h3>
                </div>
            </div>
        </div>
    </>
}