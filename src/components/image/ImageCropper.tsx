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

  useEffect(() => {
    if (
      isCropping.value &&
      crop!.width + crop!.height === 0 &&
      imgRef.current
    ) {
      const { width, height } = imgRef.current
      const min = Math.min(width, height)

      setCrop({
        unit: 'px',
        width: min,
        height: min,
        x: 0,
        y: 0
      })
    }
  }, [isCropping.value])

  useEffect(() => {
    if (
      completedCrop?.width &&
      completedCrop?.height &&
      imgRef.current &&
      previewCanvasRef.current
    ) {
      canvasPreview(imgRef.current, previewCanvasRef.current, completedCrop)

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
  }, [completedCrop])

  return (
    <div>
      <canvas ref={previewCanvasRef} className="hidden" />

      <ReactCrop
        crop={crop}
        onChange={setCrop}
        className="outline-none"
        onComplete={setCompletedCrop}
        minHeight={10}
        minWidth={10}
        aspect={1}
        onDragEnd={onDragEnd}
        keepSelection={true}
      >
        <img
          ref={imgRef}
          src={src}
          className="outline outline-1 -outline-offset-1 outline-secondary"
        />
      </ReactCrop>
    </div>
  )
}
