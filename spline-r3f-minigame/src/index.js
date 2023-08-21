import { render } from 'react-dom'
import { Suspense } from 'react'
import Canvas from './Canvas'
import Controls from './Controls'
import Player from './Player'
import { useGame } from './store'

function Game() {
  const game = useGame()

  return (
    <Suspense fallback={null}>
      <Canvas
        className="game__canvas"
        scene="/scene.spline"
        onCreated={(state) => {
          // Unlink items' shared materials to manipulate individually
          // TODO: do this in Spline instead
          state.scene.traverse((node) => {
            if (node.name.includes('Item') && node.material) {
              node.material.dispose()
              node.material = node.material.clone()
            }
          })
        }}
      >
        <Controls />
        <Player />
      </Canvas>
      {(game.playing || !!game.collected) && <h1 className="game__timer">Collected: {game.collected}</h1>}
      {!game.playing && (
        <button
          className="game__hint"
          onClick={(event) => {
            event.preventDefault()

            // Don't have game reset logic so reload instead
            window.location.reload()
          }}
        >
          {game.falling ? 'Try' : 'Play'} Again
        </button>
      )}
    </Suspense>
  )
}

render(<Game />, window.root)
