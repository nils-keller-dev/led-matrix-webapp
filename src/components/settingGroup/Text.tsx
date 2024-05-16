import { patchState } from '../../api/state.patch'
import { state } from '../../store/store'
import { hexToRgb, rgbToHex } from '../../utils/ColorConversion'
import { ColorInput } from '../ColorInput'
import { InputWrapper } from '../InputWrapper'
import { Slider } from '../Slider'
import { TextArea } from '../TextArea'

type TextSettingsProps = {
  text: string
  speed: number
  size: number
  color: number[]
}

export function Text(initialValues: TextSettingsProps) {
  const updateText = (text: string) => {
    patchState({ text: { text } }).then(() => {
      state.value!.text.text = text
    })
  }

  const updateSpeed = (speed: number) => {
    patchState({ text: { speed } }).then(() => {
      state.value!.text.speed = speed
    })
  }

  const updateSize = (size: number) => {
    patchState({ text: { size } }).then(() => {
      state.value!.text.size = size
    })
  }

  const updateColor = (color: string) => {
    const rgbColor = hexToRgb(color)
    patchState({ text: { color: rgbColor } }).then(() => {
      state.value!.text.color = rgbColor
    })
  }

  return (
    <div className="flex flex-col gap-5">
      <TextArea initialValue={initialValues.text} onChange={updateText} />
      <InputWrapper title="Size">
        <div className="w-[220px]">
          <Slider
            min={0}
            max={7}
            initialValue={initialValues.size}
            onChange={updateSize}
          />
        </div>
      </InputWrapper>
      <InputWrapper title="Speed">
        <div className="w-[220px]">
          <Slider
            min={0}
            max={7}
            initialValue={initialValues.speed}
            onChange={updateSpeed}
          />
        </div>
      </InputWrapper>
      <ColorInput
        initialValue={rgbToHex(initialValues.color)}
        onChange={updateColor}
      />
    </div>
  )
}
