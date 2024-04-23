type ButtonProps = {
  text: string
  isSecondary?: boolean
  onClick: () => void
}

export function Button({ text, isSecondary, onClick }: ButtonProps) {
  return (
    <button
      className={`outline-none border rounded-md  px-4 py-2 ${isSecondary ? 'border-muted-foreground' : 'bg-primary text-background'}`}
      onClick={onClick}
    >
      {text}
    </button>
  )
}
