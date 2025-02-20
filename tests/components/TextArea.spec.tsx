import { fireEvent, render } from '@testing-library/preact'
import { describe, expect, test, vi } from 'vitest'
import { TextArea } from '../../src/components/TextArea'

describe('TextArea', () => {
  test('renders with text', () => {
    const { container } = render(
      <TextArea initialValue="text value content" onChange={() => {}} />
    )

    expect(container.textContent).toContain('text value content')
  })

  test('renders with placeholder', () => {
    const { getByPlaceholderText } = render(
      <TextArea
        initialValue=""
        onChange={() => {}}
        placeholder="custom placeholder"
      />
    )

    expect(getByPlaceholderText('custom placeholder')).toBeDefined()
  })

  test('calls onChange and updates value', () => {
    const onChange = vi.fn()
    const { container } = render(
      <TextArea initialValue="" onChange={onChange} />
    )

    const textarea = container.firstElementChild as HTMLTextAreaElement
    textarea.value = 'new value'
    fireEvent.blur(textarea)

    expect(onChange).toHaveBeenCalledWith('new value')
  })

  test('blurs event.target on enter', () => {
    const { container } = render(
      <TextArea initialValue="" onChange={() => {}} />
    )

    const textarea = container.firstElementChild as HTMLTextAreaElement
    const blur = vi.fn()
    fireEvent.keyDown(textarea, {
      key: 'Enter',
      target: { blur }
    })

    expect(blur).toHaveBeenCalledOnce()
  })
})
