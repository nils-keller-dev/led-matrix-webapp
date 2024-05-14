import { patchState } from '../../api/state.patch'
import { state } from '../../store/store'
import { hexToRgb, rgbToHex } from '../../utils/ColorConversion'
import { ColorInput } from '../ColorInput'
import { InputSpinner } from '../InputSpinner'
import { InputWrapper } from '../InputWrapper'
import { Switch } from '../Switch'
import { TextInput } from '../TextInput'

type TextSettingsProps = {
  text: string
  vertical: boolean
  speed: number
  color: number[]
}

export function Text(initialValues: TextSettingsProps) {
  const updateSpeed = (speed: number) => {
    patchState({ text: { speed } }).then(() => {
      state.value!.text.speed = speed
    })
  }

  const updateText = (text: string) => {
    patchState({ text: { text } }).then(() => {
      state.value!.text.text = text
    })
  }

  const updateVertical = (vertical: boolean) => {
    patchState({ text: { vertical } }).then(() => {
      state.value!.text.vertical = vertical
    })
  }

  const updateColor = (color: string) => {
    const rgbColor = hexToRgb(color)
    patchState({ text: { color: rgbColor } }).then(() => {
      state.value!.text.color = rgbColor
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
      <ColorInput
        initialValue={rgbToHex(initialValues.color)}
        onChange={updateColor}
      />
    </div>
  )
}
