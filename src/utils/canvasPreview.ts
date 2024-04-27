import { PixelCrop } from 'react-image-crop'

const MAX_DIMENSION = 128

export async function canvasPreview(
  image: HTMLImageElement,
  canvas: HTMLCanvasElement,
  crop: PixelCrop
) {
  const ctx = canvas.getContext('2d')

  if (!ctx) {
    throw new Error('No 2d context')
  }

  const scaleX = image.naturalWidth / image.width
  const scaleY = image.naturalHeight / image.height

  const cropWidth = Math.floor(crop.width * scaleX)
  const cropHeight = Math.floor(crop.height * scaleY)

  // Calculate scale factor to ensure max dimension is 64 pixels
  const maxDimension = Math.max(cropWidth, cropHeight)
  const scaleFactor = MAX_DIMENSION / maxDimension

  // Apply scale factor only if max dimension exceeds 64
  const finalWidth =
    maxDimension === cropWidth
      ? MAX_DIMENSION
      : Math.floor(cropWidth * scaleFactor)
  const finalHeight =
    maxDimension === cropHeight
      ? MAX_DIMENSION
      : Math.floor(cropHeight * scaleFactor)

  // Set canvas dimensions
  canvas.width = finalWidth
  canvas.height = finalHeight

  const cropX = crop.x * scaleX
  const cropY = crop.y * scaleY

  const centerX = image.naturalWidth / 2
  const centerY = image.naturalHeight / 2

  ctx.save()

  // Scaling the context to fit the canvas
  ctx.scale(finalWidth / cropWidth, finalHeight / cropHeight)

  // 3) Move the crop origin to the canvas origin (0,0)
  ctx.translate(-cropX, -cropY)
  // 2) Move the origin to the center of the original position
  ctx.translate(centerX, centerY)
  // 1) Move the center of the image to the origin (0,0)
  ctx.translate(-centerX, -centerY)
  ctx.drawImage(
    image,
    0,
    0,
    image.naturalWidth,
    image.naturalHeight,
    0,
    0,
    image.naturalWidth,
    image.naturalHeight
  )

  ctx.restore()
}
