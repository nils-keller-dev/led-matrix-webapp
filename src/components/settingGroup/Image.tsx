import { useSignal } from '@preact/signals'
import { LoaderCircle, Plus } from 'lucide-preact'
import { deleteImage } from '../../api/image.delete'
import { postImage } from '../../api/image.post'
import { postJson } from '../../api/json.post'

type ImageItemSettingsProps = {
  image: string
  isSelected: boolean
  onDelete: (image: string) => void
  onSelect: (image: string) => void
}

function ImageItem({
  image,
  isSelected,
  onDelete,
  onSelect
}: ImageItemSettingsProps) {
  const isLoading = useSignal(true)

  const onContextMenu = (e: Event, image: string) => {
    e.preventDefault()
    if (window.confirm('Are you sure you want to delete this image?')) {
      onDelete(image)
    }
  }

  const onLoad = () => {
    isLoading.value = false
  }

  return (
    <div
      className={`w-full aspect-square rounded-xl overflow-hidden relative ${isSelected ? 'border-2 border-primary' : 'border border-secondary'}`}
    >
      {isLoading.value && (
        <div className="size-full flex justify-center items-center">
          <LoaderCircle className="size-5 animate-spin" />
        </div>
      )}
      <img
        alt={image}
        src={`image/${image}`}
        className={`size-full object-contain ${isLoading.value ? 'opacity-0' : 'opacity-100'}`}
        onClick={() => onSelect(image)}
        onContextMenu={(e) => onContextMenu(e, image)}
        onLoad={onLoad}
      />
    </div>
  )
}

type ImageSettingsProps = {
  image: string
  images: string[]
}

export function Image({ image, images }: ImageSettingsProps) {
  const currentImage = useSignal(image)
  const imageList = useSignal(images)

  const startDrag = (e: MouseEvent | TouchEvent) => {
    e.stopPropagation()
  }

  const onDeleteImage = (image: string) => {
    deleteImage(image)

    imageList.value = imageList.value.filter((imageName) => imageName !== image)

    if (image === currentImage.value) {
      currentImage.value = imageList.value[0]
      postJson({ image: currentImage.value })
    }
  }

  const updateImage = (image: string) => {
    postJson({ image })
    currentImage.value = image
  }

  const uploadFile = (e: Event) => {
    const target = e.target as HTMLInputElement
    const file = target.files?.[0]

    if (!file) {
      return
    }

    // TODO image editor
    postImage(file)

    imageList.value = [...imageList.value, file.name]
  }

  return (
    <div
      className="h-[50vh] overflow-y-scroll"
      onMouseDown={startDrag}
      onTouchStart={startDrag}
    >
      <div className="grid grid-cols-3 gap-3">
        {imageList.value.map((imageName, index) => (
          <ImageItem
            key={index}
            image={imageName}
            isSelected={imageName === currentImage.value}
            onDelete={onDeleteImage}
            onSelect={updateImage}
          />
        ))}
        <div className="w-full aspect-square rounded-xl border border-dashed border-muted-foreground text-muted-foreground flex items-center justify-center relative">
          <label htmlFor="file" className="size-full absolute" />
          <input
            type="file"
            accept=".jpg, .jpeg, .png, .gif"
            id="file"
            className="opacity-0 size-0"
            onInput={uploadFile}
          />
          <Plus />
        </div>
      </div>
    </div>
  )
}
