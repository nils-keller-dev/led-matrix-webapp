import { patchState } from '../../api/state.patch'
import { state } from '../../store/store'
import { hexToRgb, rgbToHex } from '../../utils/ColorConversion'
import { ColorInput } from '../ColorInput'
import { InputWrapper } from '../InputWrapper'
import { Slider } from '../Slider'

type ClockSettingsProps = {
  color: number[]
  backgroundColor: number[]
  backgroundBrightness: number
}

export function Clock(initialValues: ClockSettingsProps) {
  const updateColor = (color: string) => {
    const rgbColor = hexToRgb(color)
    patchState({ clock: { color: rgbColor } }).then(() => {
      state.value!.clock.color = rgbColor
    })
  }

  const updateBackgroundColor = (backgroundColor: string) => {
    const rgbColor = hexToRgb(backgroundColor)
    patchState({ clock: { backgroundColor: rgbColor } }).then(() => {
      state.value!.clock.backgroundColor = rgbColor
    })
  }

  const updateBrightness = (backgroundBrightness: number) => {
    patchState({ clock: { backgroundBrightness } }).then(() => {
      state.value!.clock.backgroundBrightness = backgroundBrightness
    })
  }

  return (
    <div className="flex flex-col gap-5">
      <InputWrapper title="Text" htmlFor="text">
        <ColorInput
          initialValue={rgbToHex(initialValues.color)}
          id="text"
          onChange={updateColor}
        />
      </InputWrapper>

      <div className="flex flex-col border border-secondary rounded-md items-center justify-between">
        <div className="flex justify-between w-full px-4 py-3 relative gap-4">
          <label
            className="size-full absolute left-0 top-0"
            htmlFor="background"
          />
          <span className="text-muted-foreground">Background</span>
          <ColorInput
            initialValue={rgbToHex(initialValues.backgroundColor)}
            id="background"
            onChange={updateBackgroundColor}
          />
        </div>
        <div className="flex justify-between w-full items-center px-4 py-3 gap-4">
          <span className="text-muted-foreground">Brightness</span>
          <div className="w-55 max-w-55">
            <Slider
              min={0}
              max={100}
              initialValue={initialValues.backgroundBrightness}
              onChange={updateBrightness}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
