import { Data } from '../interfaces/Data'

export const getData = (): Promise<Data> => {
  return fetch('/data').then((response) => response.json())
}
