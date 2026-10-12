import { useState, useCallback } from 'react'
import { usePlayerStore } from './app/providers/PlayerProvider'
import { Sidebar } from './components/layout/Sidebar'
import { TopBar } from './components/layout/TopBar'
import { PlayerBar } from './components/layout/PlayerBar'
import { MainContent } from './components/layout/MainContent'
import { Icon, Icons } from './components/ui/Icon'

function App() {
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [activeTab, setActiveTab] = useState('home')

  // Player state from store
  const {
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    playbackRate,
    mode,
    queue,
    isQueueOpen,
    isLyricsOpen,
    play,
    pause,
    next,
    previous,
    seek,
    setVolume,
    toggleMute,
    setPlaybackRate,
    setMode,
    toggleQueue,
    toggleLyrics,
  } = usePlayerStore()

  const handleSearch = useCallback((query: string) => {
    console.log('Search:', query)
    // Will implement search in later phase
  }, [])

  const handleTabChange = useCallback((tab: string) => {
    if (tab === 'create-playlist') {
      console.log('Create playlist')
      return
    }
    if (tab.startsWith('playlist-')) {
      console.log('Open playlist:', tab.replace('playlist-', ''))
      return
    }
    setActiveTab(tab)
  }, [])

  const handlePlayPause = useCallback(() => {
    if (isPlaying) pause()
    else play()
  }, [isPlaying, play, pause])

  return (
    <div className="min-h-screen bg-bg text-text-primary flex">
      {/* Sidebar */}
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!isSidebarCollapsed)}
        activeTab={activeTab}
        onTabChange={handleTabChange}
        playlists={[]}
      />

      {/* Main Layout */}
      <div className={cn(
        'flex flex-col flex-1 transition-all duration-300',
        isSidebarCollapsed ? 'ml-[var(--spacing-sidebar-collapsed)]' : 'ml-[var(--spacing-sidebar-width)]'
      )}>
        {/* Top Bar */}
        <TopBar onSearch={handleSearch} />

        {/* Main Content */}
        <MainContent activeTab={activeTab} />

        {/* Player Bar */}
        <PlayerBar
          currentTrack={currentTrack}
          isPlaying={isPlaying}
          currentTime={currentTime}
          duration={duration}
          volume={volume}
          isMuted={isMuted}
          playbackRate={playbackRate}
          mode={mode}
          queueLength={queue.length}
          onPlayPause={handlePlayPause}
          onNext={next}
          onPrevious={previous}
          onSeek={seek}
          onVolumeChange={setVolume}
          onMuteToggle={toggleMute}
          onPlaybackRateChange={setPlaybackRate}
          onModeChange={setMode}
          onQueueToggle={toggleQueue}
          onLyricsToggle={toggleLyrics}
          onDevicePicker={() => console.log('Device picker')}
        />
      </div>

      {/* Queue Sidebar (Overlay) */}
      {isQueueOpen && (
        <div
          className="fixed inset-0 z-[var(--z-modal)] bg-black/50 backdrop-blur-sm"
          onClick={toggleQueue}
          aria-hidden="true"
        >
          <aside className="fixed right-0 top-0 bottom-[var(--spacing-player-height)] w-full max-w-md bg-surface border-l border-border flex flex-col animate-slide-in-right">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h2 className="font-semibold text-text-primary">Up Next</h2>
              <button onClick={toggleQueue} className="p-1 rounded-full hover:bg-surface-elevated" aria-label="Close queue">
                <Icon name={Icons.X} size={20} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {queue.length === 0 ? (
                <p className="text-text-muted text-center py-8">Queue is empty</p>
              ) : (
                queue.map((track, index) => (
                  <div
                    key={track.queueId}
                    className={cn(
                      'flex items-center gap-3 p-2 rounded-lg transition-colors',
                      index === queue.findIndex(t => t.queueId === track.queueId) && 'bg-surface-hover'
                    )}
                  >
                    <span className="text-text-muted text-sm font-mono tabular-nums w-6 text-center">{index + 1}</span>
                    <img src={track.artworkUrl} alt="" className="w-10 h-10 rounded-[var(--radius-image)] object-cover" />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-text-primary truncate">{track.title}</p>
                      <p className="text-text-secondary text-xs truncate">{track.artist.name}</p>
                    </div>
                    <span className="text-text-muted text-xs font-mono tabular-nums">{formatDuration(track.duration)}</span>
                  </div>
                ))
              )}
            </div>
            <div className="p-4 border-t border-border">
              <button className="w-full text-text-secondary hover:text-text-primary text-sm font-medium">
                Clear queue
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* Lyrics Panel (Overlay) */}
      {isLyricsOpen && (
        <div
          className="fixed inset-0 z-[var(--z-modal)] bg-black/50 backdrop-blur-sm"
          onClick={toggleLyrics}
          aria-hidden="true"
        >
          <aside className="fixed right-0 top-0 bottom-[var(--spacing-player-height)] w-full max-w-md bg-surface border-l border-border flex flex-col animate-slide-in-right">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h2 className="font-semibold text-text-primary">Lyrics</h2>
              <button onClick={toggleLyrics} className="p-1 rounded-full hover:bg-surface-elevated" aria-label="Close lyrics">
                <Icon name={Icons.X} size={20} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 text-center text-text-muted">
              Lyrics not available for this track
            </div>
          </aside>
        </div>
      )}
    </div>
  )
}

// Need to import cn
import { cn } from './utils/cn'
import { formatDuration } from './utils/formatters'

export default App