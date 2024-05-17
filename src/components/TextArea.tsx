import { useSignal } from '@preact/signals'

type TextAreaProps = {
  placeholder?: string
  initialValue: string
  onChange: (value: string) => void
}

export function TextArea({
  placeholder,
  initialValue,
  onChange
}: TextAreaProps) {
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
      placeholder={placeholder}
      className="bg-background text-primary w-full max-h-[130px] border border-secondary rounded-md outline-none py-3 px-4 overflow-auto empty:before:content-[attr(placeholder)] before:text-muted-foreground"
      onBlur={handleChange}
      onKeyDown={onKeyDown}
    >
      {value}
    </p>
  )
}
