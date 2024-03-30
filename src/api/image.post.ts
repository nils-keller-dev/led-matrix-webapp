export const postImage = (image: File): Promise<void> => {
  const data = new FormData()
  data.append('image', image)

  return fetch('/image', {
    method: 'POST',
    body: data
  }).then((response) => response.json())
}
