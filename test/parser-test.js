'use strict'

const test = require('tape')
const parser = require('../src/parser')

const testStr = `"
" scheme s v2.1.0
" description d
" url u
" author: author a
" license: MIT
" background: dark
"
" This file was generated by Estilo
" https://github.com/jacoborus/estilo

let colors_name="scheme s"
hi clear
if exists("syntax_on")
  syntax reset
endif
if has("gui_running")
  set background=dark
endif

hi hitest guifg=#bbddff ctermfg=153 guibg=#ffffff ctermbg=15 gui=NONE cterm=NONE
hi other guifg=#ff0000 ctermfg=9 guibg=NONE ctermbg=NONE gui=bold,underline,italic cterm=bold,underline,italic
hi link linked other\n`

test('parser', t => {
  const src = {
    info: {
      author: 'author a',
      scheme: 'scheme s',
      background: 'dark',
      description: 'description d',
      license: 'MIT',
      url: 'url u',
      version: '2.1.0'
    },
    colors: {
      blue: '#bbddff',
      blanco: '#ffffff'
    },
    hilinks: {
      hitest: 'blue blanco',
      other: '#ff0000 - bui',
      linked: '@other'
    }
  }
  let parsed = parser(src)
  t.is(parsed, testStr)
  t.end()
})
