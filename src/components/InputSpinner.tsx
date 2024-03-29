import { useSignal } from '@preact/signals'
import debounceFunction from 'debounce-fn'
import { Minus, Plus } from 'lucide-preact'
import { useCallback, useEffect } from 'preact/hooks'
import { IconButton } from './IconButton'

type InputSpinnerProps = {
  numberSteps: number
  initialValue: number
  onChange?: (textSpeed: number) => void
}

export function InputSpinner({
  numberSteps,
  initialValue,
  onChange
}: InputSpinnerProps) {
  const selectedIndex = useSignal(initialValue)

  const increase = () => {
    if (selectedIndex.value < numberSteps - 1) {
      selectedIndex.value++
    }
  }

  const decrease = () => {
    if (selectedIndex.value > 0) {
      selectedIndex.value--
    }
  }

  const debouncedOnChange = useCallback(
    debounceFunction(
      () => {
        onChange?.(selectedIndex.value)
      },
      { wait: 500 }
    ),
    []
  )

  useEffect(() => {
    debouncedOnChange()
  }, [selectedIndex.value])

  return (
    <div className="flex gap-2">
      <IconButton onClick={decrease}>
        <Minus />
      </IconButton>
      <div className="flex items-center gap-1">
        {Array.from({ length: numberSteps }).map((_, index) => (
          <div
            key={index}
            className={`size-2 rounded-full ${
              index > selectedIndex.value
                ? 'bg-secondary'
                : 'bg-muted-foreground'
            }`}
            style={{
              height: `${index * 4 + 8}px`
            }}
          />
        ))}
      </div>
      <IconButton onClick={increase}>
        <Plus />
      </IconButton>
    </div>
  )
}
