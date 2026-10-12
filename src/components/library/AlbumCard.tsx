import { cn } from '../../utils/cn'
import { Card } from '../ui/Card'
import { Button } from '../ui/Button'
import { Icon, Icons } from '../ui/Icon'
import { Tooltip } from '../ui/Tooltip'
import { formatNumber } from '../../utils/formatters'
import type { Album } from '../../types/models'
import { forwardRef, useState, type MouseEvent } from 'react'

interface AlbumCardProps {
  album: Album
  onPlay?: (album: Album) => void
  onShuffle?: (album: Album) => void
  onSave?: (album: Album) => void
  onMenu?: (album: Album) => void
  className?: string
}

export const AlbumCard = forwardRef<HTMLDivElement, AlbumCardProps>(
  (
    {
      album,
      onPlay,
      onShuffle,
      onSave,
      onMenu,
      className,
    },
    ref
  ) => {
    const [isHovered, setIsHovered] = useState(false)

    const handlePlayClick = (e: MouseEvent<HTMLElement>) => {
      e.stopPropagation()
      onPlay?.(album)
    }

    const handleShuffleClick = (e: MouseEvent<HTMLElement>) => {
      e.stopPropagation()
      onShuffle?.(album)
    }

    return (
      <Card
        ref={ref}
        variant="interactive"
        className={cn('group p-4 flex flex-col h-full', className)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handlePlayClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && handlePlayClick(e as any)}
      >
        <div className="relative aspect-square mb-4">
          <img
            src={album.artworkUrl}
            alt=""
            className="w-full h-full rounded-[var(--radius-image)] object-cover"
            loading="lazy"
          />
          {isHovered && (
            <div className="absolute inset-0 bg-black/50 rounded-[var(--radius-image)] flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
              <Tooltip content="Play" position="top">
                <Button
                  variant="fab"
                  size="sm"
                  onClick={handlePlayClick}
                  aria-label="Play album"
                  className="bg-primary text-white"
                >
                  <Icon name={Icons.Play} size={24} />
                </Button>
              </Tooltip>
              <Tooltip content="Shuffle" position="top">
                <Button
                  variant="icon"
                  size="md"
                  className="bg-white/10 text-white hover:bg-white/20"
                  onClick={handleShuffleClick}
                  aria-label="Shuffle album"
                >
                  <Icon name={Icons.Shuffle} size={20} />
                </Button>
              </Tooltip>
            </div>
          )}
          {album.type !== 'album' && (
            <span className="absolute bottom-2 left-2 text-xs font-medium text-text-primary bg-black/70 px-1.5 py-0.5 rounded uppercase tracking-wide">
              {album.type}
            </span>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-text-primary truncate">{album.title}</h3>
          <p className="text-text-secondary text-sm truncate mt-1">{album.artist.name}</p>
          <p className="text-text-muted text-xs mt-1">
            {formatNumber(album.trackCount)} tracks • {album.releaseDate.split('-')[0]}
          </p>
        </div>

        <div className="flex items-center gap-2 mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <Tooltip content="Save to library" position="top">
            <Button variant="icon" size="sm" onClick={(e) => { e.stopPropagation(); onSave?.(album) }} aria-label="Save to library">
              <Icon name={Icons.Plus} size={16} />
            </Button>
          </Tooltip>
          <Tooltip content="More options" position="top">
            <Button variant="icon" size="sm" onClick={(e) => { e.stopPropagation(); onMenu?.(album) }} aria-label="More options">
              <Icon name={Icons.MoreVertical} size={16} />
            </Button>
          </Tooltip>
        </div>
      </Card>
    )
  }
)

AlbumCard.displayName = 'AlbumCard'