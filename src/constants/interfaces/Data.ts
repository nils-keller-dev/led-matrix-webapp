interface Global {
  mode?: string
  brightness?: number
  color?: number[]
}

interface Text {
  text?: string
  vertical?: boolean
  speed?: number
  font?: string
}

interface Image {
  image?: string
}

export interface Data {
  global: Global
  text: Text
  image: Image
}
