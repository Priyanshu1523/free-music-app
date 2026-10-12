import { cn } from '../../utils/cn'
import { TrackCard } from '../library/TrackCard'
import { AlbumCard } from '../library/AlbumCard'
import { ArtistCard } from '../library/ArtistCard'
import { Button } from '../ui/Button'
import { Icon, Icons } from '../ui/Icon'
import { Tooltip } from '../ui/Tooltip'
import { mockTracks, mockAlbums, mockArtists, mockPlaylists, featuredContent } from '../../data/mockData'
import { formatDuration } from '../../utils/formatters'
import { useState } from 'react'

interface MainContentProps {
  activeTab: string
}

export function MainContent({ activeTab }: MainContentProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <HomeContent />
      case 'explore':
        return <ExploreContent />
      case 'library':
      case 'playlists':
      case 'artists':
      case 'albums':
      case 'songs':
      case 'liked':
        return <LibraryContent tab={activeTab} viewMode={viewMode} onViewModeChange={setViewMode} />
      default:
        return (
          <div className="flex items-center justify-center h-64 text-text-muted">
            <p>Select a tab to view content</p>
          </div>
        )
    }
  }

  return (
    <main
      className={cn(
        'pt-[calc(var(--spacing-topbar-height)+1rem)] pb-[calc(var(--spacing-player-height)+1rem)]',
        'min-h-screen overflow-y-auto'
      )}
      role="main"
    >
      <div className="max-w-7xl mx-auto px-4">
        {renderContent()}
      </div>
    </main>
  )
}

function HomeContent() {
  return (
    <div className="space-y-8 animate-slide-up">
      {/* Welcome Section */}
      <section aria-labelledby="welcome-heading">
        <div className="flex items-center justify-between mb-4">
          <h2 id="welcome-heading" className="text-2xl font-bold text-text-primary">Good evening</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {featuredContent.madeForYou.map((mix) => (
            <article key={mix.id} className="group">
              <div className="relative aspect-square mb-2 rounded-[var(--radius-image)] overflow-hidden">
                <img
                  src={mix.artworkUrl}
                  alt=""
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Button variant="fab" size="sm" className="bg-white text-bg" aria-label={`Play ${mix.title}`}>
                    <Icon name={Icons.Play} size={24} />
                  </Button>
                </div>
              </div>
              <h3 className="font-medium text-text-primary truncate">{mix.title}</h3>
              <p className="text-text-secondary text-sm">{mix.trackCount} tracks</p>
            </article>
          ))}
        </div>
      </section>

      {/* Recently Played */}
      <section aria-labelledby="recently-played-heading">
        <div className="flex items-center justify-between mb-4">
          <h2 id="recently-played-heading" className="text-xl font-bold text-text-primary">Recently played</h2>
          <Button variant="ghost" size="sm">View all</Button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {featuredContent.recentlyPlayed.map((album) => (
            <AlbumCard key={album.id} album={album} />
          ))}
        </div>
      </section>

      {/* Recommended Albums */}
      <section aria-labelledby="recommended-albums-heading">
        <div className="flex items-center justify-between mb-4">
          <h2 id="recommended-albums-heading" className="text-xl font-bold text-text-primary">Recommended albums</h2>
          <Button variant="ghost" size="sm">View all</Button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {featuredContent.recommendedAlbums.map((album) => (
            <AlbumCard key={album.id} album={album} />
          ))}
        </div>
      </section>

      {/* Recommended Artists */}
      <section aria-labelledby="recommended-artists-heading">
        <div className="flex items-center justify-between mb-4">
          <h2 id="recommended-artists-heading" className="text-xl font-bold text-text-primary">Recommended artists</h2>
          <Button variant="ghost" size="sm">View all</Button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
          {featuredContent.recommendedArtists.map((artist) => (
            <ArtistCard key={artist.id} artist={artist} />
          ))}
        </div>
      </section>

      {/* Charts */}
      <section aria-labelledby="charts-heading">
        <div className="flex items-center justify-between mb-4">
          <h2 id="charts-heading" className="text-xl font-bold text-text-primary">Charts</h2>
          <Button variant="ghost" size="sm">View all</Button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {featuredContent.charts.map((chart) => (
            <article key={chart.id} className="group">
              <div className="relative aspect-square mb-2 rounded-[var(--radius-image)] overflow-hidden">
                <img
                  src={chart.artworkUrl}
                  alt=""
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Button variant="fab" size="sm" className="bg-white text-bg" aria-label={`Play ${chart.title}`}>
                    <Icon name={Icons.Play} size={24} />
                  </Button>
                </div>
              </div>
              <h3 className="font-medium text-text-primary truncate">{chart.title}</h3>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}

function ExploreContent() {
  return (
    <div className="space-y-8 animate-slide-up">
      <h1 className="text-3xl font-bold text-text-primary">Explore</h1>
      
      <section aria-labelledby="genres-heading">
        <h2 id="genres-heading" className="text-xl font-bold text-text-primary mb-4">Genres & Moods</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3">
          {[
            'Pop', 'Hip Hop', 'Rock', 'Electronic', 'R&B', 'Country',
            'Jazz', 'Classical', 'Reggae', 'Indie', 'Metal', 'Folk',
            'Latin', 'K-Pop', 'Afrobeats', 'Lo-Fi', 'Workout', 'Focus',
            'Sleep', 'Party', 'Chill', 'Road Trip', 'Summer', 'Winter'
          ].map((genre) => (
            <article key={genre} className="group">
              <div className="relative aspect-square rounded-[var(--radius-image)] overflow-hidden bg-gradient-to-br from-primary/20 to-primary/5">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-bold text-text-primary text-lg">{genre}</span>
                </div>
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Button variant="fab" size="sm" className="bg-white text-bg" aria-label={`Play ${genre} mix`}>
                    <Icon name={Icons.Play} size={24} />
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="charts-heading">
        <h2 id="charts-heading" className="text-xl font-bold text-text-primary mb-4">Top Charts</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {featuredContent.charts.map((chart) => (
            <article key={chart.id} className="group">
              <div className="relative aspect-square mb-2 rounded-[var(--radius-image)] overflow-hidden">
                <img
                  src={chart.artworkUrl}
                  alt=""
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Button variant="fab" size="sm" className="bg-white text-bg" aria-label={`Play ${chart.title}`}>
                    <Icon name={Icons.Play} size={24} />
                  </Button>
                </div>
              </div>
              <h3 className="font-medium text-text-primary truncate">{chart.title}</h3>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}

function LibraryContent({ tab, viewMode, onViewModeChange }: { tab: string; viewMode: 'grid' | 'list'; onViewModeChange: (mode: 'grid' | 'list') => void }) {
  const isListView = viewMode === 'list'

  const renderGrid = () => {
    switch (tab) {
      case 'playlists':
        return (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {mockPlaylists.map((playlist) => (
              <article key={playlist.id} className="group">
                <div className="relative aspect-square mb-2 rounded-[var(--radius-image)] overflow-hidden">
                  <img
                    src={playlist.artworkUrl}
                    alt=""
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button variant="fab" size="sm" className="bg-white text-bg" aria-label={`Play ${playlist.title}`}>
                      <Icon name={Icons.Play} size={24} />
                    </Button>
                  </div>
                </div>
                <h3 className="font-medium text-text-primary truncate">{playlist.title}</h3>
                <p className="text-text-secondary text-sm truncate">{playlist.owner.name}</p>
                <p className="text-text-muted text-xs">{playlist.trackCount} tracks, {formatDuration(playlist.duration)}</p>
              </article>
            ))}
          </div>
        )
      case 'artists':
        return (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
            {mockArtists.map((artist) => (
              <ArtistCard key={artist.id} artist={artist} />
            ))}
          </div>
        )
      case 'albums':
        return (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {mockAlbums.map((album) => (
              <AlbumCard key={album.id} album={album} />
            ))}
          </div>
        )
      case 'songs':
      case 'liked':
        return (
          <div className="space-y-2">
            {mockTracks.map((track, index) => (
              <TrackCard
                key={track.id}
                track={track}
                index={index}
                showIndex
                showArtist
                showAlbum
                showDuration
              />
            ))}
          </div>
        )
      default:
        return (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {mockAlbums.map((album) => (
              <AlbumCard key={album.id} album={album} />
            ))}
          </div>
        )
    }
  }

  const renderList = () => {
    if (tab !== 'songs' && tab !== 'liked') return renderGrid()

    return (
      <div className="space-y-1">
        {/* Header */}
        <div className="grid grid-cols-[auto_1fr_1fr_auto] gap-4 px-3 py-2 text-text-muted text-xs font-medium uppercase tracking-wider border-b border-border">
          <div className="w-6 text-center">#</div>
          <div>Title</div>
          <div className="hidden md:block">Album</div>
          <div className="w-20 text-right">Duration</div>
        </div>
        {/* Rows */}
        {mockTracks.map((track, index) => (
          <div
            key={track.id}
            className={cn(
              'grid grid-cols-[auto_1fr_1fr_auto] gap-4 px-3 py-2 items-center',
              'hover:bg-surface-hover rounded-lg transition-colors',
              'group'
            )}
          >
            <div className="flex items-center gap-3">
              <span className="text-text-muted text-sm font-mono tabular-nums w-6 text-center">
                {index + 1}
              </span>
              <img
                src={track.artworkUrl}
                alt=""
                className="w-10 h-10 rounded-[var(--radius-image)] object-cover flex-shrink-0"
              />
              <div className="min-w-0">
                <p className="font-medium text-text-primary truncate">{track.title}</p>
                <p className="text-text-secondary text-xs truncate">{track.artist.name}</p>
              </div>
            </div>
            <div className="hidden md:block truncate text-text-secondary text-sm">
              {track.album.title}
            </div>
            <div className="flex items-center justify-end gap-2">
              <span className="text-text-muted text-sm font-mono tabular-nums w-20 text-right">
                {formatDuration(track.duration)}
              </span>
              <Tooltip content="More options" position="top">
                <Button variant="icon" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity" aria-label="More options">
                  <Icon name={Icons.MoreVertical} size={16} />
                </Button>
              </Tooltip>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="animate-slide-up">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-text-primary capitalize">{tab}</h1>
          <p className="text-text-secondary mt-1">
            {tab === 'playlists' && `${mockPlaylists.length} playlists`}
            {tab === 'artists' && `${mockArtists.length} artists`}
            {tab === 'albums' && `${mockAlbums.length} albums`}
            {tab === 'songs' && `${mockTracks.length} songs`}
            {tab === 'liked' && `${mockTracks.filter(t => t.isLiked).length} liked songs`}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Tooltip content="Grid view" position="bottom">
            <Button
              variant="icon"
              size="sm"
              className={cn(viewMode === 'grid' ? 'text-primary' : 'text-text-secondary')}
              onClick={() => onViewModeChange('grid')}
              aria-label="Grid view"
              aria-pressed={viewMode === 'grid'}
            >
              <Icon name={Icons.Grid} size={20} />
            </Button>
          </Tooltip>
          <Tooltip content="List view" position="bottom">
            <Button
              variant="icon"
              size="sm"
              className={cn(viewMode === 'list' ? 'text-primary' : 'text-text-secondary')}
              onClick={() => onViewModeChange('list')}
              aria-label="List view"
              aria-pressed={viewMode === 'list'}
            >
              <Icon name={Icons.List} size={20} />
            </Button>
          </Tooltip>
        </div>
      </div>

      {isListView ? renderList() : renderGrid()}
    </div>
  )
}

// Need to add Grid and List icons