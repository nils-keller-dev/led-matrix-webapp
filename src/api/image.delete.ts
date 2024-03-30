export const deleteImage = (image: string): Promise<void> => {
  return fetch(`/image/${image}`, {
    method: 'DELETE'
  }).then((response) => response.json())
}
