import { Drawer as Vaul } from 'vaul'

type DrawerProps = {
  children: JSX.Element | false
  isExpanded: boolean
  onChangeIsExpanded: (isExpanded: boolean) => void
}

export function Drawer({
  children,
  isExpanded,
  onChangeIsExpanded
}: DrawerProps) {
  return (
    <Vaul.Root open={isExpanded} onOpenChange={onChangeIsExpanded}>
      <Vaul.Portal>
        <Vaul.Overlay className="fixed inset-0 backdrop-blur-sm backdrop-brightness-50" />
        <Vaul.Content className="bg-background flex flex-col gap-7 p-7 pt-4 fixed w-full bottom-0 rounded-t-xl border border-secondary border-b-0 max-h-[85vh] outline-none">
          <div className="bg-secondary w-20 h-2 shrink-0 rounded-full mx-auto" />
          {children}
        </Vaul.Content>
      </Vaul.Portal>
    </Vaul.Root>
  )
}
