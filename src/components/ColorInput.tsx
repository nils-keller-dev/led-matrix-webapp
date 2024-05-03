import { useSignal } from '@preact/signals'
import { useEffect, useRef, useCallback } from 'preact/hooks'
import debounceFunction from 'debounce-fn'

// function debounce(fn, wait) {
//   let timeout
//   return (...args) => {
//     clearTimeout(timeout)
//     timeout = setTimeout(() => fn.apply(this, args), wait)
//   }
// }

type ColorInputProps = {
  initialValue: string
  onChange?: (color: string) => void
}

export function ColorInput({ initialValue, onChange }: ColorInputProps) {
  const colorInput = useRef<HTMLInputElement>(null)

  const currentColor = useSignal(initialValue)
  const colorName = useSignal('')

  const onColorChange = () => {
    const color = colorInput.current?.value ?? ''
    if (!color || color === currentColor.value) return

    currentColor.value = color
    debouncedOnChange(currentColor.value)
  }

  const debouncedOnChange = useCallback(
    debounceFunction(
      (color: string) => {
        onChange?.(color)
      },
      { wait: 500 }
    ),
    []
  )

  useEffect(() => {
    colorInput.current?.addEventListener('change', onColorChange)
  }, [])

  useEffect(() => {
    fetch(
      `https://www.thecolorapi.com/id?hex=${currentColor.value.replace('#', '')}`
    )
      .then((response) => response.json())
      .then((data) => (colorName.value = data.name.value))
  }, [currentColor.value])

  return (
    <div className="w-full py-3 rounded-md border border-secondary bg-background flex items-center relative">
      <label htmlFor="picker" className="size-full absolute" />
      <div
        className="size-6 rounded-md border border-secondary ml-4"
        style={{ backgroundColor: currentColor.value }}
      />
      <input
        id="picker"
        aria-label="color picker"
        ref={colorInput}
        type="color"
        value={currentColor.value}
        className="opacity-0 size-0"
      />
      <span className="ml-3 text-primary">{colorName.value}</span>
    </div>
  )
}
