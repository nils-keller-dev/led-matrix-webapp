import { Sun, SunDim } from 'lucide-preact'
import { Slider } from './Slider'

type GlobalConfigurationProps = {
  brightness: number
  updateBrightness: (brightness: number) => void
}

export function GlobalConfiguration({
  brightness,
  updateBrightness
}: GlobalConfigurationProps) {
  return (
    <div className="flex flex-col gap-5 w-full p-7">
      <div className="flex gap-3 flex-row">
        <SunDim class="text-muted-foreground shrink-0" />
        <Slider
          min={3}
          max={100}
          initialValue={brightness}
          onChange={updateBrightness}
        />
        <Sun class="text-muted-foreground shrink-0" />
      </div>
    </div>
  )
}
