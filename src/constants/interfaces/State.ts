import { TextAlign } from '../enums/TextAlign'

interface Global {
  mode?: string
  brightness?: number
}

interface Text {
  align?: TextAlign
  text?: string
  size?: number
  speed?: number
  color?: number[]
}

interface Image {
  image?: string
}

interface Clock {
  color?: number[]
}

export interface State {
  global: Global
  text: Text
  image: Image
  clock: Clock
}
