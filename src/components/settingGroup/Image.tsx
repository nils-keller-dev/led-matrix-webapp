import { useSignal } from '@preact/signals'
import { deleteImage } from '../../api/image.delete'
import { postJson } from '../../api/json.post'

type ImageSettingsProps = {
  image: string
  images: string[]
}

export function Image({ image, images }: ImageSettingsProps) {
  const currentImage = useSignal(image)
  const imageList = useSignal(images)

  const updateImage = (image: string) => {
    postJson({ image })
    currentImage.value = image
  }

  const startDrag = (e: MouseEvent | TouchEvent) => {
    e.stopPropagation()
  }

  const onContextMenu = (e: Event, image: string) => {
    e.preventDefault()
    if (
      !window.confirm('Are you sure you want to permanently delete this image?')
    ) {
      return
    }

    deleteImage(image)

    imageList.value = imageList.value.filter((imageName) => imageName !== image)

    if (image === currentImage.value) {
      currentImage.value = imageList.value[0]
      postJson({ image: currentImage.value })
    }
  }

  return (
    <div
      className="h-[50vh] overflow-y-scroll"
      onMouseDown={startDrag}
      onTouchStart={startDrag}
    >
      <div className="grid grid-cols-3 gap-3">
        {imageList.value.map((imageName, index) => (
          <img
            src={`image/${imageName}`}
            key={index}
            className={`size-full object-contain rounded-xl ${imageName === currentImage.value ? 'border-2 border-primary' : 'border border-secondary'}`}
            onClick={() => updateImage(imageName)}
            onContextMenu={(e) => onContextMenu(e, imageName)}
          />
        ))}
      </div>
    </div>
  )
}
