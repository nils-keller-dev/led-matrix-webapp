import { render } from '@testing-library/preact'
import { describe, expect, test } from 'vitest'
import { Skeleton } from '../../src/components/Skeleton'

describe('Skeleton', () => {
  test('renders with className props', () => {
    const { container } = render(<Skeleton className="className1 className2" />)

    expect(container.firstElementChild?.classList).toContain('className1')
    expect(container.firstElementChild?.classList).toContain('className2')
  })
})
