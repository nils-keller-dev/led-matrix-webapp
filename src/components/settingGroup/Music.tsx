import { patchState } from '../../api/state.patch'
import { state } from '../../store/store'
import { InputWrapper } from '../InputWrapper'
import { Switch } from '../Switch'

type MusicSettingsProps = {
  fullscreen: boolean
}

export function Music(initialValues: MusicSettingsProps) {
  const updateFullscreen = (fullscreen: boolean) => {
    patchState({ music: { fullscreen } }).then(() => {
      state.value!.music.fullscreen = fullscreen
    })
  }

  return (
    <InputWrapper title="Fullscreen">
      <Switch
        initialValue={initialValues.fullscreen}
        onChange={updateFullscreen}
      />
    </InputWrapper>
  )
}
