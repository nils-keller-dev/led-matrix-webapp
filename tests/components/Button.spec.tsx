import { render } from '@testing-library/preact'
import { describe, expect, test, vi } from 'vitest'
import { Button } from '../../src/components/Button'

describe('Button', () => {
  test('renders button with text', () => {
    const { container } = render(
      <Button text="Button text" onClick={() => {}} />
    )
    expect(container.firstElementChild?.classList).toContain('bg-primary')
    expect(container.textContent).toContain('Button text')
  })

  test('renders secondary button', () => {
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
    container.firstElementChild?.dispatchEvent(new MouseEvent('click'))
    expect(onClick).toHaveBeenCalled()
  })
})
