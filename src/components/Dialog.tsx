import * as RadixDialog from '@radix-ui/react-dialog'

type DialogProps = {
  children: JSX.Element | false
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function Dialog({ children, open, onOpenChange }: DialogProps) {
  // TODO fix errors
  return (
    <RadixDialog.Root open={open} onOpenChange={onOpenChange}>
      <RadixDialog.Portal>
        <RadixDialog.Overlay className="backdrop-brightness-50 backdrop-blur-sm size-screen fixed top-0 z-30" />
        <RadixDialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10/12 bg-background p-4 rounded-xl outline-none z-40">
          {children}
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  )
}
