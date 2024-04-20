import { Data } from '../constants/interfaces/Data'
import { fetchWithCheck } from '../utils/fetchWithCheck'

export const getData = (): Promise<Data> => {
  return fetchWithCheck('/data').then((response) => response.json())
}
