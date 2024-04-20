import { useSignal } from '@preact/signals'
import { Plus } from 'lucide-preact'
import { deleteImage } from '../../api/image.delete'
import { postImage } from '../../api/image.post'
import { postJson } from '../../api/json.post'
import { data as storedData, images as storedImages } from '../../store/store'
import { ImageItem } from '../image/ImageItem'

type ImageListProps = {
  selected: string
}

export function ImageList({ selected }: ImageListProps) {
  const currentImage = useSignal<string | undefined>(selected)

  const onDeleteImage = (image: string) => {
    deleteImage(image).then(() => {
      storedImages.value =
        storedImages.value?.filter((i) => i !== image) || null

      if (image === currentImage.value) {
        const newImage = storedImages.value?.[0]

        currentImage.value = newImage
        postJson({ image: newImage }).then(() => {
          storedData.value!.image = newImage
        })
      }
    })
  }

  const updateImage = (image: string) => {
    currentImage.value = image

    postJson({ image }).then(() => {
      storedData.value!.image = image
    })
  }

  const uploadFile = (e: Event) => {
    const target = e.target as HTMLInputElement
    const file = target.files?.[0]

    if (!file) {
      return
    }

    // TODO image editor react-image-crop
    const fileName = file.name.replace(/[^a-z0-9.]/gi, '_')
    const renamedFile = new File([file], fileName, { type: file.type })

    postImage(renamedFile).then(() => {
      // TODO only try to render image when this succeeds
    })

    storedImages.value = [...storedImages.value!, fileName]
  }

  return (
    <div className="overflow-y-scroll">
      <div className="grid grid-cols-3 gap-3">
        {storedImages.value!.map((imageName, index) => (
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
