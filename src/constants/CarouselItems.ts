import { Mode } from './enums/Mode'

export const CAROUSEL_ITEMS = [
  {
    id: Mode.CLOCK,
    title: 'Clock',
    hasConfiguration: false
  },
  {
    id: Mode.MUSIC,
    title: 'Music',
    hasConfiguration: false
  },
  {
    id: Mode.IMAGE,
    title: 'Image',
    hasConfiguration: true
  },
  {
    id: Mode.TEXT,
    title: 'Text',
    hasConfiguration: true
  },
  {
    id: Mode.IDLE,
    title: 'Idle',
    hasConfiguration: false
  }
]
