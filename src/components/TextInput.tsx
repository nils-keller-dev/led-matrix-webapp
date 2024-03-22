import { useSignal } from '@preact/signals'

type TextInputProps = {
  initialValue: string
  onChange: (value: string) => void
}

export function TextInput({ initialValue, onChange }: TextInputProps) {
  const value = useSignal(initialValue)

  const handleChange = (event: Event) => {
    const target = event.target as HTMLInputElement
    value.value = target.value
    onChange(value.value)
  }

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      event.stopPropagation()
      ;(event.target as HTMLInputElement).blur()
    }
  }

  return (
    <input
      className="bg-background text-primary size-full border border-secondary rounded-md p-4 focus:outline-none resize-none"
      value={value}
      onBlur={handleChange}
      onKeyDown={onKeyDown}
      placeholder="Text"
    />
  )
}
