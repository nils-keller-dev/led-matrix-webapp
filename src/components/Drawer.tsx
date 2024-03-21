import { useSignal } from '@preact/signals'
import { JSX } from 'preact'
import { useEffect, useRef } from 'preact/hooks'

type DrawerProps = {
  children: JSX.Element
  header: JSX.Element
  isExpanded: boolean
  onChangeIsExpanded: (isExpanded: boolean) => void
}

const PADDING_BOTTOM = 30
const BACKDROP_BLUR = 3
const BACKDROP_BRIGHTNESS = 0.5

const getYPosition = (e: MouseEvent | TouchEvent) => {
  return e instanceof MouseEvent ? e.clientY : e.touches[0].clientY
}

const clamp = (value: number, min: number, max: number) => {
  return Math.max(min, Math.min(max, value))
}

export function Drawer({
  children,
  header,
  isExpanded,
  onChangeIsExpanded
}: DrawerProps) {
  const drawerRef = useRef<HTMLDivElement>(null)
  const hasCalculatedHeaderHeight = useSignal(false)

  const expandedHeight = useSignal(0)
  const collapsedHeight = useSignal(0)
  const currentHeight = useSignal(0)
  const collapsedExpandedDelta = useSignal(0)

  const previousDragY = useSignal(0)

  useEffect(() => {
    isExpanded ? expand() : collapse()
  }, [isExpanded])

  useEffect(() => {
    if (!drawerRef.current) return

    const height = drawerRef.current.clientHeight - PADDING_BOTTOM

    if (!hasCalculatedHeaderHeight.value) {
      collapsedHeight.value = height
      hasCalculatedHeaderHeight.value = true
    } else {
      expandedHeight.value = height
      collapsedExpandedDelta.value =
        expandedHeight.value - collapsedHeight.value

      updateStyles(collapsedHeight.value)
    }
  }, [hasCalculatedHeaderHeight.value]) // run again to calculate expandedHeight

  const updateStyles = (height: number) => {
    document.body.style.setProperty('--drawer-visible-height', `${height}px`)

    const percentOfExpanded = clamp(
      (height - collapsedHeight.value) / collapsedExpandedDelta.value,
      0,
      1
    )

    document.body.style.setProperty(
      '--drawer-backdrop-blur',
      `${percentOfExpanded * BACKDROP_BLUR}px`
    )

    document.body.style.setProperty(
      '--drawer-backdrop-brightness',
      (1 - percentOfExpanded * BACKDROP_BRIGHTNESS).toString()
    )

    currentHeight.value = height
  }

  const handleDrag = (e: MouseEvent | TouchEvent) => {
    const clientY = getYPosition(e)

    const calculatedHeight =
      currentHeight.value + (previousDragY.value - clientY)

    const newHeight = clamp(
      calculatedHeight,
      collapsedHeight.value - PADDING_BOTTOM,
      expandedHeight.value + PADDING_BOTTOM
    )

    updateStyles(newHeight)

    previousDragY.value = clientY
  }

  const startDrag = (e: MouseEvent | TouchEvent) => {
    previousDragY.value = getYPosition(e)
    drawerRef.current?.style.setProperty('transition', 'none')

    handleDrag(e)

    addEventListener('mousemove', handleDrag)
    addEventListener('touchmove', handleDrag)
    addEventListener('mouseup', stopDrag)
    addEventListener('touchend', stopDrag)
  }

  const stopDrag = () => {
    drawerRef.current?.style.removeProperty('transition')

    const distanceToExpanded = Math.abs(
      currentHeight.value - expandedHeight.value
    )

    const distanceToCollapsed = Math.abs(
      currentHeight.value - collapsedHeight.value
    )

    distanceToExpanded < distanceToCollapsed ? expand() : collapse()

    removeEventListener('mousemove', handleDrag)
    removeEventListener('touchmove', handleDrag)
    removeEventListener('mouseup', stopDrag)
    removeEventListener('touchend', stopDrag)
  }

  const collapse = () => {
    updateStyles(collapsedHeight.value)
    onChangeIsExpanded(false)
  }

  const expand = () => {
    updateStyles(expandedHeight.value)
    onChangeIsExpanded(true)
  }

  const toggle = () => {
    isExpanded ? collapse() : expand()
  }

  return (
    <div className="size-full absolute pointer-events-none">
      {currentHeight.value > collapsedHeight.value && (
        <div
          onClick={collapse}
          className="size-full backdrop-blur-[--drawer-backdrop-blur] backdrop-brightness-[--drawer-backdrop-brightness] pointer-events-auto"
        />
      )}
      <div
        ref={drawerRef}
        onMouseDown={startDrag}
        onTouchStart={startDrag}
        className="pb-[30px] w-full px-7 pt-4 rounded-t-xl border border-secondary border-b-0 fixed top-full bg-background -translate-y-[--drawer-visible-height] transition-transform pointer-events-auto"
      >
        <div
          className="bg-secondary w-24 h-2 rounded-full mx-auto mb-7"
          onClick={toggle}
        />
        <div className="mb-7">{header}</div>
        <div className="mb-7">
          {hasCalculatedHeaderHeight.value && children}
        </div>
      </div>
    </div>
  )
}
