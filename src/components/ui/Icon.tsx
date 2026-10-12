import { cn } from '../../utils/cn'
import * as LucideIcons from 'lucide-react'
import { type LucideProps } from 'lucide-react'
import { forwardRef, type ComponentType } from 'react'

export type IconName = keyof typeof LucideIcons

interface IconProps extends Omit<LucideProps, 'ref'> {
  name: IconName
  size?: number
  className?: string
  'aria-label'?: string
}

export const Icon = forwardRef<SVGSVGElement, IconProps>(
  ({ name, size = 20, className, 'aria-label': ariaLabel, ...props }, ref) => {
    const IconComponent = LucideIcons[name] as ComponentType<LucideProps> | undefined

    if (!IconComponent) {
      console.warn(`Icon "${name}" not found in lucide-react`)
      return null
    }

    return (
      <IconComponent
        ref={ref}
        size={size}
        className={cn('text-current', className)}
        aria-hidden={!ariaLabel}
        aria-label={ariaLabel}
        {...props}
      />
    )
  }
)

Icon.displayName = 'Icon'

// Commonly used icons as named exports for convenience
export const Icons = {
  // Navigation
  Home: 'Home',
  Compass: 'Compass',
  Library: 'LibraryBig',
  Heart: 'Heart',
  Plus: 'Plus',
  Search: 'Search',
  Menu: 'Menu',
  ChevronLeft: 'ChevronLeft',
  ChevronRight: 'ChevronRight',
  ChevronDown: 'ChevronDown',
  ChevronUp: 'ChevronUp',

  // Player
  Play: 'Play',
  Pause: 'Pause',
  SkipBack: 'SkipBack',
  SkipForward: 'SkipForward',
  Shuffle: 'Shuffle',
  Repeat: 'Repeat',
  Repeat1: 'Repeat1',
  Volume2: 'Volume2',
  VolumeX: 'VolumeX',
  Mic: 'Mic',
  ListMusic: 'ListMusic',

  // Actions
  MoreHorizontal: 'MoreHorizontal',
  MoreVertical: 'MoreVertical',
  HeartOff: 'HeartOff',
  Download: 'Download',
  Share2: 'Share2',
  Edit: 'Edit',
  Trash2: 'Trash2',
  Copy: 'Copy',
  Clock: 'Clock',
  Bell: 'Bell',
  User: 'User',
  Settings: 'Settings',
  LogOut: 'LogOut',

  // Media
  Music: 'Music',
  MusicVideo: 'Video',
  Film: 'Film',
  Image: 'Image',
  Tv: 'Tv',

  // Status
  Check: 'Check',
  CheckCircle: 'CheckCircle',
  X: 'X',
  XCircle: 'XCircle',
  AlertCircle: 'AlertCircle',
  Info: 'Info',

  // Layout
  Grid: 'Grid',
  List: 'List',
  LayoutGrid: 'LayoutGrid',
  LayoutList: 'LayoutList',
} as const satisfies Record<string, IconName>