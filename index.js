
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

const mergeThemes = async (themePath1, themePath2) => {
  const theme1 = await loadJsonFile(themePath1)
  const theme2 = await loadJsonFile(themePath2)

  const colorLocations1 = getColorLocations(nestedObject(theme1.colors))
  const colorLocations2 = getColorLocations(nestedObject(theme2.colors))

  const newColors = {
    ...theme1.colors
  }

  for (const [color, locations] of Object.entries(colorLocations2)) {
    for (const location of locations) {
      if (newColors[location]) {
        newColors[location] = averageColor(newColors[location], color)
      } else {
        newColors[location] = color
      }
    }
  }

  return {
    ...theme1,
    colors: newColors
  }
}
