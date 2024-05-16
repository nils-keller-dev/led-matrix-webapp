import { useSignal } from '@preact/signals'

type TextAreaProps = {
  initialValue: string
  onChange: (value: string) => void
}

export function TextArea({ initialValue, onChange }: TextAreaProps) {
  const value = useSignal(initialValue)

  const handleChange = (event: Event) => {
    const target = event.target as HTMLParagraphElement
    value.value = target.textContent || ''
    onChange(value.value)
  }

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      event.stopPropagation()
      ;(event.target as HTMLParagraphElement).blur()
    }
  }

  return (
    <p
      contentEditable
      className="bg-background text-primary w-full max-h-[130px] h-fit border border-secondary rounded-md outline-none py-3 px-4 overflow-auto"
      onBlur={handleChange}
      onKeyDown={onKeyDown}
    >
      {value}
    </p>
  )
}
