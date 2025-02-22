import { describe, expect, test, vi } from 'vitest'
import { deleteImage } from '../../src/api/image.delete'
import { fetchWithCheck } from '../../src/utils/fetchWithCheck'

vi.mock('../../src/utils/fetchWithCheck')

describe('deleteImage', () => {
  test('calls fetchWithCheck with correct arguments', async () => {
    const mockResponse = { success: true } as unknown as Response
    vi.mocked(fetchWithCheck).mockResolvedValue(mockResponse)

    const response = await deleteImage('image1.png')

    expect(fetchWithCheck).toHaveBeenCalledWith('/image/image1.png', {
      method: 'DELETE'
    })
    expect(response).toEqual(mockResponse)
  })
})
