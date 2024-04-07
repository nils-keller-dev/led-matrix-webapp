import { useSignal } from '@preact/signals'
import { LoaderCircle, Sun, SunDim } from 'lucide-preact'
import { useEffect } from 'preact/hooks'
import { getData } from './api/data.get'
import { getImages } from './api/images.get'
import { postJson } from './api/json.post'
import { Carousel } from './components/Carousel'
import { ColorInput } from './components/ColorInput'
import { Drawer } from './components/Drawer'
import { Header } from './components/Header'
import { Image } from './components/settingGroup/Image'
import { Text } from './components/settingGroup/Text'
import { Slider } from './components/Slider'
import { CAROUSEL_ITEMS } from './constants/CarouselItems'
import { Mode } from './constants/enums/Mode'
import { Data } from './constants/interfaces/Data'
import { hexToRgb, rgbToHex } from './utils/ColorConversion'

export default function App() {
  const data = useSignal<Data | null>(null)
  const images = useSignal<string[] | null>(null)
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

    getImages().then((newImages) => {
      images.value = newImages
    })
  }, [])

  return (
    <>
      {data.value && images.value ? (
        <div className="w-screen h-screen">
          <Header />
          <div className="flex size-full items-end pb-72">
            <Carousel
              slides={CAROUSEL_ITEMS}
              initialValue={Mode[data.value.mode as keyof typeof Mode]}
              onClickSettings={onClickCarouselSettings}
              onChange={onChangeCarouselIndex}
            />
            <div className="flex flex-col gap-5 fixed w-full p-7 bottom-0 border-secondary border-t">
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
          </div>
          <Drawer
            isExpanded={isDrawerOpen.value}
            onChangeIsExpanded={onChangeIsDrawerExpanded}
          >
            {currentCarouselIndex.value >= 0 && (
              <>
                {currentCarouselIndex.value === 2 && (
                  <Image image={data.value.image!} images={images.value} />
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
        </div>
      ) : (
        <div className="flex items-center justify-center w-screen h-screen">
          <LoaderCircle className="size-5 animate-spin" />
        </div>
      )}
    </>
  )
}
