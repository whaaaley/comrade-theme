
import { assert } from 'asserts'
import { isEqual } from 'lodash'
import { nearestColor } from '../index.js'

Deno.test('nearestColor should return the nearest color from a list', () => {
  const actual = nearestColor('#7F9E7F', ['#D8A547', '#A66E9C', '#C1BDA3'])
  const expected = { color: '#C1BDA3', delta: 0.172 }
  assert(isEqual(actual, expected))
})

Deno.test('nearestColor should return the nearest color when given a grayscale color', () => {
  const actual = nearestColor('#808080', ['#D8A547', '#A66E9C', '#C1BDA3'])
  const expected = { color: '#C1BDA3', delta: 0.216 }
  assert(isEqual(actual, expected))
})

Deno.test('nearestColor should return the nearest color from a list when only one color is available', () => {
  const actual = nearestColor('#7F9E7F', ['#D8A547'])
  const expected = { color: '#D8A547', delta: 0.285 }
  assert(isEqual(actual, expected))
})
