import { cn } from '../../utils/cn'
import { Button } from '../ui/Button'
import { Slider } from '../ui/Slider'
import { Icon, Icons } from '../ui/Icon'
import { Tooltip } from '../ui/Tooltip'
import { formatDuration } from '../../utils/formatters'
import type { Track } from '../../types/models'
import { forwardRef, useState } from 'react'

interface PlayerBarProps {
  currentTrack: Track | null
  isPlaying: boolean
  currentTime: number
  duration: number
  volume: number
  isMuted: boolean
  playbackRate: number
  mode: 'sequence' | 'shuffle' | 'repeat' | 'repeat-one'
  queueLength: number
  onPlayPause: () => void
  onNext: () => void
  onPrevious: () => void
  onSeek: (time: number) => void
  onVolumeChange: (volume: number) => void
  onMuteToggle: () => void
  onPlaybackRateChange: (rate: number) => void
  onModeChange: (mode: 'sequence' | 'shuffle' | 'repeat' | 'repeat-one') => void
  onQueueToggle: () => void
  onLyricsToggle: () => void
  onDevicePicker: () => void
}

const playbackRates = [0.5, 0.75, 1, 1.25, 1.5, 2] as const

export const PlayerBar = forwardRef<HTMLDivElement, PlayerBarProps>(
  (
    {
      currentTrack,
      isPlaying,
      currentTime,
      duration,
      volume,
      isMuted,
      playbackRate,
      mode,
      queueLength,
      onPlayPause,
      onNext,
      onPrevious,
      onSeek,
      onVolumeChange,
      onMuteToggle,
      onPlaybackRateChange,
      onModeChange,
      onQueueToggle,
      onLyricsToggle,
      onDevicePicker,
    },
    ref
  ) => {
    const [showVolumeSlider, setShowVolumeSlider] = useState(false)
    const [showPlaybackRateMenu, setShowPlaybackRateMenu] = useState(false)

    const progress = duration > 0 ? (currentTime / duration) * 100 : 0
    const effectiveVolume = isMuted ? 0 : volume

    if (!currentTrack) {
      return (
        <footer
          ref={ref}
          className={cn(
            'fixed bottom-0 left-0 right-0 z-[var(--z-player)] h-[var(--spacing-player-height)]',
            'bg-player-bg border-t border-player-border flex items-center justify-between px-4'
          )}
          role="region"
          aria-label="Music player"
        >
          <div className="flex-1 flex items-center justify-center text-text-muted">
            No track playing
          </div>
        </footer>
      )
    }

    return (
      <footer
        ref={ref}
        className={cn(
          'fixed bottom-0 left-0 right-0 z-[var(--z-player)] h-[var(--spacing-player-height)]',
          'bg-player-bg border-t border-player-border flex items-center justify-between px-4',
          'gap-4'
        )}
        role="region"
        aria-label="Music player"
      >
        {/* Track Info */}
        <div className="flex items-center gap-3 min-w-0 flex-shrink-1">
          <Tooltip content={currentTrack.album?.title || 'Album'} position="top">
            <img
              src={currentTrack.artworkUrl}
              alt=""
              className="w-14 h-14 rounded-[var(--radius-image)] object-cover flex-shrink-0"
              loading="lazy"
            />
          </Tooltip>
          <div className="min-w-0">
            <p className="font-medium text-text-primary truncate">{currentTrack.title}</p>
            <p className="text-text-secondary text-sm truncate">{currentTrack.artist.name}</p>
          </div>
          <div className="flex items-center gap-1">
            <Tooltip content={currentTrack.isLiked ? 'Liked' : 'Like'} position="top">
              <Button
                variant="icon"
                size="sm"
                className={cn(currentTrack.isLiked && 'text-primary')}
                onClick={() => {}}
                aria-label={currentTrack.isLiked ? 'Unlike' : 'Like'}
              >
                <Icon name={currentTrack.isLiked ? Icons.Heart : Icons.HeartOff} size={18} />
              </Button>
            </Tooltip>
            <Tooltip content="More options" position="top">
              <Button variant="icon" size="sm" onClick={() => {}} aria-label="More options">
                <Icon name={Icons.MoreVertical} size={18} />
              </Button>
            </Tooltip>
          </div>
        </div>

        {/* Playback Controls */}
        <div className="flex flex-col items-center gap-2 flex-1 max-w-xl">
          <div className="flex items-center gap-4">
            {/* Shuffle */}
            <Tooltip content="Shuffle" position="top">
              <Button
                variant="icon"
                size="sm"
                className={cn(mode === 'shuffle' && 'text-primary')}
                onClick={() => onModeChange(mode === 'shuffle' ? 'sequence' : 'shuffle')}
                aria-label={mode === 'shuffle' ? 'Disable shuffle' : 'Enable shuffle'}
                aria-pressed={mode === 'shuffle'}
              >
                <Icon name={Icons.Shuffle} size={18} />
              </Button>
            </Tooltip>

            {/* Previous */}
            <Tooltip content="Previous" position="top">
              <Button variant="icon" size="md" onClick={onPrevious} aria-label="Previous track">
                <Icon name={Icons.SkipBack} size={24} />
              </Button>
            </Tooltip>

            {/* Play/Pause */}
            <Tooltip content={isPlaying ? 'Pause' : 'Play'} position="top">
              <Button
                variant="fab"
                size="sm"
                className="bg-text-primary text-bg hover:bg-text-primary/90"
                onClick={onPlayPause}
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                <Icon name={isPlaying ? Icons.Pause : Icons.Play} size={28} />
              </Button>
            </Tooltip>

            {/* Next */}
            <Tooltip content="Next" position="top">
              <Button variant="icon" size="md" onClick={onNext} aria-label="Next track">
                <Icon name={Icons.SkipForward} size={24} />
              </Button>
            </Tooltip>

            {/* Repeat */}
            <Tooltip content={mode === 'repeat-one' ? 'Repeat one' : mode === 'repeat' ? 'Repeat all' : 'Repeat off'} position="top">
              <Button
                variant="icon"
                size="sm"
                className={cn((mode === 'repeat' || mode === 'repeat-one') && 'text-primary')}
                onClick={() => {
                  if (mode === 'repeat-one') onModeChange('sequence')
                  else if (mode === 'repeat') onModeChange('repeat-one')
                  else onModeChange('repeat')
                }}
                aria-label={mode === 'repeat-one' ? 'Disable repeat' : 'Enable repeat'}
                aria-pressed={mode === 'repeat' || mode === 'repeat-one'}
              >
                <Icon name={mode === 'repeat-one' ? Icons.Repeat1 : Icons.Repeat} size={18} />
              </Button>
            </Tooltip>
          </div>

          {/* Progress Bar */}
          <div className="w-full flex items-center gap-2 px-2">
            <span className="text-text-secondary text-[11px] font-mono tabular-nums w-10 text-right">
              {formatDuration(currentTime)}
            </span>
            <Slider
              value={progress}
              min={0}
              max={100}
              step={0.1}
              showTooltip
              tooltipFormatter={(v) => formatDuration((v / 100) * duration)}
              onChange={(v) => onSeek((v / 100) * duration)}
              onChangeEnd={(v) => onSeek((v / 100) * duration)}
              aria-label="Playback progress"
            />
            <span className="text-text-secondary text-[11px] font-mono tabular-nums w-10">
              {formatDuration(duration)}
            </span>
          </div>
        </div>

        {/* Right Side: Volume, Queue, Lyrics, Devices */}
        <div className="flex items-center gap-2 min-w-0 flex-shrink-1 justify-end">
          {/* Lyrics */}
          <Tooltip content="Lyrics" position="top">
            <Button variant="icon" size="sm" onClick={onLyricsToggle} aria-label="Show lyrics" className="text-text-secondary hover:text-text-primary">
              <Icon name={Icons.Mic} size={20} />
            </Button>
          </Tooltip>

          {/* Queue */}
          <Tooltip content={`Queue (${queueLength})`} position="top">
            <Button
              variant="icon"
              size="sm"
              onClick={onQueueToggle}
              aria-label={`Queue (${queueLength} tracks)`}
              className="text-text-secondary hover:text-text-primary"
            >
              <Icon name={Icons.ListMusic} size={20} />
            </Button>
          </Tooltip>

          {/* Volume */}
          <div className="relative">
            <Tooltip content={isMuted ? 'Unmute' : 'Mute'} position="top">
              <Button
                variant="icon"
                size="sm"
                onClick={onMuteToggle}
                onMouseEnter={() => setShowVolumeSlider(true)}
                onMouseLeave={() => setTimeout(() => setShowVolumeSlider(false), 100)}
                aria-label={isMuted ? 'Unmute' : 'Mute'}
                className="text-text-secondary hover:text-text-primary"
              >
                <Icon name={isMuted || volume === 0 ? Icons.VolumeX : Icons.Volume2} size={20} />
              </Button>
            </Tooltip>

            {showVolumeSlider && (
              <div
                className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-32"
                onMouseEnter={() => setShowVolumeSlider(true)}
                onMouseLeave={() => setShowVolumeSlider(false)}
              >
                <Slider
                  value={effectiveVolume * 100}
                  min={0}
                  max={100}
                  step={1}
                  onChange={(v) => onVolumeChange(v / 100)}
                  aria-label="Volume"
                />
              </div>
            )}
          </div>

          {/* Playback Rate */}
          <div className="relative">
            <Tooltip content={`Speed: ${playbackRate}x`} position="top">
              <Button
                variant="icon"
                size="sm"
                onClick={() => setShowPlaybackRateMenu(!showPlaybackRateMenu)}
                aria-label="Playback speed"
                className="text-text-secondary hover:text-text-primary"
              >
                <Icon name={Icons.Settings} size={18} />
              </Button>
            </Tooltip>

            {showPlaybackRateMenu && (
              <div
                className="absolute bottom-full right-0 mb-2 bg-surface-elevated border border-border rounded-lg p-1 shadow-lg min-w-[120px]"
                onMouseEnter={() => setShowPlaybackRateMenu(true)}
                onMouseLeave={() => setShowPlaybackRateMenu(false)}
                role="menu"
              >
                {playbackRates.map((rate) => (
                  <button
                    key={rate}
                    onClick={() => {
                      onPlaybackRateChange(rate)
                      setShowPlaybackRateMenu(false)
                    }}
                    className={cn(
                        'w-full px-3 py-1.5 text-sm rounded text-left transition-colors',
                        'hover:bg-surface-hover',
                        playbackRate === rate ? 'text-primary font-medium' : 'text-text-primary'
                      )}
                    role="menuitemradio"
                    aria-checked={playbackRate === rate}
                  >
                    {rate}x
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Devices */}
          <Tooltip content="Cast to device" position="top">
            <Button variant="icon" size="sm" onClick={onDevicePicker} aria-label="Cast to device" className="text-text-secondary hover:text-text-primary">
              <Icon name={Icons.Tv} size={20} />
            </Button>
          </Tooltip>
        </div>
      </footer>
    )
  }
)

PlayerBar.displayName = 'PlayerBar'