import { render } from '@testing-library/preact'
import { describe, expect, test, vi } from 'vitest'
import { Header } from '../../src/components/Header'

vi.mock('../../package.json', () => ({
  default: { version: '0.0.0' }
}))

describe('Header', () => {
  test('renders with version number', () => {
    const { getByText } = render(<Header />)
    expect(getByText('v0.0.0')).toBeDefined()
  })
})
