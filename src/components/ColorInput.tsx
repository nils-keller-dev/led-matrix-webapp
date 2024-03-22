import { useSignal } from '@preact/signals'
import { useEffect, useRef } from 'preact/hooks'

type ColorInputProps = {
  initialValue: string
  onChange?: (color: string) => void
}

export function ColorInput({ initialValue, onChange }: ColorInputProps) {
  const colorInput = useRef<HTMLInputElement>(null)

  const currentColor = useSignal(initialValue)

  const onColorChange = () => {
    const color = colorInput.current?.value ?? ''
    if (!color || color === currentColor.value) return

    currentColor.value = color
    onChange?.(currentColor.value)
  }

  useEffect(() => {
    colorInput.current?.addEventListener('change', onColorChange)
  }, [])

  return (
    <div className="w-full h-10 rounded-md border border-secondary bg-background flex items-center relative">
      <label htmlFor="picker" className="size-full absolute" />
      <div
        className="size-5 rounded-md border border-secondary ml-4"
        style={{ backgroundColor: currentColor.value }}
      />
      <input
        id="picker"
        ref={colorInput}
        type="color"
        value={currentColor.value}
        className="opacity-0 w-0"
      />
      <span className="ml-3 uppercase text-primary">{currentColor.value}</span>
    </div>
  )
}
