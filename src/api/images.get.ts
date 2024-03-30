export const getImages = (): Promise<string[]> => {
  return fetch('/images')
    .then((response) => response.json())
    .then((data) => data.images)
}
