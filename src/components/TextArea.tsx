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
    const target = event.target as HTMLTextAreaElement
    value.value = target.textContent || ''
    onChange(value.value)
  }

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      event.stopPropagation()
      ;(event.target as HTMLTextAreaElement).blur()
    }
  }

  return (
    <textarea
      placeholder={placeholder}
      enterkeyhint="send"
      className="bg-background text-primary resize-none w-full h-[130px] border border-secondary rounded-md outline-none py-3 px-4"
      onBlur={handleChange}
      onKeyDown={onKeyDown}
      onPointerMove={(event) => {
        event.stopPropagation()
      }}
    >
      {value}
    </textarea>
  )
}
