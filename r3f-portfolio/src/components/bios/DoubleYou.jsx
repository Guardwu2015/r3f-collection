import { useEffect, useRef, useState } from "react"

import './bios.css'

export default function DoubleYou({setSceneLetter}) {

    const wrapper = useRef()

    const [visible, setVisible] = useState(false)

    useEffect(()=> {
        setVisible(true)
    }, [])

    function handleClose() {
        setVisible(false)
        setTimeout(() => setSceneLetter(''), 300)
    } 

    return <>
        <div className={`introCard ${visible && 'visible'}`} ref={wrapper}>
            HERE IS SOME STUFF
        </div>
    </>
}