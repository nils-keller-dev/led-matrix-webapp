import { mount } from 'enzyme'
import { describe, expect, test } from 'vitest'
import { Skeleton } from '../../src/components/Skeleton'

describe('Skeleton', () => {
  test('matches snapshot', () => {
    const wrapper = mount(<Skeleton />)
    expect(wrapper.html()).toMatchSnapshot()
  })

  test('renders with className props', () => {
    const wrapper = mount(<Skeleton className="className1 className2" />)

    const element = wrapper.getDOMNode()
    expect(element.classList).toContain('className1')
    expect(element.classList).toContain('className2')
  })
})
