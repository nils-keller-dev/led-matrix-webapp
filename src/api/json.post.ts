import { Data } from '../constants/interfaces/Data'

export const postJson = async (data: Data) => {
  return fetch('/json', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
}
