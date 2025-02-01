import { TextAlign } from '../../constants/enums/TextAlign'
import { patchState } from '../../api/state.patch'
import { state } from '../../store/store'
import { hexToRgb, rgbToHex } from '../../utils/ColorConversion'
import { ColorInput } from '../ColorInput'
import { InputWrapper } from '../InputWrapper'
import { RadioGroup } from '../RadioGroup'
import { Slider } from '../Slider'
import { TextArea } from '../TextArea'
import { AlignLeft, AlignCenter, AlignJustify } from 'lucide-preact'

type TextSettingsProps = {
  align: TextAlign
  text: string
  size: number
  speed: number
  color: number[]
}

export function Text(initialValues: TextSettingsProps) {
  const updateAlign = (align: string) => {
    const alignValue = TextAlign[align as keyof typeof TextAlign]
    patchState({ text: { align: alignValue } }).then(() => {
      state.value!.text.align = alignValue
    })
  }

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
      <div className="flex justify-center">
        <RadioGroup
          icons={[AlignLeft, AlignCenter, AlignJustify]}
          values={Object.values(TextAlign)}
          selected={initialValues.align}
          onChange={updateAlign}
        />
      </div>
      <TextArea
        placeholder="Enter your text here"
        initialValue={initialValues.text}
        onChange={updateText}
      />
      <InputWrapper title="Size">
        <div className="w-55">
          <Slider
            min={1}
            max={5}
            initialValue={initialValues.size}
            onChange={updateSize}
          />
        </div>
      </InputWrapper>
      <InputWrapper title="Speed">
        <div className="w-55">
          <Slider
            min={0}
            max={10}
            initialValue={initialValues.speed}
            onChange={updateSpeed}
          />
        </div>
      </InputWrapper>
      <InputWrapper title="Color" htmlFor="color">
        <ColorInput
          initialValue={rgbToHex(initialValues.color)}
          id="color"
          onChange={updateColor}
        />
      </InputWrapper>
    </div>
  )
}
