import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Track, QueueItem } from '../../types/models'
import type { PlaybackMode } from '../../types/player'

interface PlayerState {
  // Current track
  currentTrack: Track | null
  queue: QueueItem[]
  currentIndex: number

  // Playback state
  isPlaying: boolean
  currentTime: number
  duration: number
  volume: number
  playbackRate: number
  mode: PlaybackMode
  isMuted: boolean

  // UI state
  isQueueOpen: boolean
  isLyricsOpen: boolean

  // Actions
  setTrack: (track: Track) => void
  setQueue: (tracks: QueueItem[]) => void
  addToQueue: (track: Track) => void
  removeFromQueue: (queueId: string) => void
  reorderQueue: (from: number, to: number) => void
  clearQueue: () => void
  play: () => void
  pause: () => void
  togglePlay: () => void
  next: () => void
  previous: () => void
  seek: (time: number) => void
  setCurrentTime: (time: number) => void
  setDuration: (duration: number) => void
  setVolume: (volume: number) => void
  toggleMute: () => void
  setPlaybackRate: (rate: number) => void
  setMode: (mode: PlaybackMode) => void
  toggleShuffle: () => void
  toggleRepeat: () => void
  toggleQueue: () => void
  toggleLyrics: () => void
  reset: () => void
}

const initialState = {
  currentTrack: null,
  queue: [],
  currentIndex: -1,
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  volume: 0.8,
  playbackRate: 1,
  mode: 'sequence' as PlaybackMode,
  isMuted: false,
  isQueueOpen: false,
  isLyricsOpen: false,
}

export const usePlayerStore = create<PlayerState>()(
  persist(
    (set, get) => ({
      ...initialState,

      setTrack: (track) => {
        const queue = get().queue
        const existingIndex = queue.findIndex((t) => t.id === track.id)
        if (existingIndex >= 0) {
          set({ currentTrack: track, currentIndex: existingIndex })
        } else {
          const queueItem: QueueItem = {
            ...track,
            queueId: `queue-${track.id}-${Date.now()}`,
            addedAt: Date.now(),
          }
          set({
            currentTrack: track,
            queue: [...queue, queueItem],
            currentIndex: queue.length,
          })
        }
      },

      setQueue: (tracks) => set({ queue: tracks, currentIndex: 0, currentTrack: tracks[0] || null }),

      addToQueue: (track) => {
        const queueItem: QueueItem = {
          ...track,
          queueId: `queue-${track.id}-${Date.now()}`,
          addedAt: Date.now(),
        }
        set((state) => ({ queue: [...state.queue, queueItem] }))
      },

      removeFromQueue: (queueId) =>
        set((state) => {
          const newQueue = state.queue.filter((t) => t.queueId !== queueId)
          let newIndex = state.currentIndex
          if (state.currentIndex >= newQueue.length) newIndex = newQueue.length - 1
          return {
            queue: newQueue,
            currentIndex: newIndex,
            currentTrack: newQueue[newIndex] || null,
          }
        }),

      reorderQueue: (from, to) =>
        set((state) => {
          const newQueue = [...state.queue]
          const [removed] = newQueue.splice(from, 1)
          newQueue.splice(to, 0, removed)
          let newIndex = state.currentIndex
          if (state.currentIndex === from) newIndex = to
          else if (state.currentIndex > from && state.currentIndex <= to) newIndex--
          else if (state.currentIndex < from && state.currentIndex >= to) newIndex++
          return { queue: newQueue, currentIndex: newIndex }
        }),

      clearQueue: () => set({ queue: [], currentIndex: -1, currentTrack: null }),

      play: () => set({ isPlaying: true }),
      pause: () => set({ isPlaying: false }),
      togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),

      next: () =>
        set((state) => {
          const { queue, currentIndex, mode } = state
          if (queue.length === 0) return {}
          let nextIndex: number
          if (mode === 'shuffle') {
            nextIndex = Math.floor(Math.random() * queue.length)
          } else {
            nextIndex = (currentIndex + 1) % queue.length
          }
          return {
            currentIndex: nextIndex,
            currentTrack: queue[nextIndex],
            isPlaying: true,
          }
        }),

      previous: () =>
        set((state) => {
          const { queue, currentIndex } = state
          if (queue.length === 0) return {}
          const prevIndex = (currentIndex - 1 + queue.length) % queue.length
          return {
            currentIndex: prevIndex,
            currentTrack: queue[prevIndex],
            isPlaying: true,
          }
        }),

      seek: (time) => set({ currentTime: Math.max(0, Math.min(time, get().duration)) }),
      setCurrentTime: (time) => set({ currentTime: Math.max(0, Math.min(time, get().duration)) }),
      setDuration: (duration) => set({ duration: Math.max(0, duration) }),

      setVolume: (volume) => set({ volume: Math.max(0, Math.min(1, volume)), isMuted: volume === 0 }),
      toggleMute: () => set((state) => ({ isMuted: !state.isMuted })),

      setPlaybackRate: (rate) => set({ playbackRate: rate }),

      setMode: (mode) => set({ mode }),

      toggleShuffle: () =>
        set((state) => ({
          mode: state.mode === 'shuffle' ? 'sequence' : 'shuffle',
        })),

      toggleRepeat: () =>
        set((state) => {
          if (state.mode === 'repeat-one') return { mode: 'sequence' }
          if (state.mode === 'repeat') return { mode: 'repeat-one' }
          return { mode: 'repeat' }
        }),

      toggleQueue: () => set((state) => ({ isQueueOpen: !state.isQueueOpen })),
      toggleLyrics: () => set((state) => ({ isLyricsOpen: !state.isLyricsOpen })),

      reset: () => set(initialState),
    }),
    {
      name: 'music-player-storage',
      partialize: (state) => ({
        volume: state.volume,
        playbackRate: state.playbackRate,
        mode: state.mode,
        isMuted: state.isMuted,
      }),
    }
  )
)