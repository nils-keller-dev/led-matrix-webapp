import { useSignal } from '@preact/signals'
import debounceFunction from 'debounce-fn'
import { useCallback, useEffect, useRef } from 'preact/hooks'
import { Skeleton } from './Skeleton'

type ColorInputProps = {
  initialValue: string
  onChange?: (color: string) => void
}

export function ColorInput({ initialValue, onChange }: ColorInputProps) {
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
    <div className="w-full py-3 rounded-md border border-secondary bg-background flex items-center relative">
      <label htmlFor="picker" className="size-full absolute" />
      <div
        className="size-6 rounded-md border border-secondary ml-4"
        style={{ backgroundColor: displayColor.value }}
      />
      <input
        id="picker"
        aria-label="color picker"
        ref={colorInput}
        type="color"
        value={colorValue.value}
        className="opacity-0 size-0"
        onChange={onColorChange}
      />
      {colorName.value ? null : (
        <Skeleton className="w-[100px] h-[20px] ml-3" />
      )}
      <span className="ml-3 text-primary">{colorName.value}</span>
    </div>
  )
}
