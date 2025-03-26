import { mount, shallow } from 'enzyme'
import { describe, expect, test } from 'vitest'
import { Skeleton } from '../../src/components/Skeleton'

describe('Skeleton', () => {
  test('matches snapshot', () => {
    const wrapper = mount(<Skeleton />)
    expect(wrapper.html()).toMatchSnapshot()
  })

  test('renders with className props', () => {
    const wrapper = shallow(<Skeleton className="className1 className2" />)

    expect(wrapper.hasClass('className1')).toBe(true)
    expect(wrapper.hasClass('className2')).toBe(true)
  })
})
