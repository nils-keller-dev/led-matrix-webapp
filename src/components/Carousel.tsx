import { useSignal } from '@preact/signals'
import debounceFunction from 'debounce-fn'
import useEmblaCarousel from 'embla-carousel-react'
import { ArrowLeft, ArrowRight, Settings2 } from 'lucide-preact'
import { useCallback, useEffect } from 'preact/hooks'
import { Mode } from '../constants/enums/Mode'
import { IconButton } from './IconButton'

type CarouselItem = {
  title: string
  id: Mode
  hasSettingsIcon: boolean
}

type CarouselProps = {
  slides: CarouselItem[]
  initialValue?: number
  onClickSettings?: () => void
  onChange?: (index: number) => void
}

export function Carousel({
  slides,
  initialValue = 0,
  onClickSettings,
  onChange
}: CarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })

  const selectedIndex = useSignal(0)
  const scrollSnaps = useSignal<number[]>([])

  const onPrevButtonClick = () => {
    if (!emblaApi) return
    emblaApi.scrollPrev()
  }

  const onNextButtonClick = () => {
    if (!emblaApi) return
    emblaApi.scrollNext()
  }

  const debouncedOnChange = useCallback(
    debounceFunction(
      () => {
        onChange?.(selectedIndex.value)
      },
      { wait: 500 }
    ),
    []
  )

  const onSelect = () => {
    if (!emblaApi) return
    selectedIndex.value = emblaApi.selectedScrollSnap()
    debouncedOnChange()
  }

  useEffect(() => {
    if (!emblaApi) return

    scrollSnaps.value = emblaApi.scrollSnapList()

    emblaApi.scrollTo(initialValue, true)
    selectedIndex.value = emblaApi.selectedScrollSnap()

    emblaApi.on('select', onSelect)
  }, [emblaApi])

  return (
    <div className="w-full relative">
      <div className="gap-8 overflow-hidden" ref={emblaRef}>
        <div className="flex -ml-4 touch-pan-y">
          {slides.map(({ id, title, hasSettingsIcon }) => (
            <div
              className="w-9/12 aspect-square shrink-0 justify-center pl-4"
              key={id}
            >
              <div className="text-7xl font-abril size-full border border-secondary rounded-3xl flex items-center justify-center relative">
                {title}
                {hasSettingsIcon && (
                  <IconButton
                    class="absolute top-2 right-2"
                    onClick={onClickSettings}
                  >
                    <Settings2 />
                  </IconButton>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute top-0 left-0 h-full w-[12.5%] bg-gradient-to-r from-background via-50% via-background/75 to-transparent" />
      <div className="absolute top-0 right-0 h-full w-[12.5%] bg-gradient-to-l from-background via-50% via-background/75 to-transparent" />

      <IconButton
        class="absolute top-1/2 left-5 -translate-y-1/2"
        onClick={onPrevButtonClick}
      >
        <ArrowLeft />
      </IconButton>
      <IconButton
        class="absolute top-1/2 right-5 -translate-y-1/2"
        onClick={onNextButtonClick}
      >
        <ArrowRight />
      </IconButton>

      <div className="flex justify-center gap-1 mt-2">
        {scrollSnaps.value.map((_, index) => (
          <div
            key={index}
            className={`size-2 rounded-full ${
              index === selectedIndex.value
                ? 'bg-muted-foreground'
                : 'bg-secondary'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
