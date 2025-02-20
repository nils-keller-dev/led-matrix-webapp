import { render } from '@testing-library/preact'
import { describe, expect, test, vi } from 'vitest'
import { IconButton } from '../../src/components/IconButton'

describe('IconButton', () => {
  test('renders with className props', () => {
    const { container } = render(
      <IconButton className="className1 className2" />
    )
    expect(container.firstElementChild?.classList).toContain('className1')
    expect(container.firstElementChild?.classList).toContain('className2')
  })

  test('works with generic props', () => {
    const onClick = vi.fn()

    const { container } = render(
      <IconButton aria-label="customAriaLabel" onClick={onClick} />
    )
    expect(container.firstElementChild?.getAttribute('aria-label')).toBe(
      'customAriaLabel'
    )
  })

  test('renders children', () => {
    const { getByText } = render(<IconButton>child content</IconButton>)
    expect(getByText('child content')).toBeDefined()
  })
})
