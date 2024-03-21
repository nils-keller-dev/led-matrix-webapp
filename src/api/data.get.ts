import { Data } from '../constants/interfaces/Data'

export const getData = (): Promise<Data> => {
  return fetch('/data').then((response) => response.json())
}
