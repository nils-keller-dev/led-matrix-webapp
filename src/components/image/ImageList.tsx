import { useSignal } from '@preact/signals'
import { deleteImage } from '../../api/image.delete'
import { patchState } from '../../api/state.patch'
import { images as storedImages, state as storedState } from '../../store/store'
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
        patchState({ image: { image: newImage } }).then(() => {
          storedState.value!.image.image = newImage
        })
      }
    })
  }

  const updateImage = (image: string) => {
    currentImage.value = image

    patchState({ image: { image } }).then(() => {
      storedState.value!.image.image = image
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
