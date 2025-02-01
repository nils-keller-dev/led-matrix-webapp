import { useSignal } from '@preact/signals'
import debounceFunction from 'debounce-fn'
import { useCallback, useEffect, useRef } from 'preact/hooks'
import { Skeleton } from './Skeleton'

type ColorInputProps = {
  initialValue: string
  id: string
  onChange?: (color: string) => void
}

export function ColorInput({ initialValue, id, onChange }: ColorInputProps) {
  const colorInput = useRef<HTMLInputElement>(null)

  const displayColor = useSignal(initialValue)
  const colorValue = useSignal(initialValue)
  const colorName = useSignal('')

  const onColorChange = () => {
    const color = colorInput.current?.value ?? ''
    if (!color || color === colorValue.value) return

    displayColor.value = color
    colorName.value = ''
    debouncedOnChange(color)
  }

  const debouncedOnChange = useCallback(
    debounceFunction(
      (color: string) => {
        colorValue.value = color
        onChange?.(color)
      },
      { wait: 500 }
    ),
    []
  )

  useEffect(() => {
    fetch(
      `https://www.thecolorapi.com/id?hex=${colorValue.value.replace('#', '')}`
    )
      .then((response) => response.json())
      .then((data) => (colorName.value = data.name.value))
  }, [colorValue.value])

  return (
    <div className="flex gap-3">
      <input
        id={id}
        aria-label="color picker"
        ref={colorInput}
        type="color"
        value={colorValue.value}
        className="opacity-0 size-0 absolute"
        onChange={onColorChange}
      />
      {colorName.value ? null : <Skeleton className="w-25 h-5" />}
      <span className="text-primary">{colorName.value}</span>
      <div
        className="size-6 rounded-md border border-secondary"
        style={{ backgroundColor: displayColor.value }}
      />
    </div>
  )
}
