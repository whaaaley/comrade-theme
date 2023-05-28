
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

export const getColorLocations = (nestedObj, path = '') => {
  const colorLocations = {}

  for (const key in nestedObj) {
    const newPath = path ? `${path}.${key}` : key

    if (typeof nestedObj[key] === 'object' && nestedObj[key] !== null) {
      const nestedColors = getColorLocations(nestedObj[key], newPath)

      for (const color in nestedColors) {
        if (!colorLocations[color]) {
          colorLocations[color] = []
        }

        colorLocations[color].push(...nestedColors[color])
      }
    } else if (colord(nestedObj[key]).isValid()) {
      if (!colorLocations[nestedObj[key]]) {
        colorLocations[nestedObj[key]] = []
      }

      colorLocations[nestedObj[key]].push(newPath)
    }
  }

  return colorLocations
}
