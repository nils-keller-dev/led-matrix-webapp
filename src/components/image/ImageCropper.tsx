import { useEffect, useRef, useState } from 'preact/hooks'
import ReactCrop, { PixelCrop, type Crop } from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import { canvasPreview } from '../../utils/canvasPreview'

type ImageCropperProps = {
  src: string
  onChangeCrop: (file: File) => void
}

export function ImageCropper({ src, onChangeCrop }: ImageCropperProps) {
  // TODO use useSignal instead of useState
  const [crop, setCrop] = useState<Crop>()
  const previewCanvasRef = useRef<HTMLCanvasElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>()

  const onImageLoad = () => {
    setCrop({
      unit: '%',
      width: 100,
      height: 100,
      x: 0,
      y: 0
    })
  }

  useEffect(() => {
    if (
      completedCrop?.width &&
      completedCrop?.height &&
      imgRef.current &&
      previewCanvasRef.current
    ) {
      canvasPreview(
        imgRef.current,
        previewCanvasRef.current,
        completedCrop,
        1,
        0
      )

      // TODO change resolution to 64x64
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
  // TODO use rotate and remove scale
  // }, [completedCrop, scale, rotate])

  return (
    <>
      <ReactCrop
        crop={crop}
        onChange={(c) => setCrop(c)}
        className="outline-none"
        onComplete={(c) => setCompletedCrop(c)}
        minHeight={10}
        minWidth={10}
      >
        <img ref={imgRef} src={src} onLoad={onImageLoad} />
      </ReactCrop>
      <canvas ref={previewCanvasRef} className="hidden" />
    </>
  )
}