export type PlaybackMode = 'sequence' | 'shuffle' | 'repeat' | 'repeat-one'

export interface PlayerState {
  currentTrack: import('./models').Track | null
  queue: import('./models').QueueItem[]
  currentIndex: number
  isPlaying: boolean
  currentTime: number
  duration: number
  volume: number
  playbackRate: number
  mode: PlaybackMode
  isMuted: boolean
}

export type PlayerAction =
  | { type: 'SET_TRACK'; payload: import('./models').Track }
  | { type: 'SET_QUEUE'; payload: import('./models').QueueItem[] }
  | { type: 'ADD_TO_QUEUE'; payload: import('./models').QueueItem }
  | { type: 'REMOVE_FROM_QUEUE'; payload: string }
  | { type: 'REORDER_QUEUE'; payload: { from: number; to: number } }
  | { type: 'CLEAR_QUEUE' }
  | { type: 'PLAY' }
  | { type: 'PAUSE' }
  | { type: 'TOGGLE_PLAY' }
  | { type: 'NEXT' }
  | { type: 'PREVIOUS' }
  | { type: 'SEEK'; payload: number }
  | { type: 'SET_CURRENT_TIME'; payload: number }
  | { type: 'SET_DURATION'; payload: number }
  | { type: 'SET_VOLUME'; payload: number }
  | { type: 'TOGGLE_MUTE' }
  | { type: 'SET_PLAYBACK_RATE'; payload: number }
  | { type: 'SET_MODE'; payload: PlaybackMode }
  | { type: 'TOGGLE_SHUFFLE' }
  | { type: 'TOGGLE_REPEAT' }