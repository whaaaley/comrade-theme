import { assertEquals } from 'https://deno.land/std/testing/asserts.ts'
import { mergeThemes } from '../index.js'

Deno.test('mergeThemes should return a merged theme when two non-empty themes are provided', () => {
  const theme1 = {
    a: {
      '#123456': ['a.b', 'a.c.e'],
      '#789ABC': ['a.c.d']
    },
    f: {
      '#DEF123': ['f.g'],
      '#456DEF': ['f.h.i'],
      '#ABC789': ['f.h.j']
    }
  }
  const theme2 = {
    a: {
      '#FF0000': ['a.b', 'a.c.e'],
      '#00FF00': ['a.c.d']
    },
    f: {
      '#0000FF': ['f.g'],
      '#FFFF00': ['f.h.i'],
      '#FF00FF': ['f.h.j']
    }
  }
  const expected = {
    a: {
      '#993333': ['a.b', 'a.c.e', 'a.c.d']
    },
    f: {
      '#557F77': ['f.g', 'f.h.i', 'f.h.j']
    }
  }
  const mergedTheme = mergeThemes(theme1, theme2)
  assertEquals(mergedTheme, expected)
})

Deno.test('mergeThemes should return the same theme when the second theme is empty', () => {
  const theme1 = {
    a: {
      '#123456': ['a.b', 'a.c.e'],
      '#789ABC': ['a.c.d']
    },
    f: {
      '#DEF123': ['f.g'],
      '#456DEF': ['f.h.i'],
      '#ABC789': ['f.h.j']
    }
  }
  const theme2 = {}
  const expected = {
    a: {
      '#789DEF': ['a.b', 'a.c.e', 'a.c.d']
    },
    f: {
      '#789DEF': ['f.g', 'f.h.i', 'f.h.j']
    }
  }
  const mergedTheme = mergeThemes(theme1, theme2)
  assertEquals(mergedTheme, expected)
})

Deno.test('mergeThemes should return an empty theme when both themes are empty', () => {
  const theme1 = {}
  const theme2 = {}
  const expected = {}
  const mergedTheme = mergeThemes(theme1, theme2)
  assertEquals(mergedTheme, expected)
})

Deno.test('mergeThemes should return a merged theme when one theme has a key not present in the other', () => {
  const theme1 = {
    a: {
      '#123456': ['a.b', 'a.c.e'],
      '#789ABC': ['a.c.d']
    }
  }
  const theme2 = {
    f: {
      '#FF0000': ['f.g'],
      '#00FF00': ['f.h.i'],
      '#FF00FF': ['f.h.j']
    }
  }
  const expected = {
    a: {
      '#789DEF': ['a.b', 'a.c.e', 'a.c.d']
    },
    f: {
      '#00FFFF': ['f.g'],
      '#55AA55': ['f.h.i'],
      '#FF00FF': ['f.h.j']
    }
  }
  const mergedTheme = mergeThemes(theme1, theme2)
  assertEquals(mergedTheme, expected)
})
