import { JSX } from 'preact/jsx-runtime'

type InputWrapperProps = {
  children: JSX.Element
  title: string
  htmlFor?: string
}

export function InputWrapper({ title, children, htmlFor }: InputWrapperProps) {
  return (
    <div className="flex border border-secondary rounded-md items-center justify-between py-3 px-4">
      <label className="text-muted-foreground" htmlFor={htmlFor}>
        {title}
      </label>
      {children}
    </div>
  )
}
