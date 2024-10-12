
import JSON5 from 'json5'
import { colord, extend } from 'colord'
import mixPlugin from 'colord/plugins/mix'
import labPlugin from 'colord/plugins/lab'

extend([labPlugin, mixPlugin])

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

    for (const [key, value] of Object.entries(input)) {
      const newPrefix = prefix ? `${prefix}.${key}` : key

      if (!Array.isArray(value)) {
        if (typeof value === 'object') { // Ignore arrays
          const obj = traverse(value, newPrefix)

          if (obj === placeholder) {
            result[newPrefix] = result[newPrefix] || placeholder
          }
        } else if (colord(value).isValid()) { // Check if value is a valid color
          const baseKey = newPrefix.split('.')[0]

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

export const nearestColor = (input, arr) => {
  let result = ''
  let minDelta = Infinity

  for (const color of arr) {
    const delta = colord(input).delta(color)

    if (delta < minDelta) {
      result = color
      minDelta = delta
    }
  }

  return result
}

export const mergeSubThemes = (primary, secondary) => {
  const result = {}
  const secondaryColors = Object.keys(secondary)

  for (const color in primary) {
    const nearest = nearestColor(color, secondaryColors)
    const averagedColor = colord(nearest).mix(color).toHex().toUpperCase()

    if (result[averagedColor] == null) {
      result[averagedColor] = primary[color]
    }
  }

  return result
}

export const compileLocations = ast => {
  // todo
}

export const mergeThemes = (primary, secondary) => {
  primary = getColorLocations(primary.colors)
  secondary = getColorLocations(secondary.colors)

  console.log(primary);
  console.log();
  console.log();
  console.log();
  console.log(secondary);

  const result = {}
  const missing = {}

  for (const key in primary) {
    const primaryObj = primary[key]
    const secondaryObj = secondary[key]

    if (secondaryObj == null) {
      missing[key] = primaryObj
      continue
    }

    //
    const secondaryColors = Object.keys(secondaryObj)

    // If the key doesn't exist in the result, create it
    if (result[key] == null) {
      result[key] = {}
    }

    for (const color in primaryObj) {
      const nearest = nearestColor(color, secondaryColors)
      const average = colord(nearest).mix(color).toHex().toUpperCase()

      result[key][average] = primaryObj[color]
    }
  }

  for

  console.log('result >>', result)

  return primary
}

// Theme popularity
// + GitHub Theme
// + Atom One Dark
// + Material Community
// + Solarized Dark
export const start = async () => {
  const githubPromise = loadTheme('./themes/github-dimmed.json')
  const oneDarkPromise = loadTheme('./themes/one-dark-pro.json')
  const materialPromise = loadTheme('./themes/community-material-theme-high-contrast.json')
  const solarizedPromise = loadTheme('./themes/solarized-dark.json')

  const github = await githubPromise
  const oneDark = await oneDarkPromise
  const material = await materialPromise
  const solarized = await solarizedPromise

  const result = mergeThemes(
    mergeThemes(github, oneDark),
    mergeThemes(material, solarized)
  )

  // console.log(JSON.stringify(result, null, 2))

  return result
}

start()

// const isEqual = (set1, set2) => {
//   if (set1.size !== set2.size) {
//     return false
//   }
//
//   for (const element of set1) {
//     if (!set2.has(element)) {
//       return false
//     }
//   }
//
//   return true
// }

// export const mergeSubThemes = (subTheme1, subTheme2) => {
//   const result = { ...subTheme1 }
//
//   for (const color2 in subTheme2) {
//     const selectors2 = new Set(subTheme2[color2])
//
//     if (result.hasOwnProperty(color2)) {
//       // If the color already exists in the result theme, merge the selectors.
//       const selectors1 = new Set(result[color2])
//       result[color2] = [...new Set([...selectors1, ...selectors2])]
//     } else {
//       // If the color doesn't exist in the result theme, find the nearest color from result.
//       const nearest = nearestColor(color2, Object.keys(result))
//
//       // Average the nearest color with the current color, replace the nearest color in result with the new averaged color,
//       // and assign it the selectors of the nearest color.
//       const averagedColor = colord(nearest.color).mix(color2).toHex().toUpperCase()
//       result[averagedColor] = result[nearest.color]
//
//       // Delete the old color key from the result theme.
//       delete result[nearest.color]
//     }
//   }
//
//   console.log('result:', result)
//
//   return result
// }

// export const mergeSubThemes = (subTheme1, subTheme2) => {
//   const mergedSubTheme = { ...subTheme1 }
//   const updates = []
//
//   for (const color2 in subTheme2) {
//     const nearest = nearestColor(color2, Object.keys(mergedSubTheme))
//     const averagedColor = colord(nearest.color).mix(color2).toHex()
//     const selectors = [...new Set((mergedSubTheme[nearest.color] || []).concat(subTheme2[color2]))]
//
//     console.log('nearest:', nearest)
//     console.log('averagedColor:', averagedColor)
//     console.log('selectors:', selectors)
//
//     updates.push({
//       oldColor: nearest.color,
//       newColor: averagedColor,
//       selectors: selectors
//     })
//   }
//
//   console.log('updates:', updates)
//
//   for (const update of updates) {
//     delete mergedSubTheme[update.oldColor]
//     mergedSubTheme[update.newColor] = update.selectors
//   }
//
//   console.log('mergedSubTheme:', mergedSubTheme)
//
//   return mergedSubTheme
// }

// export const mergeThemes = (theme1, theme2) => {
//   const mergedTheme = {}
//   for (const key of new Set([...Object.keys(theme1), ...Object.keys(theme2)])) {
//     mergedTheme[key] = mergeSubThemes(theme1[key] || {}, theme2[key] || {})
//   }
//   return mergedTheme
// }
