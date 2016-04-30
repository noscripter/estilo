'use strict'

const test = require('tape')
const estilo = require('../estilo.js')
const fs = require('fs')

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

test('estilo', t => {
  estilo('./test/sample.yaml')
  const str = fs.readFileSync('./sample.vim', 'utf-8')
  t.is(str, testStr)
  fs.unlink('./sample.vim', () => {
    t.end()
  })
})
