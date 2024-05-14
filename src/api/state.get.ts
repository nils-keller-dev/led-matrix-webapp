import { State } from '../constants/interfaces/State'
import { fetchWithCheck } from '../utils/fetchWithCheck'

export const getState = (): Promise<State> => {
  return fetchWithCheck('/state').then((response) => response.json())
}
