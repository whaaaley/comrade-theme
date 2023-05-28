
import { assertEquals } from 'asserts'
import * as comrade from '../index.js'

Deno.test('getColorLocations should return an empty object when input is empty', () => {
  const input = {}
  const expected = {}
  const actual = comrade.getColorLocations(input)
  assertEquals(actual, expected)
})

Deno.test('getColorLocations should return an empty object when input contains no color values', () => {
  const input = {
    a: {
      b: 'foo',
      c: 'bar'
    },
    d: {
      e: {
        f: 'baz'
      }
    }
  }
  const expected = {}
  const actual = comrade.getColorLocations(input)
  assertEquals(actual, expected)
})

Deno.test('getColorLocations should return an empty object when there are no color values', () => {
  const input = {
    a: 'value',
    b: {
      c: 'value'
    }
  }
  const expected = {}
  const actual = comrade.getColorLocations(input)
  assertEquals(actual, expected)
})

Deno.test('getColorLocations should group a single color value correctly', () => {
  const input = {
    a: {
      b: '#FF0000'
    }
  }
  const expected = {
    '#FF0000': ['a.b']
  }
  const actual = comrade.getColorLocations(input)
  assertEquals(actual, expected)
})

Deno.test('getColorLocations should group multiple color values at the same location correctly', () => {
  const input = {
    a: {
      b: '#FF0000',
      c: '#0000FF',
      d: '#00FF00'
    }
  }
  const expected = {
    '#FF0000': ['a.b'],
    '#0000FF': ['a.c'],
    '#00FF00': ['a.d']
  }
  const actual = comrade.getColorLocations(input)
  assertEquals(actual, expected)
})

Deno.test('getColorLocations should group multiple color values at different locations correctly', () => {
  const input = {
    a: {
      b: '#FF0000',
      c: {
        d: '#0000FF',
        e: '#FF0000'
      }
    },
    f: {
      g: '#00FF00',
      h: {
        i: '#808080',
        j: '#C0C0C0'
      }
    }
  }
  const expected = {
    '#FF0000': ['a.b', 'a.c.e'],
    '#0000FF': ['a.c.d'],
    '#00FF00': ['f.g'],
    '#808080': ['f.h.i'],
    '#C0C0C0': ['f.h.j']
  }
  const actual = comrade.getColorLocations(input)
  assertEquals(actual, expected)
})
