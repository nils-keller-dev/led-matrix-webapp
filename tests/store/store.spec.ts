import { describe, expect, test } from 'vitest'
import { images, state } from '../../src/store/store'

describe('store', () => {
  test('initializes state as null', () => {
    expect(state.value).toBeNull()
  })

  test('initializes images as null', () => {
    expect(images.value).toBeNull()
  })
})
