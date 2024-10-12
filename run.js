
import { colord, extend } from 'colord'
import mixPlugin from 'colord/plugins/mix'
import labPlugin from 'colord/plugins/lab'
import xyzPlugin from 'colord/plugins/xyz'

extend([labPlugin, mixPlugin, xyzPlugin])

const avg = (arr) => arr.reduce((a, b) => a + b, 0) / arr.length
const multimix = (colors) => {
  const xyz = colors.map(color => colord(color).toXyz())
  return colord({
    x: avg(xyz.map(color => color.x)),
    y: avg(xyz.map(color => color.y)),
    z: avg(xyz.map(color => color.z))
  }).toHex()
}

const editorBackground = () => multimix([
  '#22272e', // github dimmed
  '#282c34', // one dark pro
  '#263238', // community material high contrast
  '#273136'  // monokai pro filter machine
])

console.log('editor.background', editorBackground())
