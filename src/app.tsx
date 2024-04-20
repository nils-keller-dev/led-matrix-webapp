import { useSignal } from '@preact/signals'
import { LoaderCircle } from 'lucide-preact'
import { useEffect } from 'preact/hooks'
import { getData } from './api/data.get'
import { getImages } from './api/images.get'
import { postJson } from './api/json.post'
import { Carousel } from './components/Carousel'
import { Drawer } from './components/Drawer'
import { GlobalConfiguration } from './components/GlobalConfiguration'
import { Header } from './components/Header'
import { Image } from './components/settingGroup/Image'
import { Text } from './components/settingGroup/Text'
import { CAROUSEL_ITEMS } from './constants/CarouselItems'
import { Mode } from './constants/enums/Mode'
import { data, images } from './store/store'
import { hexToRgb } from './utils/ColorConversion'

export default function App() {
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
        <div className="flex flex-col justify-between h-full">
          <Header />
          <div className="flex flex-col gap-10">
            <Carousel
              slides={CAROUSEL_ITEMS}
              initialValue={Mode[data.value.mode as keyof typeof Mode]}
              onClickSettings={onClickCarouselSettings}
              onChange={onChangeCarouselIndex}
            />
            <GlobalConfiguration
              brightness={data.value.brightness!}
              color={data.value.color!}
              updateBrightness={updateBrightness}
              updateColor={updateColor}
            />
          </div>
          <Drawer
            isExpanded={isDrawerOpen.value}
            onChangeIsExpanded={onChangeIsDrawerExpanded}
          >
            {currentCarouselIndex.value >= 0 && (
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
        </div>
      ) : (
        <div className="flex items-center justify-center size-screen">
          <LoaderCircle className="size-5 animate-spin" />
        </div>
      )}
    </>
  )
}
