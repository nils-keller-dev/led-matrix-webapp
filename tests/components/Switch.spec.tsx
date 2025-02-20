import { fireEvent, render } from '@testing-library/preact'
import { describe, expect, test, vi } from 'vitest'
import { Switch } from '../../src/components/Switch'

describe('Switch', () => {
  test('renders with correct initialValue', async () => {
    const { container, getByPlaceholderText } = render(
      <Switch initialValue={true} onChange={() => {}} />
    )

    const checkbox = getByPlaceholderText('Text') as HTMLInputElement
    expect(checkbox.checked).toBe(true)

    const switchElement = container.querySelector('label')?.firstElementChild
    expect(switchElement?.classList).toContain('bg-primary')
    expect(switchElement?.firstElementChild?.classList).toContain(
      'translate-x-full'
    )
  })

  test('renders with custom id prop', async () => {
    const { container } = render(
      <Switch initialValue={false} onChange={() => {}} id="customId" />
    )

    expect(container.querySelector('label')?.getAttribute('for')).toBe(
      'customId'
    )
    expect(container.querySelector('input')?.getAttribute('id')).toBe(
      'customId'
    )
  })

  test('calls onChange and updates value', async () => {
    const onChange = vi.fn()
    const { getByPlaceholderText } = render(
      <Switch initialValue={false} onChange={onChange} />
    )

    const checkbox = getByPlaceholderText('Text') as HTMLInputElement
    fireEvent.click(checkbox)

    expect(onChange).toHaveBeenCalledWith(true)
    expect(checkbox.checked).toBe(true)
  })
})
