import { useSignal } from '@preact/signals'

type SwitchProps = {
  initialValue: boolean
  id?: string
  onChange: (value: boolean) => void
}

export function Switch({
  initialValue,
  id = 'checkbox',
  onChange
}: SwitchProps) {
  const value = useSignal(initialValue)

  const handleChange = (event: Event) => {
    const target = event.target as HTMLInputElement
    value.value = target.checked
    onChange(value.value)
  }

  return (
    <div>
      <label htmlFor={id}>
        <div
          className={`w-11 h-6 rounded-full p-0.5 transition-colors ${
            value.value ? 'bg-primary' : 'bg-secondary'
          }`}
        >
          <div
            className={`size-5 bg-background rounded-full transition-transform ${
              value.value ? 'translate-x-full' : 'translate-x-0'
            }`}
          />
        </div>
      </label>
      <input
        id={id}
        className="hidden"
        onChange={handleChange}
        placeholder="Text"
        type="checkbox"
        checked={value.value}
      />
    </div>
  )
}
