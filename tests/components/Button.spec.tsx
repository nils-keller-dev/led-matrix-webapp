import { fireEvent, render } from '@testing-library/preact'
import { describe, expect, test, vi } from 'vitest'
import { Button } from '../../src/components/Button'

describe('Button', () => {
  test('renders with text', () => {
    const { container } = render(
      <Button text="Button text" onClick={() => {}} />
    )
    expect(container.firstElementChild?.classList).toContain('bg-primary')
    expect(container.textContent).toContain('Button text')
  })

  test('applies correct secondary classes', () => {
    const { container } = render(
      <Button text="Button text" isSecondary onClick={() => {}} />
    )

    expect(container.firstElementChild?.classList).toContain(
      'border-muted-foreground'
    )
  })

  test('calls onClick when clicked', () => {
    const onClick = vi.fn()
    const { container } = render(
      <Button text="Button text" onClick={onClick} />
    )

    fireEvent.click(container.firstElementChild as Element)
    expect(onClick).toHaveBeenCalled()
  })
})
