import { cn } from '../../utils/cn'
import { Button } from '../ui/Button'
import { Icon, Icons } from '../ui/Icon'
import { Tooltip } from '../ui/Tooltip'
import { type KeyboardEvent } from 'react'

interface SidebarProps {
  isCollapsed: boolean
  onToggleCollapse: () => void
  activeTab: string
  onTabChange: (tab: string) => void
  playlists: Array<{ id: string; title: string; artworkUrl: string }>
}

const navItems = [
  { id: 'home', label: 'Home', icon: Icons.Home },
  { id: 'explore', label: 'Explore', icon: Icons.Compass },
  { id: 'library', label: 'Library', icon: Icons.Library },
] as const

const libraryItems = [
  { id: 'playlists', label: 'Playlists', icon: Icons.ListMusic },
  { id: 'artists', label: 'Artists', icon: Icons.User },
  { id: 'albums', label: 'Albums', icon: Icons.Music },
  { id: 'songs', label: 'Songs', icon: Icons.Music },
  { id: 'liked', label: 'Liked Music', icon: Icons.Heart },
] as const

export function Sidebar({
  isCollapsed,
  onToggleCollapse,
  activeTab,
  onTabChange,
  playlists = [],
}: SidebarProps) {
  const handleKeyDown = (e: KeyboardEvent, itemId: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onTabChange(itemId)
    }
  }

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-[var(--z-sidebar)] h-full bg-sidebar-bg border-r border-border transition-all duration-300 ease-out flex flex-col',
        isCollapsed ? 'w-[var(--spacing-sidebar-collapsed)]' : 'w-[var(--spacing-sidebar-width)]'
      )}
      aria-label="Main navigation"
    >
      {/* Logo & Collapse Button */}
      <div className={cn('flex items-center justify-between h-[var(--spacing-topbar-height)] px-3 border-b border-border', isCollapsed && 'justify-center')}>
        {!isCollapsed && (
          <Button
            variant="ghost"
            size="sm"
            className="flex-1 justify-start gap-2 text-text-primary hover:bg-transparent"
            onClick={() => onTabChange('home')}
            aria-label="Music App Home"
          >
            <Icon name={Icons.Music} size={24} className="text-primary" />
            <span className="font-bold text-lg tracking-tight">MusicApp</span>
          </Button>
        )}
        <Tooltip content={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'} position={isCollapsed ? 'right' : 'top'}>
          <Button
            variant="icon"
            size="sm"
            onClick={onToggleCollapse}
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            className={cn('flex-shrink-0', isCollapsed && 'ml-auto')}
          >
            <Icon name={isCollapsed ? Icons.ChevronRight : Icons.ChevronLeft} size={20} />
          </Button>
        </Tooltip>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-1" aria-label="Main navigation">
        {navItems.map((item) => (
          <Tooltip
            key={item.id}
            content={isCollapsed ? item.label : ''}
            position="right"
            delay={300}
          >
            <Button
              variant="ghost"
              size="md"
              className={cn(
                'w-full justify-start gap-3 rounded-lg',
                activeTab === item.id
                  ? 'bg-sidebar-active text-bg font-medium'
                  : 'text-text-secondary hover:bg-sidebar-hover hover:text-text-primary'
              )}
              onClick={() => onTabChange(item.id)}
              onKeyDown={(e) => handleKeyDown(e, item.id)}
              aria-current={activeTab === item.id ? 'page' : undefined}
              tabIndex={0}
              role={activeTab === item.id ? 'link' : 'button'}
            >
              <Icon name={item.icon} size={24} />
              {!isCollapsed && <span className="truncate">{item.label}</span>}
            </Button>
          </Tooltip>
        ))}

        {/* Library Section */}
        {!isCollapsed && (
          <div className="pt-4 pb-2 px-3 border-t border-border">
            <h4 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">Your Library</h4>
            {libraryItems.map((item) => (
              <Tooltip key={item.id} content="" position="right">
                <Button
                  variant="ghost"
                  size="md"
                  className={cn(
                    'w-full justify-start gap-3 rounded-lg',
                    activeTab === item.id
                      ? 'bg-sidebar-active text-bg font-medium'
                      : 'text-text-secondary hover:bg-sidebar-hover hover:text-text-primary'
                  )}
                  onClick={() => onTabChange(item.id)}
                  onKeyDown={(e) => handleKeyDown(e, item.id)}
                  aria-current={activeTab === item.id ? 'page' : undefined}
                >
                  <Icon name={item.icon} size={24} />
                  <span className="truncate">{item.label}</span>
                </Button>
              </Tooltip>
            ))}
          </div>
        )}

        {/* Playlists Section */}
        {!isCollapsed && playlists.length > 0 && (
          <div className="pt-4 pb-2 px-3 border-t border-border">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-semibold text-text-muted uppercase tracking-wider">Playlists</h4>
              <Tooltip content="Create playlist" position="top">
                <Button variant="icon" size="sm" onClick={() => onTabChange('create-playlist')} aria-label="Create playlist">
                  <Icon name={Icons.Plus} size={16} />
                </Button>
              </Tooltip>
            </div>
            <div className="space-y-1 max-h-48 overflow-y-auto">
              {playlists.slice(0, 10).map((playlist) => (
                <Tooltip key={playlist.id} content="" position="right">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start gap-2 rounded-lg text-text-secondary hover:bg-sidebar-hover hover:text-text-primary"
                    onClick={() => onTabChange(`playlist-${playlist.id}`)}
                    aria-label={playlist.title}
                  >
                    <img
                      src={playlist.artworkUrl}
                      alt=""
                      className="w-8 h-8 rounded-[var(--radius-image)] object-cover"
                    />
                    <span className="truncate text-sm">{playlist.title}</span>
                  </Button>
                </Tooltip>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Bottom: User Profile */}
      <div className={cn('p-3 border-t border-border', isCollapsed && 'flex justify-center')}>
        {!isCollapsed ? (
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start gap-3 rounded-lg text-text-secondary hover:bg-sidebar-hover hover:text-text-primary"
            onClick={() => onTabChange('settings')}
          >
            <Icon name={Icons.User} size={20} />
            <div className="flex-1 flex flex-col items-start min-w-0">
              <span className="font-medium text-text-primary truncate">Your Name</span>
              <span className="text-xs text-text-muted truncate">Premium</span>
            </div>
            <Icon name={Icons.ChevronDown} size={16} />
          </Button>
        ) : (
          <Tooltip content="Account" position="right">
            <Button
              variant="icon"
              size="md"
              onClick={() => onTabChange('settings')}
              aria-label="Account settings"
            >
              <Icon name={Icons.User} size={24} />
            </Button>
          </Tooltip>
        )}
      </div>
    </aside>
  )
}