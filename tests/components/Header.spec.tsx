import { render } from '@testing-library/preact'
import { describe, expect, test, vi } from 'vitest'
import { Header } from '../../src/components/Header'

vi.mock('../../package.json', () => ({
  default: { version: '0.0.0' }
}))

describe('Header', () => {
  test('renders Header with version number', () => {
    const { container } = render(<Header />)
    expect(container.querySelector('a')?.textContent).toContain('v0.0.0')
  })
})
