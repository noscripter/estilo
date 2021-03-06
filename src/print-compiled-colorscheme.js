'use strict'

const hexterm = require('hexterm')

const noFore = ' guifg=NONE ctermfg=NONE'
const noBack = ' guibg=NONE ctermbg=NONE'
const noUi = ' gui=NONE cterm=NONE'

function printForeground (fore) {
  if (!fore) return noFore
  if (fore === '.') return ''
  return ` guifg=${fore} ctermfg=${hexterm(fore)}`
}

function printBackground (back) {
  if (!back) return noBack
  if (back === '.') return ''
  return ` guibg=${back} ctermbg=${hexterm(back)}`
}

function printTextStyle (ui) {
  if (!ui) return noUi
  if (ui === '.') return ''
  return ` gui=${ui} cterm=${ui}`
}

function printCurlColor (color) {
  if (!color || color === '.') return ''
  return ` guisp=${color}`
}

module.exports = function (hilinks) {
  let out = ''
  Object.keys(hilinks).forEach(k => {
    let hi = hilinks[k]
    if (!hi) return
    if (hi.link) {
      out += `hi link ${k} ${hi.link}\n`
    } else if (hi.fore || hi.back || hi.ui) {
      out += `hi ${k}` +
        printForeground(hi.fore) +
        printBackground(hi.back) +
        printTextStyle(hi.ui) +
        printCurlColor(hi.curlcolor) +
        '\n'
    }
  })
  return out
}
