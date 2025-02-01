import { JSX } from 'preact/jsx-runtime'

type InputWrapperProps = {
  children: JSX.Element
  title: string
  htmlFor?: string
}

export function InputWrapper({ title, children, htmlFor }: InputWrapperProps) {
  return (
    <div className="flex border border-secondary rounded-md items-center justify-between py-3 px-4 relative">
      <label className="size-full absolute left-0" htmlFor={htmlFor} />
      <span className="text-muted-foreground">{title}</span>
      {children}
    </div>
  )
}
