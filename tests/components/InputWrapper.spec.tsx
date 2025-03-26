import { mount, shallow } from 'enzyme'
import { describe, expect, test } from 'vitest'
import { InputWrapper } from '../../src/components/InputWrapper'

describe('InputWrapper', () => {
  test('matches snapshot', () => {
    const wrapper = mount(
      <InputWrapper title="test title">
        <div>child content</div>
      </InputWrapper>
    )
    expect(wrapper.html()).toMatchSnapshot()
  })

  test('renders title and children', () => {
    const wrapper = shallow(
      <InputWrapper title="test title">
        <div>child content</div>
      </InputWrapper>
    )

    expect(wrapper.text()).toContain('test title')
    expect(wrapper.text()).toContain('child content')
  })

  test('renders with custom htmlFor prop', () => {
    const wrapper = shallow(
      <InputWrapper title="" htmlFor="customId">
        <div></div>
      </InputWrapper>
    )

    expect(wrapper.find('label').prop('htmlFor')).toBe('customId')
  })
})
