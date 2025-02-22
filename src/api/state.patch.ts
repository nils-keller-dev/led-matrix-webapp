import { State } from '../constants/interfaces/State'
import { fetchWithCheck } from '../utils/fetchWithCheck'

export const patchState = (state: Partial<State>) => {
  return fetchWithCheck('/state', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(state)
  })
}
