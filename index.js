
import JSON5 from 'https://esm.sh/json5@2.2.3'
import { colord } from 'https://esm.sh/colord@2.9.3'

export const loadTheme = async path => JSON5.parse(await Deno.readTextFile(path))

export const nestedObject = obj => {
  const result = {}

  for (const [key, value] of Object.entries(obj)) {
    const parts = key.split('.')
    let target = result

    for (let i = 0; i < parts.length - 1; i++) {
      const part = parts[i]
      target = target[part] = target[part] || {}
    }

    target[parts[parts.length - 1]] = value
  }

  return result
}

export const getColorLocations = (input, placeholder = '') => {
  if (typeof input !== 'object' || input === null) {
    throw new Error('Input should be an object')
  }

  const result = {}
  const visited = new Set()

  const traverse = (input, prefix = '') => {
    if (visited.has(input)) {
      return placeholder
    }

    visited.add(input)

    for (let [key, value] of Object.entries(input)) {
      let newPrefix = prefix ? `${prefix}.${key}` : key

      if (!Array.isArray(value)) {
        if (typeof value === 'object') { // Ignore arrays
          const obj = traverse(value, newPrefix)

          if (obj === placeholder) {
            result[newPrefix] = result[newPrefix] || placeholder
          }
        } else if (colord(value).isValid()) { // Check if value is a valid color
          let baseKey = newPrefix.split('.')[0]

          result[baseKey] = result[baseKey] || {}
          result[baseKey][value] = result[baseKey][value] || []
          result[baseKey][value].push(newPrefix)
        }
      }
    }
  }

  traverse(input)

  return result
}

export const mergeThemes = (theme1, theme2) => {
  const mergedTheme = {}

  // Merge keys from theme1
  for (const key in theme1) {
    const colorMap1 = theme1[key]
    const colorMap2 = theme2[key] || {}
    const mergedColorMap = {}

    // Merge color maps from theme1 and theme2
    for (const color in colorMap1) {
      const selectors1 = colorMap1[color]
      const selectors2 = colorMap2[color] || []
      const mergedSelectors = [...new Set([...selectors1, ...selectors2])]

      // Merge selectors for the same color
      mergedColorMap[color] = mergedSelectors
    }

    // Add merged color map to merged theme
    mergedTheme[key] = mergedColorMap
  }

  // Merge keys from theme2 that are not in theme1
  for (const key in theme2) {
    if (!theme1.hasOwnProperty(key)) {
      mergedTheme[key] = theme2[key]
    }
  }

  return mergedTheme
}
