import { useSignal } from '@preact/signals'
import { ImageOff, LoaderCircle } from 'lucide-preact'
import { useEffect, useRef } from 'preact/hooks'
import { handleTapAndHold } from '../../utils/handleTapAndHold'

type ImageItemSettingsProps = {
  image: string
  isSelected: boolean
  onDelete: (image: string) => void
  onSelect: (image: string) => void
}

export function ImageItem({
  image,
  isSelected,
  onDelete,
  onSelect
}: ImageItemSettingsProps) {
  const isLoading = useSignal(true)
  const isError = useSignal(false)
  const el = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (el.current) {
      handleTapAndHold(el.current, () => {
        if (window.confirm('Are you sure you want to delete this image?')) {
          onDelete(image)
        }
      })
    }
  }, [el.current])

  const onLoad = () => {
    isLoading.value = false
  }

  const onError = () => {
    isLoading.value = false
    isError.value = true
  }

  return (
    <div
      className={`w-full aspect-square rounded-xl overflow-hidden relative outline ${isSelected ? 'outline-2 outline-primary -outline-offset-2' : 'outline-1 outline-secondary -outline-offset-1'}`}
      onClick={() => onSelect(image)}
      ref={el}
    >
      {isLoading.value && (
        <div className="size-full flex justify-center items-center">
          <LoaderCircle className="size-5 animate-spin" />
        </div>
      )}
      {isError.value && (
        <div className="size-full flex justify-center items-center">
          <ImageOff className="size-5 text-muted-foreground" />
        </div>
      )}
      <img
        alt={image}
        src={`api/image/${image}`}
        className={`size-full object-contain ${isLoading.value ? 'opacity-0' : 'opacity-100'}`}
        onLoad={onLoad}
        onError={onError}
      />
    </div>
  )
}
