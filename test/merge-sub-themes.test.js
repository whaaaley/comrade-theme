
import { assert } from 'asserts'
import { isEqual } from 'lodash'
import { mergeSubThemes } from '../index.js'

Deno.test('mergeSubThemes should return the first theme when the second theme is empty', () => {
  const subTheme1 = {
    '#FFFFFF': ['foo', 'bar'],
    '#000000': ['baz']
  }
  const subTheme2 = {}
  const expected = subTheme1
  const mergedSubTheme = mergeSubThemes(subTheme1, subTheme2)
  assert(isEqual(mergedSubTheme, expected))
})

// Todo: Use black, white, dark gray and light gray for easier understanding
Deno.test('mergeSubThemes should return merged subThemes with averaged color values', () => {
  const subTheme1 = {
    '#0BE672': ['a.b', 'a.c.e'], // Nearest to #59A8F3
    '#D47F3A': ['a.c.d'] // Nearest to #C20196
  }
  const subTheme2 = {
    '#C20196': ['a.b', 'a.c.e'],
    '#59A8F3': ['a.c.d']
  }
  const expected = {
    '#54C7B6': ['a.b', 'a.c.e'], // Average of #0BE672 and #59A8F3
    '#CE546C': ['a.c.d'] // Average of #D47F3A and #C20196
  }
  const mergedSubTheme = mergeSubThemes(subTheme1, subTheme2)
  assert(isEqual(mergedSubTheme, expected))
})

Deno.test('mergeSubThemes should return a merged theme with combined paths when two distinct themes are provided', () => {
  const subTheme1 = {
    '#FFFFFF': ['foo', 'bar'],
    '#000000': ['baz']
  }
  const subTheme2 = {
    '#FFFFFF': ['foo', 'bar'],
    '#000000': ['qux']
  }
  const expected = {
    '#FFFFFF': ['foo', 'bar'],
    '#000000': ['baz', 'qux']
  }
  const mergedSubTheme = mergeSubThemes(subTheme1, subTheme2)
  assert(isEqual(mergedSubTheme, expected))
})

Deno.test('mergeSubThemes should return a theme with averaged color keys for nearest colors and merged selectors for identical colors', () => {
  const subTheme1 = {
    '#FFFFFF': ['foo', 'bar'], // white
    '#808080': ['baz'] // gray
  }
  const subTheme2 = {
    '#D3D3D3': ['qux', 'quux'], // light gray, nearest to white
    '#808080': ['quuz', 'quuuz'] // gray, same as in subTheme1
  }
  const expected = {
    '#E9E9E9': ['foo', 'bar'], // average of #FFFFFF and #D3D3D3, keeping selectors from #FFFFFF
    '#808080': ['baz', 'quuz', 'quuuz'] // gray, merged selectors
  }
  const mergedSubTheme = mergeSubThemes(subTheme1, subTheme2)
  assert(isEqual(mergedSubTheme, expected))
})

// Deno.test('mergeSubThemes should', () => {
//   const subTheme1 = {
//     '#FFFFFF': ['foo', 'bar'],
//     '#000000': ['baz']
//   }
//   const subTheme2 = {
//     '#FFFFFF': ['foo', 'bar'],
//     '#000000': ['qux']
//   }
//   const expected = {
//     '#FFFFFF': ['foo', 'bar'],
//     '#000000': ['baz', 'qux']
//   }
//   const mergedSubTheme = mergeSubThemes(subTheme1, subTheme2)
//   assert(isEqual(mergedSubTheme, expected))
// })
