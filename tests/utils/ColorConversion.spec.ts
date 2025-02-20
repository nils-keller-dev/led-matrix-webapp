import { hexToRgb, rgbToHex } from '../../src/utils/ColorConversion'
import { describe, it, expect, test } from 'vitest'

const colors = [
  { rgb: [255, 0, 0], hex: '#ff0000' },
  { rgb: [0, 255, 0], hex: '#00ff00' },
  { rgb: [0, 0, 255], hex: '#0000ff' },
  { rgb: [255, 255, 255], hex: '#ffffff' },
  { rgb: [0, 0, 0], hex: '#000000' }
]

describe('ColorConversion', () => {
  describe('rgbToHex', () => {
    test('converts correctly', () => {
      colors.forEach((color) => {
        expect(rgbToHex(color.rgb)).toBe(color.hex)
      })
    })
  })

  describe('hexToRgb', () => {
    it('converts correctly', () => {
      colors.forEach((color) => {
        expect(hexToRgb(color.hex)).toEqual(color.rgb)
      })
    })
  })
})
