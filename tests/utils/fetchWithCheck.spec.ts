import { describe, expect, test, vi } from 'vitest'
import { fetchWithCheck } from '../../src/utils/fetchWithCheck'

describe('fetchWithCheck', () => {
  test('returns response when fetch is successful', async () => {
    const mockResponse = { ok: true }
    window.fetch = vi.fn().mockResolvedValue(mockResponse)

    const response = await fetchWithCheck('/test-url')
    expect(response).toBe(mockResponse)
  })

  test('throws an error when fetch response is not ok', async () => {
    const mockResponse = {
      ok: false,
      status: 404,
      statusText: 'Not Found'
    }
    window.fetch = vi.fn().mockResolvedValue(mockResponse)

    await expect(fetchWithCheck('/test-url')).rejects.toThrow('404 Not Found')
  })

  test('calls fetch with correct URL and options', async () => {
    const mockResponse = {
      ok: true
    }
    window.fetch = vi.fn().mockResolvedValue(mockResponse)

    const options = { method: 'POST' }
    await fetchWithCheck('/test-url', options)
    expect(window.fetch).toHaveBeenCalledWith('api/test-url', options)
  })
})
