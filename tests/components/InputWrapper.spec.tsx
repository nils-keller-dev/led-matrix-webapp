import { render } from '@testing-library/preact'
import { describe, expect, test } from 'vitest'
import { InputWrapper } from '../../src/components/InputWrapper'

describe('InputWrapper', () => {
  test('renders title and children', () => {
    const { getByText } = render(
      <InputWrapper title="test title">
        <div>child content</div>
      </InputWrapper>
    )
    expect(getByText('test title')).toBeDefined()
    expect(getByText('child content')).toBeDefined()
  })

  test('renders with custom htmlFor prop', () => {
    const { container } = render(
      <InputWrapper title="" htmlFor="customId">
        <div></div>
      </InputWrapper>
    )

    expect(container.querySelector('label')?.getAttribute('for')).toBe(
      'customId'
    )
  })
})
