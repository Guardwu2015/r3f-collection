import Gamepad from 'react-gamepad'
import { useLevelStore } from '../store/store'

export default function GamepadControls() {
  let moveLeft = useLevelStore((store: { moveLeft: any }) => store.moveLeft)
  let moveRight = useLevelStore((store: { moveRight: any }) => store.moveRight)
  let dropAllTheWay = useLevelStore((store: { dropAllTheWay: any }) => store.dropAllTheWay)
  let rotate = useLevelStore((store: { rotate: any }) => store.rotate)
  let pause = useLevelStore((store: { pause: any }) => store.pause)
  let setLevelState = useLevelStore((store: { setLevelState: any }) => store.setLevelState)

  return (
    <Gamepad
      onButtonChange={(buttonName: any, down: any) => {
        if (down) {
          switch (buttonName) {
            case 'Start':
              setLevelState('PLAYING')
              break
            case 'Back':
              pause()
              break
            case 'X':
            case 'RT':
              rotate()
              break
            case 'DPadLeft':
            case 'LB':
              moveLeft()
              break
            case 'DPadRight':
            case 'RB':
              moveRight()
              break
            case 'A':
              dropAllTheWay()
              break
            default:
              break
          }
        }
      }}
    >
      <>{/* Needed because of bug: https://github.com/SBRK/react-gamepad/issues/3 */}</>
    </Gamepad>
  )
}
