import { useContext, useState } from 'react'
import './App.css'
import { Canvas } from '@react-three/fiber'
import Experience from './Experience.jsx'
import { Leva } from 'leva'
import Cursor from './components/Cursor'
import Bio from './components/Bio'

import { MouseContext } from "./context/mouse-context"

function App() {

  // const { cursorType, cursorChangeHandler } = useContext(MouseContext)

  const [sceneLetter, setSceneLetter] = useState()

  return (
    <>
      <Bio sceneLetter={sceneLetter} setSceneLetter={setSceneLetter}/>
      <Leva hidden />
      {/* <Cursor /> */}
      <Canvas> 
        <Experience sceneLetter={sceneLetter} setSceneLetter={setSceneLetter}/>
      </Canvas>
    </>

  )
}


export default App
