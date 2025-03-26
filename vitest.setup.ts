import { cleanup } from '@testing-library/preact'
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-preact-pure'
import { afterEach } from 'vitest'

configure({ adapter: new Adapter() })

afterEach(() => {
  cleanup()
})
