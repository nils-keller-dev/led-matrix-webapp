import { mount, shallow } from 'enzyme'
import { describe, expect, test, vi } from 'vitest'
import { IconButton } from '../../src/components/IconButton'

describe('IconButton', () => {
  test('matches snapshot', () => {
    const wrapper = mount(<IconButton />)
    expect(wrapper.html()).toMatchSnapshot()
  })

  test('renders with className props', () => {
    const wrapper = shallow(<IconButton className="className1 className2" />)

    expect(wrapper.hasClass('className1')).toBe(true)
    expect(wrapper.hasClass('className2')).toBe(true)
  })

  test('works with generic props', () => {
    const onClick = vi.fn()

    const wrapper = shallow(
      <IconButton aria-label="customAriaLabel" onClick={onClick} />
    )
    expect(wrapper.prop('aria-label')).toBe('customAriaLabel')
    wrapper.simulate('click')
    expect(onClick).toHaveBeenCalled()
  })

  test('renders children', () => {
    const wrapper = shallow(<IconButton>child content</IconButton>)
    expect(wrapper.text()).toContain('child content')
  })
})
