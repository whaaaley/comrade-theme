
import { colord, extend } from "colord"
import mixPlugin from 'colord/plugins/mix'
import labPlugin from 'colord/plugins/lab'
// import { nearestColor } from './index.js'

extend([labPlugin, mixPlugin])

console.log(
  colord("#181c22").mix("#192227").toHex()
);

// console.log(colord('#0BE672').delta('#C20196'));  // Outputs: 0.96
// console.log(colord('#0BE672').delta('#59A8F3'));  // Outputs: 0.515
// console.log(colord('#D47F3A').delta('#C20196'));  // Outputs: 0.47
// console.log(colord('#D47F3A').delta('#59A8F3'));  // Outputs: 0.486


// const subTheme1 = {
//   '#0BE672': ['a.b', 'a.c.e'],
//   '#D47F3A': ['a.c.d']
// }
// const subTheme2 = {
//   '#C20196': ['a.b', 'a.c.e'],
//   '#59A8F3': ['a.c.d']
// }

// console.log(
//   '#0BE672',
//   nearestColor('#0BE672', ['#C20196', '#59A8F3']),
// );

// console.log(
//   '#D47F3A',
//   nearestColor('#D47F3A', ['#C20196', '#59A8F3'])
// );

// console.log(
//   colord("#0BE672").mix("#59A8F3").toHex(),
//   colord("#D47F3A").mix("#C20196").toHex()
// );

// Function to calculate color distance between two colors using colord library
// const calculateColorDistance = (color1, color2) => {
//   const labColor1 = colord(color1)
//   const labColor2 = colord(color2)
//   return labColor1.delta(labColor2)
// }


// console.log(
//   calculateColorDistance('#7F9E7F', '#D8A547'),
//   calculateColorDistance('#38223F', '#A66E9C'),
//   calculateColorDistance('#4B7F7B', '#C1BDA3'),
// )

// const list = ['#D8A547', '#A66E9C', '#C1BDA3']
// console.log(
//   nearestColor('#7F9E7F', list),
//   nearestColor('#808080', ['#D8A547', '#A66E9C', '#C1BDA3']),
//   nearestColor('#7F9E7F', ['#D8A547'])
// );

// function averageColors(color1, color2) {
// const c1 = colord(color1)
// const c2 = colord(color2)
//   const avg = c1.mix(c2, 0.5)
//
//   return avg.toHex()
// }
//
// console.log(
//   averageColors('#FF7F50', '#00ff00')
// );

// import colord from 'https://esm.sh/colord@2.0.2';
// import mixPlugin from 'https://esm.sh/colord/plugins/mix';
//
// colord.extend([mixPlugin]);
//
// colord("#ffffff").mix("#000000").toHex(); // "#777777"
// colord("#800080").mix("#dda0dd").toHex(); // "#af5cae"
// colord("#cd853f").mix("#eee8aa", 0.6).toHex(); // "#e3c07e"
// colord("#008080").mix("#808000", 0.35).toHex(); // "#50805d"

// const theme1 = {
//   a: {
//     '#FF7F50': ['a.b', 'a.c.e'],
//     '#32CD32': ['a.c.d']
//   }
// }
// const theme2 = {
//   f: {
//     '#FF1493': ['f.g'],
//     '#1E90FF': ['f.h.i'],
//     '#FFD700': ['f.h.j']
//   }
// }
// const expected = {
//   a: {
//     '#789DEF': ['a.b', 'a.c.e', 'a.c.d']
//   },
//   f: {
//     '#00FFFF': ['f.g'],
//     '#55AA55': ['f.h.i'],
//     '#FF00FF': ['f.h.j']
//   }
// }
