import { signal } from '@preact/signals'
import { State } from '../constants/interfaces/State'

export const state = signal<State | null>(null)

export const images = signal<string[] | null>(null)
