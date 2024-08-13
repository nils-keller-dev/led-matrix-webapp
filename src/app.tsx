import { useSignal } from '@preact/signals'
import { LoaderCircle } from 'lucide-preact'
import { useEffect } from 'preact/hooks'
import { getImages } from './api/images.get'
import { getState } from './api/state.get'
import { patchState } from './api/state.patch'
import { Carousel } from './components/Carousel'
import { Drawer } from './components/Drawer'
import { GlobalConfiguration } from './components/GlobalConfiguration'
import { Header } from './components/Header'
import { Clock } from './components/settingGroup/Clock'
import { Image } from './components/settingGroup/Image'
import { Music } from './components/settingGroup/Music'
import { Text } from './components/settingGroup/Text'
import { CAROUSEL_ITEMS } from './constants/CarouselItems'
import { Mode } from './constants/enums/Mode'
import { usePreventBackNavigation } from './hooks/usePreventBackNavigation'
import { images, state } from './store/store'

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
    patchState({ global: { mode: Mode[CAROUSEL_ITEMS[index].id] } })
  }

  const updateBrightness = (brightness: number) => {
    patchState({ global: { brightness } })
  }

  useEffect(() => {
    getState().then((newState) => {
      state.value = newState
    })

    getImages().then((newImages) => {
      images.value = newImages
    })
  }, [])

  usePreventBackNavigation(() => {
    isDrawerOpen.value = false
  })

  return (
    <>
      {state.value && images.value ? (
        <div className="flex flex-col justify-between h-full">
          <Header />
          <div className="flex flex-col gap-10">
            <Carousel
              slides={CAROUSEL_ITEMS}
              initialValue={Mode[state.value.global.mode as keyof typeof Mode]}
              onClickSettings={onClickCarouselSettings}
              onChange={onChangeCarouselIndex}
            />
            <GlobalConfiguration
              brightness={state.value.global.brightness!}
              updateBrightness={updateBrightness}
            />
          </div>
          <Drawer
            isExpanded={isDrawerOpen.value}
            onChangeIsExpanded={onChangeIsDrawerExpanded}
          >
            {currentCarouselIndex.value >= 0 && (
              <>
                {currentCarouselIndex.value === 0 && (
                  <Clock color={state.value.clock.color!} />
                )}
                {currentCarouselIndex.value === 1 && (
                  <Music fullscreen={state.value.music.fullscreen!} />
                )}
                {currentCarouselIndex.value === 2 && (
                  <Image image={state.value.image.image!} />
                )}
                {currentCarouselIndex.value === 3 && (
                  <Text
                    align={state.value.text.align!}
                    text={state.value.text.text!}
                    size={state.value.text.size!}
                    speed={state.value.text.speed!}
                    color={state.value.text.color!}
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
