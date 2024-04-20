export const postImage = (image: File) => {
  const data = new FormData()
  data.append('image', image)

  return fetch('/image', {
    method: 'POST',
    body: data
  })
}
