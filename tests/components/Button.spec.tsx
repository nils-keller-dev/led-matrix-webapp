import { mount, shallow } from 'enzyme'
import { describe, expect, test, vi } from 'vitest'
import { Button } from '../../src/components/Button'

describe('Button', () => {
  test('matches snapshot', () => {
    const wrapper = mount(<Button text="Button text" onClick={() => {}} />)
    expect(wrapper.html()).toMatchSnapshot()
  })

  test('renders with text', () => {
    const wrapper = shallow(<Button text="Button text" onClick={() => {}} />)

    expect(wrapper.hasClass('bg-primary')).toBe(true)
    expect(wrapper.text()).toContain('Button text')
  })

  test('applies correct secondary classes', () => {
    const wrapper = shallow(
      <Button text="Button text" isSecondary onClick={() => {}} />
    )

    expect(wrapper.hasClass('border-muted-foreground')).toBe(true)
  })

  test('calls onClick when clicked', () => {
    const onClick = vi.fn()
    const wrapper = shallow(<Button text="Button text" onClick={onClick} />)

    wrapper.simulate('click')
    expect(onClick).toHaveBeenCalled()
  })
})
