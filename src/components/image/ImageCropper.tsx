import { useEffect, useRef, useState } from 'preact/hooks'
import ReactCrop, { PixelCrop, type Crop } from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import { canvasPreview } from '../../utils/canvasPreview'
import { useSignal } from '@preact/signals'

type ImageCropperProps = {
  src: string
  onChangeCrop: (file: File) => void
}

export function ImageCropper({ src, onChangeCrop }: ImageCropperProps) {
  const [crop, setCrop] = useState<Crop>()
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>()
  const previewCanvasRef = useRef<HTMLCanvasElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const isCropping = useSignal(false)

  const onDragEnd = () => {
    isCropping.value = true
  }

  const onCompleteCrop = (crop: PixelCrop) => {
    if (crop!.width + crop!.height <= 20 && imgRef.current) {
      const { width, height } = imgRef.current
      const min = Math.min(width, height)

      const newCrop: PixelCrop = {
        unit: 'px',
        width: min,
        height: min,
        x: 0,
        y: 0
      }

      setCrop(newCrop)
      setCompletedCrop(newCrop)
    } else {
      setCompletedCrop(crop)
    }
  }

  const updatePreview = (crop: PixelCrop) => {
    if (!imgRef.current || !previewCanvasRef.current) return

    canvasPreview(imgRef.current, previewCanvasRef.current, crop)

    previewCanvasRef.current.toBlob(
      (blob) => {
        if (blob) {
          const file = new File([blob], 'crop.jpeg', {
            type: 'image/jpeg'
          })
          onChangeCrop(file)
        }
      },
      'image/jpeg',
      1
    )
  }

  const onLoad = () => {
    if (!imgRef.current) return

    const { width, height } = imgRef.current

    updatePreview({
      unit: 'px',
      width,
      height,
      x: 0,
      y: 0
    })
  }

  useEffect(() => {
    if (completedCrop?.width && completedCrop?.height) {
      updatePreview(completedCrop)
    }
  }, [completedCrop])

  return (
    <div>
      <canvas ref={previewCanvasRef} className="hidden" />

      <ReactCrop
        crop={crop}
        onChange={setCrop}
        className="outline-none"
        onComplete={onCompleteCrop}
        minHeight={10}
        minWidth={10}
        aspect={1}
        onDragEnd={onDragEnd}
        keepSelection={true}
      >
        <img
          ref={imgRef}
          src={src}
          onLoad={onLoad}
          className="outline outline-1 -outline-offset-1 outline-secondary"
        />
      </ReactCrop>
    </div>
  )
}
