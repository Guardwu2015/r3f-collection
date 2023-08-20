import Eye from './bios/Eye.jsx'
import EllOne from './bios/EllOne.jsx'
import DoubleYou from './bios/DoubleYou.jsx'
import { useKeyDown } from "../hooks/useKeyDown.js"

export default function Bio({sceneLetter, setSceneLetter}) {

    // Example usage:
    useKeyDown(() => {
        setSceneLetter('')
    }, ["Escape"])

    return <>
        {/* {sceneLetter === 'W' && <DoubleYou setSceneLetter={setSceneLetter} />} */}
        {sceneLetter === 'I' && <Eye setSceneLetter={setSceneLetter} />}
        {sceneLetter === 'L1' && <EllOne setSceneLetter={setSceneLetter} />}
    </>

}