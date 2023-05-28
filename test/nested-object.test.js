
import { assertEquals } from 'asserts'
import * as comrade from '../index.js'

Deno.test('nestedObject should handle an empty object', () => {
  const input = {}
  const expected = {}
  const actual = comrade.nestedObject(input)
  assertEquals(actual, expected)
})

Deno.test('nestedObject should handle a single key-value pair', () => {
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
  assertEquals(actual, expected)
})

Deno.test('nestedObject should handle keys with special characters', () => {
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
  assertEquals(actual, expected)
})

Deno.test('nestedObject should handle multiple keys with the same prefix', () => {
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
  assertEquals(actual, expected)
})

Deno.test('nestedObject should convert a flat object to a nested object', () => {
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
  assertEquals(actual, expected)
})
