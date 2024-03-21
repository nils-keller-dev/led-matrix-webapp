import { useSignal } from '@preact/signals'
import { useRef } from 'preact/hooks'

interface SliderProps {
  min: number
  max: number
  initialValue?: number
  onChange?: (value: number) => void
}

export function Slider({ min, max, initialValue = 0, onChange }: SliderProps) {
  const value = useSignal(initialValue)
  const sliderRef = useRef<HTMLSpanElement>(null)
  const lastReportedValue = useRef(initialValue)

  const handleDrag = (e: MouseEvent | TouchEvent) => {
    if (!sliderRef.current) return

    const rect = sliderRef.current.getBoundingClientRect()
    const x =
      (e instanceof MouseEvent ? e.clientX : e.touches[0].clientX) - rect.left
    const newValue = Math.round(
      Math.min(max, Math.max(min, (x / rect.width) * (max - min) + min))
    )

    value.value = newValue
  }

  const startDrag = (e: MouseEvent | TouchEvent) => {
    e.preventDefault()
    e.stopPropagation()

    handleDrag(e)
    addEventListener('mousemove', handleDrag)
    addEventListener('touchmove', handleDrag)
    addEventListener('mouseup', stopDrag)
    addEventListener('touchend', stopDrag)
  }

  const stopDrag = () => {
    removeEventListener('mousemove', handleDrag)
    removeEventListener('touchmove', handleDrag)
    removeEventListener('mouseup', stopDrag)
    removeEventListener('touchend', stopDrag)

    if (value.value !== lastReportedValue.current && onChange) {
      onChange(value.value)
      lastReportedValue.current = value.value
    }
  }

  const percent = ((value.value - min) / (max - min)) * 100
  const dynamicOffset = -20 * (percent / 100) + 10

  return (
    <span
      ref={sliderRef}
      className="relative flex items-center w-full"
      onMouseDown={startDrag}
      onTouchStart={startDrag}
    >
      <span className="relative h-2 w-full overflow-hidden rounded-full bg-secondary">
        <span
          className="absolute h-full bg-primary"
          style={{ width: `${percent}%` }}
        />
      </span>
      <span
        style={{
          left: `calc(${percent}% + ${dynamicOffset}px)`
        }}
        className="absolute -translate-x-1/2"
      >
        <span className="block h-5 w-5 rounded-full border-2 border-primary bg-background" />
      </span>
    </span>
  )
}
