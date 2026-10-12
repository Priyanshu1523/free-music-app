export interface Track {
  id: string
  title: string
  artist: Artist
  album: Album
  duration: number // in seconds
  artworkUrl: string
  audioUrl?: string
  isLiked: boolean
  playCount: number
  explicit: boolean
}

export interface Artist {
  id: string
  name: string
  avatarUrl: string
  subscriberCount: number
  isVerified: boolean
}

export interface Album {
  id: string
  title: string
  artist: Artist
  releaseDate: string
  artworkUrl: string
  trackCount: number
  type: 'album' | 'single' | 'ep' | 'compilation'
}

export interface Playlist {
  id: string
  title: string
  description: string
  artworkUrl: string
  owner: Artist
  trackCount: number
  duration: number // total seconds
  isPublic: boolean
  isCollaborative: boolean
  createdAt: string
  updatedAt: string
}

export interface QueueItem extends Track {
  queueId: string
  addedAt: number
}

export interface SearchResult {
  tracks: Track[]
  artists: Artist[]
  albums: Album[]
  playlists: Playlist[]
}