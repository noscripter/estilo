'use strict'

const { resolve, basename } = require('path')
const fs = require('fs-extra')
const printScheme = require('../src/print-scheme.js')
const yaml = require('js-yaml')

module.exports = function (folder) {
  let pkg = require(resolve(folder, 'package.json'))

  let colorsFolder = resolve(folder, 'colors')
  let estiloFolder = resolve(folder, 'estilo')
  let templateFiles = [
    estiloFolder + '/ui-base.yml',
    estiloFolder + '/syntax-base.yml'
  ]
  templateFiles.push(...getTemplateFiles(estiloFolder + '/syntax'))
  templateFiles.push(...getTemplateFiles(estiloFolder + '/extra'))

  let info = fs.readFileSync(estiloFolder + '/info.yml')
  info = yaml.safeLoad(info)

  let templates = {}
  templateFiles.forEach(templatePath => {
    let raw = fs.readFileSync(templatePath)
    let obj = yaml.safeLoad(raw)
    Object.keys(obj).forEach(k => {
      templates[k] = obj[k]
    })
  })

  Object.assign(info, pkg)

  let scheme = printScheme({ info, templates })

  fs.ensureDirSync(colorsFolder)
  fs.writeFileSync(`${colorsFolder}/${pkg.name}.vim`, scheme)

  console.log('OK!')
}

function exists (filepath) {
  let res = true
  try {
    fs.statSync(filepath)
  } catch (e) {
    res = false
  }
  return res
}

function getTemplateFiles (folderPath) {
  if (!exists(folderPath)) return []
  return fs.readdirSync(folderPath)
    .filter(i => basename(i) !== basename(i, '.yml'))
    .map(i => resolve(folderPath, i))
}