
import JSON5 from 'json5'
import { colord, extend } from 'colord'
import mixPlugin from 'colord/plugins/mix'
import labPlugin from 'colord/plugins/lab'

extend([labPlugin, mixPlugin])

export const loadTheme = async path => JSON5.parse(await Deno.readTextFile(path))

export const mergedThemes = (primary, secondary) => {
  const result = {}
  const regexp = new RegExp(`^${prefix}\\.|$`)

  for (const [key, value] of Object.entries(primary)) {
    // Find the prefix of the key or use the key itself if there is no prefix
    const prefix = key.includes('.') ? key.split('.')[0] : key

    if (regexp.test(key)) {

    }
  }

  return primary
}

// Theme popularity
// + GitHub Theme
// + Atom One Dark
// + Material Community
// + Solarized Dark
export const compile = async () => {
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

  console.log(JSON.stringify(result, null, 2))

  return result
}
