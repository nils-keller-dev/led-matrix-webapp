import { Mode } from './enums/Mode'

export const CAROUSEL_ITEMS = [
  {
    id: Mode.clock,
    title: 'Clock',
    hasConfiguration: true
  },
  {
    id: Mode.music,
    title: 'Music',
    hasConfiguration: false
  },
  {
    id: Mode.image,
    title: 'Image',
    hasConfiguration: true
  },
  {
    id: Mode.text,
    title: 'Text',
    hasConfiguration: true
  },
  {
    id: Mode.idle,
    title: 'Idle',
    hasConfiguration: false
  }
]
