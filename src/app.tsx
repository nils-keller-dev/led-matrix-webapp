import { useSignal } from '@preact/signals'
import { LoaderCircle, Sun, SunDim } from 'lucide-preact'
import { useEffect } from 'preact/hooks'
import { getData } from './api/data.get'
import { postJson } from './api/json.post'
import { Drawer } from './components/Drawer'
import { Slider } from './components/Slider'
import { carouselItems } from './constants/CarouselItems'
import { Data } from './constants/interfaces/Data'
import { Carousel } from './components/Carousel'

export default function App() {
  const data = useSignal<Data | null>(null)

  const isDrawerOpen = useSignal(false)

  const onClickCarouselSettings = () => {
    isDrawerOpen.value = true
  }

  const onChangeIsDrawerExpanded = (isExpanded: boolean) => {
    isDrawerOpen.value = isExpanded
  }

  const updateBrightness = (brightness: number) => {
    postJson({ brightness })
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
            slides={carouselItems}
            options={{ loop: true }}
            onClickSettings={onClickCarouselSettings}
          />
          <Drawer
            header={
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
            }
            isExpanded={isDrawerOpen.value}
            onChangeIsExpanded={onChangeIsDrawerExpanded}
          >
            <div className="h-[100px] flex items-end justify-center text-muted-foreground">
              Hier könnte Ihre Werbung stehen
            </div>
          </Drawer>
        </div>
      ) : (
        <div className="flex items-center justify-center size-full">
          <LoaderCircle className="size-5 animate-spin" />
        </div>
      )}
    </div>
  )
}
