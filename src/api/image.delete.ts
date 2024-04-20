export const deleteImage = (image: string) => {
  return fetch(`/image/${image}`, {
    method: 'DELETE'
  })
}
