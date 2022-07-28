#!/usr/bin/env node
// Mandatory shebang must point to `node` and this file must be executable.

/*
 * This file is part of the xPack project (http://xpack.github.io).
 * Copyright (c) 2022 Liviu Ionescu. All rights reserved.
 *
 * Permission to use, copy, modify, and/or distribute this software
 * for any purpose is hereby granted, under the terms of the MIT license.
 *
 * If a copy of the license was not distributed with this file, it can
 * be obtained from https://opensource.org/licenses/MIT/.
 */

'use strict'
/* eslint valid-jsdoc: "error" */
/* eslint max-len: [ "error", 80, { "ignoreUrls": true } ] */

// ----------------------------------------------------------------------------

const fs = require('fs')
const path = require('path')
// const util = require('util')

// https://www.npmjs.com/package/shelljs
const shx = require('shelljs')

const properties = require('../lib/template.js').properties

// ----------------------------------------------------------------------------

// During development only.
const enableXpmLink = false

class Test {
  // Synchronous.
  static start () {
    // Instantiate a new test.
    const test = new Test()
    process.exitCode = test.run(process.argv.length > 2 ? process.argv[2] : '')
  }

  constructor () {
    const packageJsonPath = path.resolve(__dirname, '..', 'package.json')
    const packageJsonContent = fs.readFileSync(packageJsonPath)
    const packageJson = JSON.parse(packageJsonContent.toString())

    this.packageName = packageJson.name
    this.tmpFolderName = this.packageName.split('/')[1]

    this.count = 1
  }

  run (complexity) {
    this.complexity = complexity

    // Uninstall possibly existing global package, to ensure the
    // test uses the current folder content.
    const uninstall =
      `xpm uninstall ${this.packageName} --global --ignore-errors`
    shx.echo(`$ ${uninstall}`)
    shx.exec(uninstall)

    let exitCode = 0
    this.startTime = Date.now()
    if (complexity === 'all') {
      shx.echo('Testing thoroughly...')
      for (const target of Object.keys(properties.target.items)) {
        for (const buildGenerator of
          Object.keys(properties.buildGenerator.items)) {
          for (const language of Object.keys(properties.language.items)) {
            exitCode = this.runOne({
              target,
              buildGenerator,
              language
            })
            if (exitCode !== 0) {
              return exitCode
            }
            this.count++
          }
        }
      }
    } else if (complexity === 'ci' || complexity === '') {
      shx.echo('Testing a selection of cases...')
      for (const target of Object.keys(properties.target.items)) {
        for (const buildGenerator of
          Object.keys(properties.buildGenerator.items)) {
          for (const language of Object.keys(properties.language.items)) {
            exitCode = this.runOne({
              target,
              buildGenerator,
              language
            })
            if (exitCode !== 0) {
              return exitCode
            }
            this.count++
          }
        }
      }
    } else if (complexity === 'cortexm') {
      shx.echo('Testing Cortex-M cases...')
      for (const target of ['cortex-m0', 'cortex-m7f']) {
        for (const buildGenerator of
          Object.keys(properties.buildGenerator.items)) {
          for (const language of Object.keys(properties.language.items)) {
            exitCode = this.runOne({
              target,
              buildGenerator,
              language
            })
            if (exitCode !== 0) {
              return exitCode
            }
            this.count++
          }
        }
      }
    } else if (complexity === 'cortexa') {
      shx.echo('Testing Cortex-A cases...')
      for (const target of ['cortex-a15', 'cortex-a72']) {
        for (const buildGenerator of
          Object.keys(properties.buildGenerator.items)) {
          for (const language of Object.keys(properties.language.items)) {
            exitCode = this.runOne({
              target,
              buildGenerator,
              language
            })
            if (exitCode !== 0) {
              return exitCode
            }
            this.count++
          }
        }
      }
    } else if (complexity === 'riscv') {
      shx.echo('Testing RISC-V cases...')
      for (const target of ['riscv-rv32imac', 'riscv-rv64imafdc']) {
        for (const buildGenerator of
          Object.keys(properties.buildGenerator.items)) {
          for (const language of Object.keys(properties.language.items)) {
            exitCode = this.runOne({
              target,
              buildGenerator,
              language
            })
            if (exitCode !== 0) {
              return exitCode
            }
            this.count++
          }
        }
      }
    } else if (complexity === 'develop') {
      shx.echo('Testing one development cases...')
      exitCode = this.runOne({
        // target: 'cortex-m0',
        target: 'cortex-m7f',
        // target: 'cortex-a15',
        // target: 'cortex-a72',
        // target: 'riscv-rv32imac',
        // target: 'riscv-rv64imafdc',
        buildGenerator: 'cmake',
        // buildGenerator: 'meson',
        language: 'cpp'
      })
      if (exitCode !== 0) {
        return exitCode
      }
      this.count++
    }

    const durationString = this.formatDuration(Date.now() - this.startTime)
    shx.echo(`Completed in ${durationString}.`)

    return 0
  }

  /**
   *
   * @param {*} properties Configuration properties.
   * @returns {int} exit code
   */
  runOne (properties) {
    // https://www.npmjs.com/package/shelljs

    shx.set('-e') // Exit upon error

    const count = ('0000' + this.count).slice(-3)
    const name = `${count}-` +
      `${properties.target}-${properties.buildGenerator}-${properties.language}`

    shx.echo()
    shx.echo(`Testing '${name}'...`)

    const tmp = shx.tempdir()
    const buildFolder = `${tmp}/${this.tmpFolderName}/${name}`
    shx.echo(buildFolder)

    shx.rm('-rf', buildFolder)
    shx.mkdir('-p', buildFolder)

    shx.config.silent = true
    shx.pushd(buildFolder)
    shx.config.silent = false

    const projectFolderPath = path.dirname(__dirname)

    let command = `xpm init --template "${projectFolderPath}" --name ${count}`
    for (const [key, value] of Object.entries(properties)) {
      command += ` --property ${key}=${value}`
    }
    if (this.complexity === 'develop') {
      command += ' -dd'
    }
    shx.echo(`$ ${command}`)
    shx.exec(command)

    shx.echo()
    command = 'xpm install'
    if (this.complexity !== 'develop') {
      command += ' --quiet'
    }
    shx.echo(`$ ${command}`)
    try {
      shx.exec(command)
    } catch (err) {
      shx.echo()
      return 1
    }

    if (enableXpmLink) {
      shx.echo()
      command = 'xpm run link-deps'
      shx.echo(`$ ${command}`)
      try {
        shx.exec(command)
      } catch (err) {
        shx.echo()
        return 1
      }
    }

    shx.echo()
    command = 'xpm run test-all'
    shx.echo(`$ ${command}`)
    try {
      shx.exec(command)
    } catch (err) {
      shx.echo()
      return 1
    }

    shx.config.silent = true
    shx.popd()
    shx.config.silent = false

    return 0
  }

  /**
   * @summary Convert a duration in ms to seconds if larger than 1000.
   * @param {number} n Duration in milliseconds.
   * @returns {string} Value in ms or sec.
   */
  formatDuration (n) {
    if (n < 1000) {
      return `${n} ms`
    }
    return `${(n / 1000).toFixed(3)} sec`
  }
}

Test.start()
