
import { assert } from 'asserts'
import { isEqual } from 'lodash'
import * as comrade from '../index.js'

Deno.test('nestedObject should return an empty object for an empty input', () => {
  const input = {}
  const expected = {}
  const actual = comrade.nestedObject(input)
  assert(isEqual(actual, expected))
})

Deno.test('nestedObject should create nested structure for single path input', () => {
  const input = {
    'a.b.c': 1
  }
  const expected = {
    a: {
      b: {
        c: 1
      }
    }
  }
  const actual = comrade.nestedObject(input)
  assert(isEqual(actual, expected))
})

Deno.test('nestedObject should handle special characters in paths', () => {
  const input = {
    'a.b.c!': 1,
    'a.b.c@': 2
  }
  const expected = {
    a: {
      b: {
        'c!': 1,
        'c@': 2
      }
    }
  }
  const actual = comrade.nestedObject(input)
  assert(isEqual(actual, expected))
})

Deno.test('nestedObject should create nested structure for multiple paths under the same parent', () => {
  const input = {
    'a.b.c': 1,
    'a.b.d': 2
  }
  const expected = {
    a: {
      b: {
        c: 1,
        d: 2
      }
    }
  }
  const actual = comrade.nestedObject(input)
  assert(isEqual(actual, expected))
})

Deno.test('nestedObject should handle multiple distinct paths', () => {
  const input = {
    'a.b.c': 1,
    'a.b.d': 2,
    'x.y.z': 3
  }
  const expected = {
    a: {
      b: {
        c: 1,
        d: 2
      }
    },
    x: {
      y: {
        z: 3
      }
    }
  }
  const actual = comrade.nestedObject(input)
  assert(isEqual(actual, expected))
})
