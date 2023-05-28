
import { assert, assertThrows } from 'asserts'
import { isEqual } from 'lodash'
import { getColorLocations } from '../index.js'

Deno.test('getColorLocations should return an empty object for an empty input object', () => {
  const input = {}
  const expected = {}
  const actual = getColorLocations(input)
  assert(isEqual(actual, expected))
})

Deno.test('getColorLocations should return an empty object when no valid color values are found', () => {
  const input = {
    a: {
      b: '#ZZZ', // #ZZZ is not a valid color
      c: 'not a color'
    }
  }
  const expected = {}
  const actual = getColorLocations(input)
  assert(isEqual(actual, expected))
})

Deno.test('getColorLocations should return an empty object when input contains color values in an array', () => {
  const input = {
    a: ['#FFF']
  }
  const expected = {}
  const actual = getColorLocations(input)
  assert(isEqual(actual, expected))
})

Deno.test('getColorLocations should return an object when valid color values are found', () => {
  const input = {
    a: {
      b: '#ZZZ', // #ZZZ is not a valid color
      c: 'rgb(255, 0, 0)' // rgb(255, 0, 0) is a valid color
    }
  }
  const expected = {
    a: {
      'rgb(255, 0, 0)': ['a.c']
    }
  }
  const actual = getColorLocations(input)
  assert(isEqual(actual, expected))
})

Deno.test('getColorLocations should return an empty object when no valid color values are found in nested structure', () => {
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
  const actual = getColorLocations(input)
  assert(isEqual(actual, expected))
})

Deno.test('getColorLocations should identify color locations with multiple color values', () => {
  const input = {
    a: {
      b: '#456DEF',
      c: '#456DEF',
      d: '#123ABC'
    }
  }
  const expected = {
    a: {
      '#456DEF': ['a.b', 'a.c'],
      '#123ABC': ['a.d']
    }
  }
  const actual = getColorLocations(input)
  assert(isEqual(actual, expected))
})

Deno.test('getColorLocations should identify multiple color locations', () => {
  const input = {
    a: {
      b: '#123ABC',
      c: '#123ABC'
    },
    d: {
      e: '#123ABC'
    }
  }
  const expected = {
    a: {
      '#123ABC': ['a.b', 'a.c']
    },
    d: {
      '#123ABC': ['d.e']
    }
  }
  const actual = getColorLocations(input)
  assert(isEqual(actual, expected))
})

Deno.test('getColorLocations should identify color locations in the input object', () => {
  const input = {
    a: {
      b: '#123ABC',
      c: '#456DEF',
      d: 'rgb(100, 200, 150)'
    }
  }
  const expected = {
    a: {
      '#123ABC': ['a.b'],
      '#456DEF': ['a.c'],
      'rgb(100, 200, 150)': ['a.d']
    }
  }
  const actual = getColorLocations(input)
  assert(isEqual(actual, expected))
})

Deno.test('getColorLocations should identify color locations in deeply nested structure', () => {
  const input = {
    a: {
      b: '#123ABC',
      c: {
        d: '#456DEF',
        e: '#123ABC'
      }
    },
    f: {
      g: '#789ABC',
      h: {
        i: '#ABC789',
        j: '#987DEF'
      }
    }
  }
  const expected = {
    a: {
      '#123ABC': ['a.b', 'a.c.e'],
      '#456DEF': ['a.c.d']
    },
    f: {
      '#789ABC': ['f.g'],
      '#ABC789': ['f.h.i'],
      '#987DEF': ['f.h.j']
    }
  }
  const actual = getColorLocations(input)
  assert(isEqual(actual, expected))
})

Deno.test('getColorLocations should replace circular references with a placeholder', () => {
  const input = {}
  input.a = input
  const placeholder = '[Circular Reference]'
  const expected = { a: placeholder }
  const actual = getColorLocations(input, placeholder)
  assert(isEqual(actual, expected))
})

Deno.test('getColorLocations should throw an error when input is not an object', () => {
  const testFunction = () => getColorLocations('not an object')
  assertThrows(testFunction, Error, 'Input should be an object')
})
