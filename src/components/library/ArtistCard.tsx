import { cn } from '../../utils/cn'
import { Card } from '../ui/Card'
import { Button } from '../ui/Button'
import { Icon, Icons } from '../ui/Icon'
import { Tooltip } from '../ui/Tooltip'
import { formatNumber } from '../../utils/formatters'
import type { Artist } from '../../types/models'
import { forwardRef, useState, type MouseEvent } from 'react'

interface ArtistCardProps {
  artist: Artist
  onPlay?: (artist: Artist) => void
  onShuffle?: (artist: Artist) => void
  onSubscribe?: (artist: Artist) => void
  onMenu?: (artist: Artist) => void
  className?: string
}

export const ArtistCard = forwardRef<HTMLDivElement, ArtistCardProps>(
  (
    {
      artist,
      onPlay,
      onShuffle,
      onSubscribe,
      onMenu,
      className,
    },
    ref
  ) => {
    const [isHovered, setIsHovered] = useState(false)

    const handlePlayClick = (e: MouseEvent<HTMLElement>) => {
      e.stopPropagation()
      onPlay?.(artist)
    }

    const handleShuffleClick = (e: MouseEvent<HTMLElement>) => {
      e.stopPropagation()
      onShuffle?.(artist)
    }

    return (
      <Card
        ref={ref}
        variant="interactive"
        className={cn('group p-4 flex flex-col items-center text-center h-full', className)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handlePlayClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && handlePlayClick(e as any)}
      >
        <div className="relative w-32 h-32 mb-4 mx-auto">
          <img
            src={artist.avatarUrl}
            alt=""
            className="w-full h-full rounded-full object-cover border-2 border-transparent group-hover:border-primary transition-colors"
            loading="lazy"
          />
          {isHovered && (
            <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
              <Tooltip content="Play" position="top">
                <Button
                  variant="fab"
                  size="sm"
                  onClick={handlePlayClick}
                  aria-label={`Play ${artist.name}`}
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
                  aria-label={`Shuffle ${artist.name}`}
                >
                  <Icon name={Icons.Shuffle} size={20} />
                </Button>
              </Tooltip>
            </div>
          )}
          {artist.isVerified && (
            <Tooltip content="Verified artist" position="top">
              <span className="absolute bottom-1 right-1 flex items-center justify-center w-5 h-5 bg-primary text-white rounded-full">
                <Icon name={Icons.Check} size={12} />
              </span>
            </Tooltip>
          )}
        </div>

        <div className="w-full min-w-0">
          <h3 className="font-semibold text-text-primary truncate">{artist.name}</h3>
          <p className="text-text-secondary text-sm mt-1 flex items-center justify-center gap-1">
            {formatNumber(artist.subscriberCount)} subscribers
            {artist.isVerified && <Icon name={Icons.CheckCircle} size={12} className="text-primary" />}
          </p>
        </div>

        <div className="flex items-center justify-center gap-2 mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <Tooltip content={artist.isVerified ? 'Subscribed' : 'Subscribe'} position="top">
            <Button
              variant="icon"
              size="sm"
              onClick={(e) => { e.stopPropagation(); onSubscribe?.(artist) }}
              aria-label={artist.isVerified ? 'Subscribed' : 'Subscribe'}
              className={cn(artist.isVerified && 'text-primary')}
            >
              <Icon name={artist.isVerified ? Icons.Check : Icons.Plus} size={16} />
            </Button>
          </Tooltip>
          <Tooltip content="More options" position="top">
            <Button variant="icon" size="sm" onClick={(e) => { e.stopPropagation(); onMenu?.(artist) }} aria-label="More options">
              <Icon name={Icons.MoreVertical} size={16} />
            </Button>
          </Tooltip>
        </div>
      </Card>
    )
  }
)

ArtistCard.displayName = 'ArtistCard'

// Need to add CheckCircle to Icons
// Will add it in the Icon component later