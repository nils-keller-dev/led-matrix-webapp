import { PixelCrop } from 'react-image-crop'

const TO_RADIANS = Math.PI / 180
const MAX_DIMENSION = 128

export async function canvasPreview(
  image: HTMLImageElement,
  canvas: HTMLCanvasElement,
  crop: PixelCrop,
  rotate = 0
) {
  const ctx = canvas.getContext('2d')

  if (!ctx) {
    throw new Error('No 2d context')
  }

  const scaleX = image.naturalWidth / image.width
  const scaleY = image.naturalHeight / image.height

  const cropWidth = Math.floor(crop.width * scaleX)
  const cropHeight = Math.floor(crop.height * scaleY)

  const maxDimension = Math.max(cropWidth, cropHeight)
  const scaleFactor = MAX_DIMENSION / maxDimension

  const finalWidth =
    maxDimension === cropWidth
      ? MAX_DIMENSION
      : Math.floor(cropWidth * scaleFactor)
  const finalHeight =
    maxDimension === cropHeight
      ? MAX_DIMENSION
      : Math.floor(cropHeight * scaleFactor)

  canvas.width = finalWidth
  canvas.height = finalHeight

  const cropX = crop.x * scaleX
  const cropY = crop.y * scaleY

  const rotateRads = rotate * TO_RADIANS
  const centerX = image.naturalWidth / 2
  const centerY = image.naturalHeight / 2

  ctx.save()

  // 5) Scale the image to fit the canvas
  ctx.scale(finalWidth / cropWidth, finalHeight / cropHeight)
  // 4) Move the crop origin to the canvas origin (0,0)
  ctx.translate(-cropX, -cropY)
  // 3) Move the origin to the center of the original position
  ctx.translate(centerX, centerY)
  // 2) Rotate around the origin
  ctx.rotate(rotateRads)
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
