import create from 'zustand'

/**
 * Global game state.
 */
export const useGame = create((set) => ({
  playing: true,
  falling: false,
  total: 11,
  collected: 0,
  start: () => set({ playing: true }),
  stop: (falling = false) => set({ playing: false, falling }),
  setCollected: (collected) =>
    set((state) => ({
      collected,
      playing: state.collected === state.total ? false : state.playing
    }))
}))
