import { useSignal } from '@preact/signals'
import { SunMoon } from 'lucide-preact'

export function Header() {
  const theme = useSignal(0)

  // TODO fix color and images when inverted (or remove themes entirely)
  const toggleTheme = () => {
    theme.value = theme.value === 0 ? 1 : 0
  }

  return (
    <header className="border-b border-b-secondary flex items-center justify-between px-4">
      <a href="/data" className="text-secondary w-14">
        v1.0.0
      </a>
      <img src="/logo.svg" alt="logo" className="size-14" />
      <div className="relative ml-8 text-muted-foreground">
        <div
          className="absolute top-1/2 left-1/2 transition-all ease-in -translate-x-1/2 -translate-y-1/2 rounded-full backdrop-invert z-40 pointer-events-none aspect-square w-[1px] invisible"
          style={
            theme.value ? { width: '212vh', visibility: 'visible' } : undefined
          }
        />
        <SunMoon onClick={toggleTheme} className="z-50 float-right" />
      </div>
    </header>
  )
}
