import { useSignal } from '@preact/signals'
import debounceFunction from 'debounce-fn'
import useEmblaCarousel from 'embla-carousel-react'
import { ArrowLeft, ArrowRight } from 'lucide-preact'
import { useCallback, useEffect } from 'preact/hooks'
import { Mode } from '../constants/enums/Mode'
import { IconButton } from './IconButton'

type CarouselItem = {
  title: string
  id: Mode
  hasConfiguration: boolean
}

type CarouselProps = {
  slides: CarouselItem[]
  initialValue?: number
  onClickSettings?: () => void
  onChange?: (index: number, initial?: boolean) => void
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
    onChange?.(selectedIndex.value, true)

    emblaApi.on('select', onSelect)
  }, [emblaApi])

  return (
    <div className="w-full relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex -ml-4 touch-pan-y">
          {slides.map(({ id, title, hasConfiguration }) => (
            <div
              className="w-9/12 aspect-square shrink-0 justify-center pl-4 box-content"
              key={id}
            >
              <div className="size-full border border-secondary rounded-3xl flex items-center justify-center relative">
                <span className="text-7xl font-blazeface">{title}</span>
                {hasConfiguration && (
                  <div
                    className="absolute h-full w-5/6 flex justify-center items-end pb-3"
                    onClick={onClickSettings}
                  >
                    <span className="text-muted-foreground">
                      Tap to configure
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute top-0 left-0 h-full w-1/12 bg-linear-to-r from-background via-50% via-background/65 to-transparent" />
      <div className="absolute top-0 right-0 h-full w-1/12 bg-linear-to-l from-background via-50% via-background/65 to-transparent" />

      <IconButton
        aria-label="previous"
        className="absolute top-1/2 left-5 -translate-y-1/2"
        onClick={onPrevButtonClick}
      >
        <ArrowLeft />
      </IconButton>
      <IconButton
        aria-label="next"
        className="absolute top-1/2 right-5 -translate-y-1/2"
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
