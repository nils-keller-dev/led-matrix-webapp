export function Skeleton({
  className = ''
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`animate-pulse rounded-md bg-secondary ${className}`} />
  )
}
