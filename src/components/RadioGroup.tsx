import React from 'preact/compat'

type RadioGroupProps = {
  icons: Array<React.ComponentType>
  values: Array<string>
  selected: string
  onChange: (value: string) => void
}

export function RadioGroup({
  icons,
  values,
  selected,
  onChange
}: RadioGroupProps) {
  return (
    <div className="flex gap-2">
      {values.map((value, index) => (
        <>
          <label
            key={value}
            className="size-10 flex justify-center items-center rounded-md has-[:checked]:bg-secondary"
            htmlFor={value}
          >
            <input
              type="radio"
              className="hidden peer"
              checked={selected == value}
              name="align"
              id={value}
              onChange={() => onChange(value)}
            />
            {React.createElement(icons[index], {})}
          </label>
        </>
      ))}
    </div>
  )
}
