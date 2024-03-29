import { postJson } from '../../api/json.post'
import { TextInput } from '../TextInput'

type ImageSettingsProps = {
  image: string
}

export function Image(initialValues: ImageSettingsProps) {
  const updateImage = (image: string) => {
    postJson({ image })
  }

  return (
    <div className="flex flex-col gap-6">
      <TextInput initialValue={initialValues.image} onChange={updateImage} />
    </div>
  )
}
