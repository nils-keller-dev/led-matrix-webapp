import { useSignal } from '@preact/signals'
import { deleteImage } from '../../api/image.delete'
import { postJson } from '../../api/json.post'
import { data as storedData, images as storedImages } from '../../store/store'
import { ImageItem } from '../image/ImageItem'
import { AddImage } from './AddImage'

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
        <AddImage />
      </div>
    </div>
  )
}
