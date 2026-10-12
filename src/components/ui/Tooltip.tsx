import { cn } from '../../utils/cn'
import { forwardRef, type HTMLAttributes, useState, useRef, useCallback, useEffect, type ReactElement, cloneElement, isValidElement } from 'react'
import { createPortal } from 'react-dom'

interface TooltipProps extends HTMLAttributes<HTMLDivElement> {
  content: string
  position?: 'top' | 'bottom' | 'left' | 'right'
  delay?: number
  children: ReactElement
}

export const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
  ({ content, position = 'top', delay = 200, children, className, ...props }, ref) => {
    const [isVisible, setIsVisible] = useState(false)
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
    const childRef = useRef<HTMLElement>(null)

    const showTooltip = useCallback(() => {
      timeoutRef.current = setTimeout(() => setIsVisible(true), delay)
    }, [delay])

    const hideTooltip = useCallback(() => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      setIsVisible(false)
    }, [])

    useEffect(() => {
      return () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current)
      }
    }, [])

    const positions = {
      top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
      bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
      left: 'right-full top-1/2 -translate-y-1/2 mr-2',
      right: 'left-full top-1/2 -translate-y-1/2 ml-2',
    }

    const arrows = {
      top: 'border-t-primary',
      bottom: 'border-b-primary',
      left: 'border-l-primary',
      right: 'border-r-primary',
    }

    const arrowPositions = {
      top: 'bottom-[-4px] left-1/2 -translate-x-1/2',
      bottom: 'top-[-4px] left-1/2 -translate-x-1/2',
      left: 'right-[-4px] top-1/2 -translate-y-1/2',
      right: 'left-[-4px] top-1/2 -translate-y-1/2',
    }

    // Clone the child to add event handlers
    const childWithHandlers = isValidElement(children)
      ? cloneElement(children as ReactElement<any>, {
          ref: childRef,
          onMouseEnter: showTooltip,
          onMouseLeave: hideTooltip,
          onFocus: showTooltip,
          onBlur: hideTooltip,
          ...(children.props as Record<string, unknown>),
        } as any)
      : null

    const tooltip = isVisible && childRef.current && (
      createPortal(
        <div
          className={cn(
            'fixed z-[var(--z-tooltip)] px-2 py-1 text-xs text-text-primary bg-primary rounded',
            'whitespace-nowrap pointer-events-none animate-fade-in',
            positions[position]
          )}
          style={{ transformOrigin: position === 'top' || position === 'bottom' ? 'center bottom' : 'center center' }}
          role="tooltip"
          id={props.id}
        >
          {content}
          <div
            className={cn(
              'absolute w-0 h-0 border-2 border-transparent',
              arrows[position],
              arrowPositions[position]
            )}
          />
        </div>,
        document.body
      )
    )

    return (
      <div ref={ref} className={cn('relative inline-block', className)} {...props}>
        {childWithHandlers}
        {tooltip}
      </div>
    )
  }
)

Tooltip.displayName = 'Tooltip'