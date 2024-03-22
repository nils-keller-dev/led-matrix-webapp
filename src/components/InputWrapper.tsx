type InputWrapperProps = {
  children: JSX.Element
  title: string
}

export function InputWrapper({ title, children }: InputWrapperProps) {
  return (
    <div className="flex border border-secondary rounded-md items-center justify-between p-2 pl-4">
      <span className="text-muted-foreground">{title}</span>
      {children}
    </div>
  )
}
