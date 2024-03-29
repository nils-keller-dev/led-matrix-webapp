import { useSignal } from '@preact/signals'
import { LoaderCircle, Sun, SunDim } from 'lucide-preact'
import { useEffect } from 'preact/hooks'
import { getData } from './api/data.get'
import { postJson } from './api/json.post'
import { Carousel } from './components/Carousel'
import { ColorInput } from './components/ColorInput'
import { Drawer } from './components/Drawer'
import { Image } from './components/settingGroup/Image'
import { Text } from './components/settingGroup/Text'
import { Slider } from './components/Slider'
import { CAROUSEL_ITEMS } from './constants/CarouselItems'
import { Mode } from './constants/enums/Mode'
import { Data } from './constants/interfaces/Data'
import { hexToRgb, rgbToHex } from './utils/ColorConversion'

export default function App() {
  const data = useSignal<Data | null>(null)
  const currentCarouselIndex = useSignal(-1)

  const isDrawerOpen = useSignal(false)

  const onClickCarouselSettings = () => {
    isDrawerOpen.value = true
  }

  const onChangeIsDrawerExpanded = (isExpanded: boolean) => {
    isDrawerOpen.value = isExpanded
  }

  const onChangeCarouselIndex = (index: number, initial?: boolean) => {
    currentCarouselIndex.value = index

    if (initial) return
    postJson({ mode: Mode[CAROUSEL_ITEMS[index].id] })
  }

  const updateBrightness = (brightness: number) => {
    postJson({ brightness })
  }

  const updateColor = (color: string) => {
    postJson({ color: hexToRgb(color) })
  }

  useEffect(() => {
    getData().then((newData) => {
      data.value = newData
    })
  }, [])

  return (
    <div className="bg-background text-primary size-full">
      {data.value ? (
        <div className="size-full flex items-center">
          <Carousel
            slides={CAROUSEL_ITEMS}
            initialValue={Mode[data.value.mode as keyof typeof Mode]}
            onClickSettings={onClickCarouselSettings}
            onChange={onChangeCarouselIndex}
          />
          {currentCarouselIndex.value >= 0 && (
            <Drawer
              header={
                <div className="flex flex-col gap-5">
                  <div className="flex gap-3 flex-row">
                    <SunDim class="text-muted-foreground shrink-0" />
                    <Slider
                      min={0}
                      max={100}
                      initialValue={data.value?.brightness}
                      onChange={updateBrightness}
                    />
                    <Sun class="text-muted-foreground shrink-0" />
                  </div>
                  <ColorInput
                    initialValue={rgbToHex(data.value.color!)}
                    onChange={updateColor}
                  />
                </div>
              }
              isExpanded={isDrawerOpen.value}
              onChangeIsExpanded={onChangeIsDrawerExpanded}
              childrenId={currentCarouselIndex.value}
            >
              {CAROUSEL_ITEMS[currentCarouselIndex.value].hasSettingsIcon && (
                <>
                  {currentCarouselIndex.value === 2 && (
                    <Image image={data.value.image!} />
                  )}
                  {currentCarouselIndex.value === 3 && (
                    <Text
                      text={data.value.text!}
                      vertical={data.value.vertical!}
                      textSpeed={data.value.textSpeed!}
                    />
                  )}
                </>
              )}
            </Drawer>
          )}
        </div>
      ) : (
        <div className="flex items-center justify-center size-full">
          <LoaderCircle className="size-5 animate-spin" />
        </div>
      )}
    </div>
  )
}
