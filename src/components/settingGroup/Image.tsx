import { useSignal } from '@preact/signals'
import { postJson } from '../../api/json.post'

type ImageSettingsProps = {
  image: string
  images: string[]
}

export function Image({ image, images }: ImageSettingsProps) {
  const currentImage = useSignal(image)

  const updateImage = (image: string) => {
    postJson({ image })
    currentImage.value = image
  }

  const startDrag = (e: MouseEvent | TouchEvent) => {
    e.stopPropagation()
  }

  return (
    <div
      className="h-[50vh] overflow-y-scroll"
      onMouseDown={startDrag}
      onTouchStart={startDrag}
    >
      <div className="grid grid-cols-3 gap-3">
        {images.map((imageName, index) => (
          <img
            src={`image/${imageName}`}
            key={index}
            className={`size-full object-contain rounded-xl ${imageName === currentImage.value ? 'border-2 border-primary' : 'border border-secondary'}`}
            onClick={() => updateImage(imageName)}
          />
        ))}
      </div>
    </div>
  )
}
