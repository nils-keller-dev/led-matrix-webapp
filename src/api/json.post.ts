import { Data } from '../constants/interfaces/Data'
import { fetchWithCheck } from '../utils/fetchWithCheck'

export const postJson = async (data: Data) => {
  return fetchWithCheck('/json', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
}
