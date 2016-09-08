'use strict'

const path = require('path')
const inquirer = require('inquirer')
const mkdirp = require('mkdirp')
const fs = require('fs')

const defaultPalette = 'myblue: \'#99ccff\''

module.exports = function (projectPath, auto) {
  const folderName = path.basename(projectPath)
  const questions = [
    {
      type: 'input',
      name: 'name',
      message: 'Project name:',
      default: folderName
    },
    {
      type: 'input',
      name: 'version',
      message: 'Version:',
      default: '1.0.0'
    },
    {
      type: 'input',
      name: 'license',
      message: 'License:',
      default: 'MIT'
    },
    {
      type: 'input',
      name: 'author',
      message: 'Author:'
    },
    {
      type: 'input',
      name: 'website',
      message: 'Project url:'
    },
    {
      type: 'confirm',
      name: 'airline',
      message: 'Add an Airline theme style?',
      default: true
    },
    {
      type: 'confirm',
      name: 'lightline',
      message: 'Add an Lightline theme style?',
      default: true
    },
    {
      type: 'input',
      name: 'description',
      message: 'Short description:'
    }
  ]

  if (auto) {
    createBoilerplate(projectPath, {
      name: folderName,
      author: '',
      version: '1.0.0',
      website: '',
      license: 'MIT',
      airline: true,
      lightline: true,
      description: ''
    })
  } else {
    inquirer.prompt(questions).then(function (answers) {
      createBoilerplate(projectPath, answers)
    })
  }
}

function createBoilerplate (projectPath, options) {
  let estiloStr = `name: '${options.name}'
version: '${options.version}'
license: '${options.license}'
author: '${options.author}'
url: '${options.url}'
description: '${options.description}'
colorschemes:
  - name: ${options.name}
    background: 'dark'
    palette: ${options.name}`

  if (options.airline) {
    estiloStr += `
airline:
  - name: ${options.name}
    style: ${options.name}
    palette: ${options.name}`
  }
  if (options.lightline) {
    estiloStr += `
lightline:
  - name: ${options.name}
    style: ${options.name}
    palette: ${options.name}`
  }

  mkdirp.sync(projectPath)
  fs.writeFileSync(path.resolve(projectPath, 'estilo.yml'), estiloStr)
  mkdirp.sync(path.resolve(projectPath, 'estilo'))
  mkdirp.sync(path.resolve(projectPath, 'estilo', 'syntax'))
  mkdirp.sync(path.resolve(projectPath, 'estilo', 'palettes'))
  fs.writeFileSync(path.resolve(projectPath, 'estilo', options.name + '.yml'), defaultPalette)
}
