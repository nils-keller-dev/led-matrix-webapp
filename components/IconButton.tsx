import { JSX } from "preact";

export function IconButton(props: JSX.HTMLAttributes<HTMLButtonElement>) {
  const { children, ...buttonProps } = props;

  return (
    <button
      {...buttonProps}
      class="size-9 rounded-full border border-secondary bg-background text-muted-foreground flex items-center justify-center transition-colors active:bg-secondary disabled:pointer-events-none disabled:opacity-50"
    >
      {children}
    </button>
  );
}
