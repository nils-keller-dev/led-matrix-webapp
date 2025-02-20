import { fireEvent, render } from '@testing-library/preact'
import { describe, expect, test, vi } from 'vitest'
import { Switch } from '../../src/components/Switch'

describe('Switch', () => {
  test.each([true, false])(
    'renders correctly with initialValue = %s',
    (initialValue) => {
      const { getByPlaceholderText } = render(
        <Switch initialValue={initialValue} onChange={() => {}} />
      )

      const checkbox = getByPlaceholderText('Text') as HTMLInputElement
      expect(checkbox.checked).toBe(initialValue)
    }
  )

  test.each`
    initialValue | classWrapper      | classChild
    ${true}      | ${'bg-primary'}   | ${'translate-x-full'}
    ${false}     | ${'bg-secondary'} | ${'translate-x-0'}
  `(
    'renders with correct classes for $initialValue value',
    ({ initialValue, classWrapper, classChild }) => {
      const { container } = render(
        <Switch initialValue={initialValue} onChange={() => {}} />
      )

      const switchElement = container.querySelector('label')?.firstElementChild
      expect(switchElement?.classList).toContain(classWrapper)
      expect(switchElement?.firstElementChild?.classList).toContain(classChild)
    }
  )

  test('renders with custom id prop', () => {
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

  test('calls onChange and updates value', () => {
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
