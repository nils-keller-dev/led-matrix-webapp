type TapHoldCallback = (event: TouchEvent) => void

export function handleTapAndHold(
  element: HTMLElement,
  callback: TapHoldCallback
): void {
  let timer: number | undefined

  element.addEventListener('touchstart', (event: TouchEvent) => {
    timer = window.setTimeout(() => {
      callback(event)
    }, 600)
  })

  const clearTimer = () => {
    if (timer) {
      clearTimeout(timer)
    }
  }

  element.addEventListener('touchcancel', clearTimer)
  element.addEventListener('touchend', clearTimer)
}
