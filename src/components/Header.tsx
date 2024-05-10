import packageJson from '../../package.json'

export function Header() {
  return (
    <header className="border-b border-b-secondary flex items-center justify-between pr-4">
      <div className="flex items-center text-muted-foreground gap-1">
        <img src="/logo.svg" alt="logo" className="size-14" />
        <span>led-matrix-webapp</span>
      </div>
      <a href="/data" className="text-secondary">
        v{packageJson.version}
      </a>
    </header>
  )
}
