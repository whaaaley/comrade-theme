
import { assertEquals } from 'asserts'
import * as comrade from '../index.js'

Deno.test('getColorLocations should throw an error if the input is not an object', () => {
  const testFunction = () => {
    comrade.getColorLocations('not an object')
  }
  assertThrows(testFunction, TypeError, 'Input should be an object')
})

Deno.test('getColorLocations should return empty object when input is empty', () => {
  const input = {}
  const expected = {}
  const actual = comrade.getColorLocations(input)
  assertEquals(actual, expected)
})

Deno.test('getColorLocations should handle different color formats', () => {
  const input = {
    a: {
      b: '#FFF',
      c: '#FFFFFF',
      d: 'rgb(255, 255, 255)'
    }
  }
  const expected = {
    a: {
      '#FFF': ['a.b'],
      '#FFFFFF': ['a.c'],
      'rgb(255, 255, 255)': ['a.d']
    }
  }
  const actual = comrade.getColorLocations(input)
  assertEquals(actual, expected)
})

Deno.test('getColorLocations should ignore invalid color values', () => {
  const input = {
    a: {
      b: '#ZZZ',
      c: 'rgb(300, 0, 0)'
    }
  }
  const expected = {}
  const actual = comrade.getColorLocations(input)
  assertEquals(actual, expected)
})

Deno.test('getColorLocations should ignore color values that are not in the expected location', () => {
  const input = {
    a: [
      '#FFF'
    ]
  }
  const expected = {}
  const actual = comrade.getColorLocations(input)
  assertEquals(actual, expected)
})

Deno.test('getColorLocations should handle duplicate color values within the same object or nested objects', () => {
  const input = {
    a: {
      b: '#FFF',
      c: '#FFF'
    },
    d: {
      e: '#FFF'
    }
  }
  const expected = {
    a: {
      '#FFF': ['b', 'c']
    },
    d: {
      '#FFF': ['e']
    }
  }
  const actual = comrade.getColorLocations(input)
  assertEquals(actual, expected)
})


Deno.test('getColorLocations should return empty object when no colors are present', () => {
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

Deno.test('getColorLocations should map colors and their locations at the top level', () => {
  const input = {
    a: {
      b: '#A348A4',
      c: '#A348A4',
      d: '#4B6120'
    }
  }
  const expected = {
    a: {
      '#A348A4': ['a.b', 'a.c'],
      '#4B6120': ['a.d']
    }
  }
  const actual = comrade.getColorLocations(input)
  assertEquals(actual, expected)
})

Deno.test('getColorLocations should map colors and their locations nested within objects', () => {
  const input = {
    a: {
      b: '#E0329A',
      c: {
        d: '#4D2C3D',
        e: '#E0329A'
      }
    },
    f: {
      g: '#317F3D',
      h: {
        i: '#AA763F',
        j: '#DF83C4'
      }
    }
  }
  const expected = {
    a: {
      '#E0329A': ['a.b', 'a.c.e'],
      '#4D2C3D': ['a.c.d']
    },
    f: {
      '#317F3D': ['f.g'],
      '#AA763F': ['f.h.i'],
      '#DF83C4': ['f.h.j']
    }
  }
  const actual = comrade.getColorLocations(input)
  assertEquals(actual, expected)
})

Deno.test('getColorLocations should handle circular references', () => {
  const input = {}
  input.a = input

  const expected = {}
  const actual = comrade.getColorLocations(input)

  assertEquals(actual, expected)
})
