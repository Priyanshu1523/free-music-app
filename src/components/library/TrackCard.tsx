import { cn } from '../../utils/cn'
import { Card } from '../ui/Card'
import { Button } from '../ui/Button'
import { Icon, Icons } from '../ui/Icon'
import { Tooltip } from '../ui/Tooltip'
import { formatDuration, formatNumber } from '../../utils/formatters'
import type { Track } from '../../types/models'
import { forwardRef, useState, type MouseEvent } from 'react'

interface TrackCardProps {
  track: Track
  index?: number
  onPlay?: (track: Track) => void
  onAddToQueue?: (track: Track) => void
  onToggleLike?: (track: Track) => void
  showIndex?: boolean
  showArtist?: boolean
  showAlbum?: boolean
  showDuration?: boolean
  className?: string
}

export const TrackCard = forwardRef<HTMLDivElement, TrackCardProps>(
  (
    {
      track,
      index,
      onPlay,
      onAddToQueue,
      onToggleLike,
      showIndex = true,
      showArtist = true,
      showAlbum = false,
      showDuration = true,
      className,
    },
    ref
  ) => {
    const [isHovered, setIsHovered] = useState(false)
    const [showMenu, setShowMenu] = useState(false)

    const handlePlayClick = (e: MouseEvent<HTMLElement>) => {
      e.stopPropagation()
      onPlay?.(track)
    }

    const handleMenuClick = (e: MouseEvent<HTMLElement>) => {
      e.stopPropagation()
      setShowMenu(!showMenu)
    }

    return (
      <Card
        ref={ref}
        variant="interactive"
        className={cn('group relative p-3 gap-3', className)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handlePlayClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && handlePlayClick(e as any)}
      >
        <div className="relative flex-shrink-0">
          <img
            src={track.artworkUrl}
            alt=""
            className="w-14 h-14 rounded-[var(--radius-image)] object-cover"
            loading="lazy"
          />
          {isHovered && (
            <Tooltip content="Play" position="top">
              <Button
                variant="icon"
                size="sm"
                className="absolute inset-0 bg-black/50 rounded-[var(--radius-image)] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                onClick={handlePlayClick}
                aria-label="Play track"
              >
                <Icon name={Icons.Play} size={28} />
              </Button>
            </Tooltip>
          )}
          {track.explicit && (
            <span className="absolute -bottom-1 -right-1 text-[9px] font-medium text-text-muted bg-surface px-0.5 rounded">E</span>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <p className="font-medium text-text-primary truncate">{track.title}</p>
          {showArtist && (
            <p className="text-text-secondary text-sm truncate mt-0.5">{track.artist.name}</p>
          )}
          {showAlbum && track.album && (
            <p className="text-text-muted text-xs truncate mt-0.5">{track.album.title}</p>
          )}
        </div>

        {showDuration && (
          <div className="flex items-center gap-2 text-text-secondary text-sm">
            <span className="w-16 text-right font-mono tabular-nums">{formatDuration(track.duration)}</span>
            <Tooltip content={`Plays: ${formatNumber(track.playCount)}`} position="top">
              <Icon name={Icons.Clock} size={14} className="opacity-60" />
            </Tooltip>
          </div>
        )}

        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Tooltip content="Add to queue" position="top">
            <Button variant="icon" size="sm" onClick={(e) => { e.stopPropagation(); onAddToQueue?.(track) }} aria-label="Add to queue">
              <Icon name={Icons.Plus} size={16} />
            </Button>
          </Tooltip>
          <Tooltip content={track.isLiked ? 'Remove from liked' : 'Add to liked'} position="top">
            <Button
              variant="icon"
              size="sm"
              onClick={(e) => { e.stopPropagation(); onToggleLike?.(track) }}
              aria-label={track.isLiked ? 'Remove from liked' : 'Add to liked'}
              className={cn(track.isLiked && 'text-primary')}
            >
              <Icon name={track.isLiked ? Icons.Heart : Icons.HeartOff} size={16} />
            </Button>
          </Tooltip>
          <Tooltip content="More options" position="top">
            <Button variant="icon" size="sm" onClick={handleMenuClick} aria-label="More options">
              <Icon name={Icons.MoreVertical} size={16} />
            </Button>
          </Tooltip>
        </div>

        {showIndex && index !== undefined && (
          <div className="absolute -left-8 top-1/2 -translate-y-1/2 w-6 text-center text-text-muted text-sm font-mono tabular-nums">
            {index + 1}
          </div>
        )}
      </Card>
    )
  }
)

TrackCard.displayName = 'TrackCard'