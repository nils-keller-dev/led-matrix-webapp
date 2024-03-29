type InputWrapperProps = {
  children: JSX.Element
  title: string
  htmlFor?: string
}

export function InputWrapper({ title, children, htmlFor }: InputWrapperProps) {
  return (
    <div className="flex border border-secondary rounded-md items-center justify-between p-3 pl-4">
      <label className="text-muted-foreground" htmlFor={htmlFor}>
        {title}
      </label>
      {children}
    </div>
  )
}
