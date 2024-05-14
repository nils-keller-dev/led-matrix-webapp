import { patchState } from '../../api/state.patch'
import { state } from '../../store/store'
import { hexToRgb, rgbToHex } from '../../utils/ColorConversion'
import { ColorInput } from '../ColorInput'

type ClockSettingsProps = {
  color: number[]
}

export function Clock(initialValues: ClockSettingsProps) {
  const updateColor = (color: string) => {
    const rgbColor = hexToRgb(color)
    patchState({ clock: { color: rgbColor } }).then(() => {
      state.value!.clock.color = rgbColor
    })
  }

  return (
    <div className="flex flex-col gap-6">
      <ColorInput
        initialValue={rgbToHex(initialValues.color)}
        onChange={updateColor}
      />
    </div>
  )
}
