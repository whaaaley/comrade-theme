
import JSON5 from 'json5'
import { colord, extend } from 'colord'
import mixPlugin from 'colord/plugins/mix'
import labPlugin from 'colord/plugins/lab'

extend([labPlugin, mixPlugin])

const colorMap = {
  '#000000': 'black',
  '#cd0000': 'red',
  '#00cd00': 'green',
  '#cdcd00': 'yellow',
  '#0000ee': 'blue',
  '#cd00cd': 'magenta',
  '#00cdcd': 'cyan',
  '#e5e5e5': 'white',
  '#7f7f7f': 'brightBlack',
  '#ff0000': 'brightRed',
  '#00ff00': 'brightGreen',
  '#ffff00': 'brightYellow',
  '#5c5cff': 'brightBlue',
  '#ff00ff': 'brightMagenta',
  '#00ffff': 'brightCyan',
  '#ffffff': 'brightWhite'
}

const colorArr = Object.keys(colorMap)

export const loadTheme = async path => {
  return JSON5.parse(await Deno.readTextFile(path))
}

export const nearestColor = (input, arr) => {
  let result = ''
  let minDelta = Infinity

  // const category = categorizeColor(input)
  // const arr2 = categorizeColorArr(arr)[category]

  for (const color of arr) {
    const delta = colord(input).delta(color)

    if (delta < minDelta) {
      result = color
      minDelta = delta
    }
  }

  return result
}

export const categorizeColor = color => {
  const nearest = nearestColor(color, colorArr)
  return colorMap[nearest]
}

export const categorizeColorArr = arr => {
  const result = {}

  for (let i = 0; i < arr.length; i++) {
    const category = categorizeColor(arr[i])

    if (result[category] == null) {
      result[category] = []
    }

    result[category].push(arr[i])
  }

  return result
}

export const nearestCategorizedColor = (input, arr) => {
  // const category = categorizeColor(input)
  // const arr2 = categorizeColorArr(arr)[category]

  // return nearestColor(input, arr)[category]

  let result = ''
  let minDelta = Infinity

  const category = categorizeColorArr(arr)[categorizeColor(input)]

  if (category == null) {
    console.log('category is null')
    return input
  }

  for (let i = 0; i < category.length; i++) {
    const color = category[i]
    const delta = colord(input).delta(color)

    if (delta < minDelta) {
      result = color
      minDelta = delta
    }
  }

  return result
}

export const merge = (first, second) => {
  const result = {}
  const palette = Object.values(second)

  for (const key in first) {
    result[key] = nearestCategorizedColor(first[key], palette)
  }

  return result
}

export const doubleMerge = (primary, secondary) => {
  const first = merge(primary, secondary)
  const second = merge(secondary, primary)

  const result = {
    ...first
  }

  for (const key in second) {
    const value = second[key]
    const color = result[key]

    result[key] = color == null ? value : colord(color).mix(value).toHex()
  }

  return result
}

export const compile = async () => {
  const paths = [
    './themes/github-dimmed.json',
    './themes/one-dark-pro.json',
    './themes/community-material-theme-high-contrast.json',
    './themes/monokai-pro-filter-machine.json',
    // './themes/solarized-dark.json'
  ]

  const promises = paths.map(loadTheme)
  const [material, oneDark, monokai, github] = await Promise.all(promises)

  const result = doubleMerge(
    doubleMerge(material.colors, oneDark.colors),
    doubleMerge(monokai.colors, github.colors)
  )

  console.log(JSON.stringify(result, null, 2))

  return result
}

compile()
