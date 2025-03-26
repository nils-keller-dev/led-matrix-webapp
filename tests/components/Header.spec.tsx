import { mount, shallow } from 'enzyme'
import { describe, expect, test, vi } from 'vitest'
import { Header } from '../../src/components/Header'

vi.mock('../../package.json', () => ({
  default: { version: '0.0.0' }
}))

describe('Header', () => {
  test('matches snapshot', () => {
    const wrapper = mount(<Header />)
    expect(wrapper.html()).toMatchSnapshot()
  })

  test('renders with version number', () => {
    const wrapper = shallow(<Header />)

    expect(wrapper.text()).toContain('v0.0.0')
  })
})
