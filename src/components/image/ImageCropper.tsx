import { useSignal } from '@preact/signals'
import { RotateCwSquare } from 'lucide-preact'
import { useEffect, useRef, useState } from 'preact/hooks'
import ReactCrop, { PixelCrop, type Crop } from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import { canvasPreview } from '../../utils/canvasPreview'
import { IconButton } from '../IconButton'

type ImageCropperProps = {
  src: string
  onChangeCrop: (file: File) => void
}

export function ImageCropper({ src, onChangeCrop }: ImageCropperProps) {
  const [crop, setCrop] = useState<Crop>()
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>()
  const rotation = useSignal(0)
  const previewCanvasRef = useRef<HTMLCanvasElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)

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
        rotation.value
      )

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
  }, [completedCrop, rotation.value])

  const onClickRotate = () => {
    rotation.value = rotation.value + (90 % 360)
  }

  return (
    <>
      <ReactCrop
        crop={crop}
        onChange={setCrop}
        className="outline-none"
        onComplete={setCompletedCrop}
        minHeight={10}
        minWidth={10}
        aspect={1}
      >
        <img
          ref={imgRef}
          src={src}
          onLoad={onImageLoad}
          style={{ rotate: `${rotation.value}deg` }}
        />
      </ReactCrop>
      <IconButton className="mx-auto" onClick={onClickRotate}>
        <RotateCwSquare />
      </IconButton>
      <canvas ref={previewCanvasRef} className="hidden" />
    </>
  )
}
