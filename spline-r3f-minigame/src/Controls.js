import * as THREE from 'three'
import { useRef, useState, useEffect } from 'react'
import { useThree, useGraph } from '@react-three/fiber'
import { useSpring } from 'react-spring'
import { useGame } from './store'

function useKeys({ enabled = true, ...handlers }) {
  const keys = useRef({})

  useEffect(() => {
    if (!enabled) return

    const onKeyDown = (event) => {
      // Bail if key is already pressed
      if (keys.current[event.code]) return
      keys.current[event.code] = true

      // Call handler
      return handlers?.[event.code]?.(event)
    }
    const onKeyUp = (event) => (keys.current[event.code] = false)

    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('keyup', onKeyUp)

    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('keyup', onKeyUp)
    }
  }, [enabled, handlers])

  return keys
}

const temp = new THREE.Vector3()
const player = new THREE.Object3D()

function Controls() {
  const playing = useGame((state) => state.playing)
  const { scene } = useThree()
  const { nodes } = useGraph(scene)
  const { Bunny, Level } = nodes
  const [position, setPosition] = useState(() => Level.position.toArray())
  const [quaternion, setQuaternion] = useState(() => Bunny.quaternion.toArray())

  // Animate controls' movement
  useSpring({
    position,
    quaternion,
    onChange({ value }) {
      Level.position.set(...value.position)
      Bunny.quaternion.set(...value.quaternion).normalize()
    }
  })

  useKeys({
    enabled: playing,
    // Calculate movement local to player rotation and
    // apply displacement to level spring
    KeyW: () => {
      temp.copy(player.position)
      player.translateZ(1)
      temp.sub(player.position).multiplyScalar(100)

      setPosition(([x, y, z]) => [x + temp.x, y + temp.y, z + temp.z])
    },
    // Rotate player and apply its quaternion to bunny spring
    KeyA: () => {
      player.rotateY(Math.PI / 2)
      setQuaternion(player.quaternion.toArray())
    },
    KeyD: () => {
      player.rotateY(Math.PI / -2)
      setQuaternion(player.quaternion.toArray())
    }
  })

  return null
}

export default Controls
