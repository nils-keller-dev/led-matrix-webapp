interface Global {
  mode?: string
  brightness?: number
}

interface Text {
  text?: string
  speed?: number
  size?: number
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
