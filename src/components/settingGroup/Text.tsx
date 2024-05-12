import { postJson } from '../../api/json.post'
import { data } from '../../store/store'
import { InputSpinner } from '../InputSpinner'
import { InputWrapper } from '../InputWrapper'
import { Switch } from '../Switch'
import { TextInput } from '../TextInput'

type TextSettingsProps = {
  text: string
  vertical: boolean
  speed: number
}

export function Text(initialValues: TextSettingsProps) {
  const updateSpeed = (speed: number) => {
    postJson({ text: { speed } }).then(() => {
      data.value!.text.speed = speed
    })
  }

  const updateText = (text: string) => {
    postJson({ text: { text } }).then(() => {
      data.value!.text.text = text
    })
  }

  const updateVertical = (vertical: boolean) => {
    postJson({ text: { vertical } }).then(() => {
      data.value!.text.vertical = vertical
    })
  }

  return (
    <div className="flex flex-col gap-6">
      <TextInput initialValue={initialValues.text} onChange={updateText} />
      <InputWrapper title="Vertical text" htmlFor="vertical-switch">
        <Switch
          initialValue={initialValues.vertical}
          id="vertical-switch"
          onChange={updateVertical}
        />
      </InputWrapper>
      <InputWrapper title="Text speed">
        <InputSpinner
          numberSteps={8}
          initialValue={initialValues.speed}
          onChange={updateSpeed}
        />
      </InputWrapper>
    </div>
  )
}
