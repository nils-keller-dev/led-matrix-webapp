export const fetchWithCheck = (url: string, options?: RequestInit) => {
  return fetch(`api${url}`, options).then((response) => {
    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`)
    }
    return response
  })
}
