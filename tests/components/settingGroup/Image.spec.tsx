import { render } from '@testing-library/preact'
import { describe, expect, test, vi } from 'vitest'
import { ImageList } from '../../../src/components/image/ImageList'
import { Image } from '../../../src/components/settingGroup/Image'

vi.mock('../../../src/components/image/ImageList', () => ({
  ImageList: vi.fn()
}))

describe('Image Component', () => {
  test('renders ImageList with the correct selected image', () => {
    const image = 'test-image'
    render(<Image image={image} />)

    expect(ImageList).toHaveBeenCalledWith(
      { selected: image },
      expect.anything()
    )
  })
})
