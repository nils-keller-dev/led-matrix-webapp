import { useSignal } from '@preact/signals'
import { Plus } from 'lucide-preact'
import { useState } from 'preact/hooks'
import { postImage } from '../../api/image.post'
import { images as storedImages } from '../../store/store'
import { Dialog } from '../Dialog'
import { ImageCropper } from './ImageCropper'

export function AddImage() {
  const [modalOpen, setModalOpen] = useState(false)
  const imgSrc = useSignal<string>('')
  const fileName = useSignal<string>('')
  const croppedImageFile = useSignal<File | undefined>(undefined)

  const onSelectFile = (e: Event) => {
    const target = e.target as HTMLInputElement
    const files = target.files as FileList

    setModalOpen(true)

    const reader = new FileReader()
    reader.addEventListener('load', () => {
      imgSrc.value = reader.result?.toString() || ''
      target.value = ''
    })

    fileName.value = files[0].name
    reader.readAsDataURL(files[0])
  }

  const uploadFile = () => {
    const file = croppedImageFile.value

    if (!file) {
      return
    }

    const newFileName = fileName.value.replace(/[^a-z0-9.]/gi, '_')
    const renamedFile = new File([file], newFileName, { type: file.type })

    postImage(renamedFile).then(() => {
      // TODO only try to render image when this succeeds
    })

    storedImages.value = [...storedImages.value!, newFileName]

    imgSrc.value = `image/${fileName}`
    setModalOpen(false)
  }

  const onChangeCrop = (file: File) => {
    croppedImageFile.value = file
  }

  return (
    <>
      <div className="w-full aspect-square rounded-xl border border-dashed border-muted-foreground text-muted-foreground flex items-center justify-center relative">
        <label htmlFor="file" className="size-full absolute" />
        <input
          type="file"
          accept=".jpg, .jpeg, .png, .gif"
          id="file"
          className="opacity-0 size-0"
          onInput={onSelectFile}
        />
        <Plus />
      </div>
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <div className="flex flex-col gap-4">
          {/* TODO don't try to crop gifs */}
          <ImageCropper src={imgSrc.value} onChangeCrop={onChangeCrop} />
          {/* TODO create new button component */}
          {/* TODO add cancel button */}
          <button
            className="outline-none border rounded-md border-muted-foreground ml-auto px-2"
            onClick={uploadFile}
          >
            Confirm
          </button>
        </div>
      </Dialog>
    </>
  )
}
