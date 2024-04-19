import { signal } from '@preact/signals'
import { Data } from '../constants/interfaces/Data'

export const data = signal<Data | null>(null)

export const images = signal<string[] | null>(null)
