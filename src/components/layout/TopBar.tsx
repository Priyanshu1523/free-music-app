import { cn } from '../../utils/cn'
import { Button } from '../ui/Button'
import { Icon, Icons } from '../ui/Icon'
import { Tooltip } from '../ui/Tooltip'
import { forwardRef, useState, type FormEvent, type ChangeEvent } from 'react'

interface TopBarProps {
  onSearch: (query: string) => void
  searchPlaceholder?: string
}

export const TopBar = forwardRef<HTMLDivElement, TopBarProps>(
  ({ onSearch, searchPlaceholder = 'Search for songs, artists, albums...' }, ref) => {
    const [searchQuery, setSearchQuery] = useState('')

    const handleSubmit = (e: FormEvent) => {
      e.preventDefault()
      onSearch(searchQuery.trim())
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value)
    }

    return (
      <header
        ref={ref}
        className={cn(
          'fixed top-0 left-0 right-0 z-[var(--z-topbar)] h-[var(--spacing-topbar-height)]',
          'bg-bg/80 backdrop-blur-md border-b border-border flex items-center justify-between px-4',
          'transition-all duration-200'
        )}
        role="banner"
      >
        {/* Left: Search */}
        <div className="flex-1 max-w-2xl mx-4">
          <form onSubmit={handleSubmit} className="relative" role="search">
            <Tooltip content="Search" position="bottom">
              <Button
                type="submit"
                variant="icon"
                size="sm"
                className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary transition-colors"
                aria-label="Search"
              >
                <Icon name={Icons.Search} size={20} />
              </Button>
            </Tooltip>
            <input
              type="search"
              value={searchQuery}
              onChange={handleChange}
              placeholder={searchPlaceholder}
              className={cn(
                'w-full bg-surface-elevated border border-border rounded-full',
                'pl-10 pr-10 py-2.5 text-text-primary placeholder-text-muted',
                'focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent',
                'transition-all duration-200',
                'text-sm'
              )}
              aria-label="Search"
              autoComplete="off"
            />
            {searchQuery && (
              <Tooltip content="Clear search" position="bottom">
                <Button
                  type="button"
                  variant="icon"
                  size="sm"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary transition-colors"
                  onClick={() => {
                    setSearchQuery('')
                    onSearch('')
                  }}
                  aria-label="Clear search"
                >
                  <Icon name={Icons.X} size={18} />
                </Button>
              </Tooltip>
            )}
          </form>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-1">
          <Tooltip content="Create" position="bottom">
            <Button variant="icon" size="md" onClick={() => {}} aria-label="Create">
              <Icon name={Icons.Plus} size={22} />
            </Button>
          </Tooltip>

          <Tooltip content="Notifications" position="bottom">
            <Button variant="icon" size="md" onClick={() => {}} aria-label="Notifications">
              <Icon name={Icons.Bell} size={22} />
            </Button>
          </Tooltip>

          <Tooltip content="Settings" position="bottom">
            <Button variant="icon" size="md" onClick={() => {}} aria-label="Settings">
              <Icon name={Icons.Settings} size={22} />
            </Button>
          </Tooltip>

          <Tooltip content="Account" position="bottom">
            <Button variant="icon" size="md" onClick={() => {}} aria-label="Account">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center overflow-hidden">
                <Icon name={Icons.User} size={20} className="text-white" />
              </div>
            </Button>
          </Tooltip>
        </div>
      </header>
    )
  }
)

TopBar.displayName = 'TopBar'