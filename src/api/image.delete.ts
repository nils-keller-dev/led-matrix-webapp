import { fetchWithCheck } from '../utils/fetchWithCheck'

export const deleteImage = (image: string) => {
  return fetchWithCheck(`/image/${image}`, {
    method: 'DELETE'
  })
}
