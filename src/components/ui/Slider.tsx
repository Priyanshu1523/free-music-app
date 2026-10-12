import { cn } from '../../utils/cn'
import { forwardRef, useState, useCallback, useRef, useEffect } from 'react'

interface SliderProps {
  value?: number
  min?: number
  max?: number
  step?: number
  showTooltip?: boolean
  tooltipFormatter?: (value: number) => string
  className?: string
  onChange?: (value: number) => void
  onChangeEnd?: (value: number) => void
  disabled?: boolean
  'aria-label'?: string
}

export const Slider = forwardRef<HTMLInputElement, SliderProps>(
  (
    {
      value = 0,
      min = 0,
      max = 100,
      step = 1,
      showTooltip = false,
      tooltipFormatter,
      className,
      onChange,
      onChangeEnd,
      disabled,
      'aria-label': ariaLabel,
    },
    ref
  ) => {
    const [isDragging, setIsDragging] = useState(false)
    const [tooltipValue, setTooltipValue] = useState(value)
    const thumbRef = useRef<HTMLSpanElement>(null)

    const percentage = ((value - min) / (max - min)) * 100

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = Number(e.target.value)
        setTooltipValue(newValue)
        onChange?.(newValue)
      },
      [onChange]
    )

    const handleMouseDown = useCallback(() => {
      setIsDragging(true)
    }, [])

    const handleMouseUp = useCallback(() => {
      setIsDragging(false)
      onChangeEnd?.(value)
    }, [onChangeEnd, value])

    useEffect(() => {
      setTooltipValue(value)
    }, [value])

    return (
      <div className={cn('relative w-full', className)}>
        <div className="relative h-2" onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} onTouchStart={handleMouseDown} onTouchEnd={handleMouseUp}>
          <div className="absolute inset-0 bg-border rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-100"
              style={{ width: `${percentage}%` }}
            />
          </div>
          <input
            ref={ref}
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={handleChange}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onTouchStart={handleMouseDown}
            onTouchEnd={handleMouseUp}
            disabled={disabled}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            aria-label={ariaLabel}
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuenow={value}
          />
          <span
            ref={thumbRef}
            className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg border-2 border-primary transform transition-transform duration-100 pointer-events-none"
            style={{ left: `calc(${percentage}% - 8px)` }}
            aria-hidden="true"
          />
        </div>
        {showTooltip && isDragging && (
          <div
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-surface-elevated text-xs text-text-primary rounded border border-border whitespace-nowrap pointer-events-none animate-fade-in"
            style={{ left: `${percentage}%` }}
          >
            {tooltipFormatter ? tooltipFormatter(tooltipValue) : tooltipValue}
          </div>
        )}
      </div>
    )
  }
)

Slider.displayName = 'Slider'