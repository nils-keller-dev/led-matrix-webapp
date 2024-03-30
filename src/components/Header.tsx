import { useSignal } from '@preact/signals'
import { SunMoon } from 'lucide-preact'

export function Header() {
  const theme = useSignal(0)

  const toggleTheme = () => {
    theme.value = theme.value === 0 ? 1 : 0
  }

  return (
    <header className="border-b border-b-secondary flex items-center justify-between px-4">
      <span className="text-secondary">v1.0.0</span>
      <img src="/logo.svg" alt="logo" className="size-14" />
      <div className="relative">
        <div
          className="absolute top-1/2 left-1/2 transition-all ease-in -translate-x-1/2 -translate-y-1/2 rounded-full backdrop-invert z-40 h-1 w-0 pointer-events-none"
          style={theme.value ? { width: '212vh', height: '212vh' } : undefined}
        />
        <SunMoon onClick={toggleTheme} className="z-50" />
      </div>
    </header>
  )
}
