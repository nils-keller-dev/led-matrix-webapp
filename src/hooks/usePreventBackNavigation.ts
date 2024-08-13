import { useEffect } from 'preact/hooks'

export const usePreventBackNavigation = (onBackPress: () => void) => {
  useEffect(() => {
    window.history.pushState(null, '', window.location.href)

    const handlePopState = () => {
      window.history.pushState(null, '', window.location.href)
      if (typeof onBackPress === 'function') {
        onBackPress()
      }
    }

    window.addEventListener('popstate', handlePopState)

    return () => {
      window.removeEventListener('popstate', handlePopState)
    }
  }, [onBackPress])
}
