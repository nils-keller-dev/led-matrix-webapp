import { fetchWithCheck } from '../utils/fetchWithCheck'

export const getImages = (): Promise<string[]> => {
  return fetchWithCheck('/images')
    .then((response) => response.json())
    .then((data) => data.images)
}
