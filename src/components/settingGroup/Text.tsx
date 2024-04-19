import { postJson } from '../../api/json.post'
import { data } from '../../store/store'
import { InputSpinner } from '../InputSpinner'
import { InputWrapper } from '../InputWrapper'
import { Switch } from '../Switch'
import { TextInput } from '../TextInput'

type TextSettingsProps = {
  text: string
  vertical: boolean
  textSpeed: number
}

export function Text(initialValues: TextSettingsProps) {
  const updateTextSpeed = (textSpeed: number) => {
    data.value!.textSpeed = textSpeed
    postJson({ textSpeed })
  }

  const updateText = (text: string) => {
    data.value!.text = text
    postJson({ text })
  }

  const updateTextVertical = (vertical: boolean) => {
    data.value!.vertical = vertical
    postJson({ vertical })
  }

  return (
    <div className="flex flex-col gap-6">
      <TextInput initialValue={initialValues.text} onChange={updateText} />
      <InputWrapper title="Vertical text" htmlFor="vertical-switch">
        <Switch
          initialValue={initialValues.vertical}
          id="vertical-switch"
          onChange={updateTextVertical}
        />
      </InputWrapper>
      <InputWrapper title="Text speed">
        <InputSpinner
          numberSteps={8}
          initialValue={initialValues.textSpeed}
          onChange={updateTextSpeed}
        />
      </InputWrapper>
    </div>
  )
}
