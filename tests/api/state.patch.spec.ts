import { describe, expect, test, vi } from 'vitest'
import { patchState } from '../../src/api/state.patch'
import { State } from '../../src/constants/interfaces/State'
import { fetchWithCheck } from '../../src/utils/fetchWithCheck'

vi.mock('../../src/utils/fetchWithCheck')

describe('patchState', () => {
  test('calls fetchWithCheck with correct arguments', async () => {
    const mockState: Partial<State> = { global: { brightness: 100 } }
    const mockResponse = { success: true } as unknown as Response
    vi.mocked(fetchWithCheck).mockResolvedValue(mockResponse)

    const response = await patchState(mockState)

    expect(fetchWithCheck).toHaveBeenCalledWith('/state', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(mockState)
    })
    expect(response).toEqual(mockResponse)
  })
})
