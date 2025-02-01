import { patchState } from '../../api/state.patch'
import { state } from '../../store/store'
import { hexToRgb, rgbToHex } from '../../utils/ColorConversion'
import { ColorInput } from '../ColorInput'

type ClockSettingsProps = {
  color: number[]
  backgroundColor: number[]
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

  return (
    <div className="flex flex-col gap-5">
      <ColorInput
        initialValue={rgbToHex(initialValues.color)}
        onChange={updateColor}
      />
      <ColorInput
        initialValue={rgbToHex(initialValues.backgroundColor)}
        onChange={updateBackgroundColor}
      />
    </div>
  )
}
