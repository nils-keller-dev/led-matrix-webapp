import { ImageList } from '../image/ImageList'

type ImageSettingsProps = {
  image: string
}

export function Image({ image }: ImageSettingsProps) {
  return <ImageList selected={image} />
}
