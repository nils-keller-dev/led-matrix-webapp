import { signal } from '@preact/signals'

const colorNameStore = signal<Record<string, string>>({})

export const fetchColorName = async (hex: string) => {
  if (colorNameStore.value[hex]) return colorNameStore.value[hex]

  const colorData = await fetch(
    `https://www.thecolorapi.com/id?hex=${hex.replace('#', '')}`
  ).then((response) => response.json())

  const colorName = colorData.name.value as string
  colorNameStore.value[hex] = colorName

  return colorName
}
