import * as THREE from 'three'
import { useRef, useCallback } from 'react'
import { useThree, useGraph, useFrame } from '@react-three/fiber'
import { useSpring, SpringValue } from 'react-spring'
import { useGame } from './store'

const temp = new THREE.Vector3()

function Player() {
  const game = useGame()
  const { scene } = useThree()
  const { nodes } = useGraph(scene)
  const { Bunny, Tiles, Items } = nodes
  const collected = useRef([])

  // Animates bunny when falling out of level
  useSpring(
    () => ({
      immediate: !game.falling,
      y: game.falling ? -300 : Bunny.position.y,
      config: {
        mass: 10
      },
      onChange({ value }) {
        Bunny.position.y = value.y
      }
    }),
    [game.falling]
  )

  // Checks whether bunny is intersecting
  const intersect = useCallback(
    (objects) =>
      objects.find((object) => {
        temp.setFromMatrixPosition(object.matrixWorld)
        temp.y = Bunny.position.y

        return temp.distanceTo(Bunny.position) < 80
      }),
    [Bunny]
  )

  useFrame(() => {
    // Fade out collected items
    for (const item of collected.current) {
      const t = item.userData.spring.get()

      if (t < 1) {
        const material = item.material ?? item.children[0].material
        material.color.alpha.value = 1 - t
        item.position.y = item.userData.y * t
      } else if (item.visible) {
        item.visible = false
      }
    }

    // Skip game logic if not playing
    if (!game.playing) return

    // Check for level collision
    const tile = intersect(Tiles.children)
    if (!tile) game.stop(true)

    // Check if bunny is collecting an item
    const item = intersect(Items.children)
    if (item && !item.userData.collected) {
      // Mark as collected, init transition userdata
      item.userData.collected = true
      item.userData.y = item.position.y + 120
      item.userData.spring = new SpringValue(0)
      item.traverse((node) => (node.castShadow = false))

      // Start transition and write to game state
      item.userData.spring.start(1)
      game.setCollected(collected.current.push(item) + 1)
    }
  })

  return null
}

export default Player
