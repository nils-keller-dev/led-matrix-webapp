import { fetchWithCheck } from '../utils/fetchWithCheck'

export const postImage = (image: File) => {
  const data = new FormData()
  data.append('image', image)

  return fetchWithCheck('/image', {
    method: 'POST',
    body: data
  })
}
