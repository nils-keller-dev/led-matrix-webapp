import { describe, expect, test, vi } from 'vitest'
import { postImage } from '../../src/api/image.post'
import { fetchWithCheck } from '../../src/utils/fetchWithCheck'

vi.mock('../../src/utils/fetchWithCheck')

describe('postImage', () => {
  test('calls fetchWithCheck with correct arguments', async () => {
    const mockResponse = { success: true } as unknown as Response
    vi.mocked(fetchWithCheck).mockResolvedValue(mockResponse)

    const mockImage = new File([''], 'image.png')

    const response = await postImage(mockImage)

    expect(fetchWithCheck).toHaveBeenCalledWith('/image', {
      method: 'POST',
      body: expect.any(FormData)
    })
    expect(response).toEqual(mockResponse)
  })
})
