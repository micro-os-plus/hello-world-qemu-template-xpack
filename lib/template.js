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

/**
 * The XpmInitTemplate module.
 *
 * It is re-exported publicly by `index.js`.
 * 'xpm init --template' imports it via the `main` property of `package.json`,
 * instantiates it with the current context, which includes the log and
 * the configurations, then invokes the `run()` method.
 */

// ----------------------------------------------------------------------------

import fs from 'fs'
import path from 'path'
import readline from 'readline'
import util from 'util'
import { fileURLToPath } from 'url'

// https://www.npmjs.com/package/cp-file
import { copyFile } from 'cp-file'

// https://www.npmjs.com/package/del
import { deleteAsync } from 'del'

// https://www.npmjs.com/package/liquidjs
import { Liquid } from 'liquidjs'

// https://www.npmjs.com/package/make-dir
import makeDir from 'make-dir'

// https://www.npmjs.com/package/git-config-path
import getGitConfigPath from 'git-config-path'
// https://www.npmjs.com/package/parse-git-config
import parseGitConfig from 'parse-git-config'

import cliStartOptionsCsj from '@ilg/cli-start-options'
const { CliExitCodes, CliError } = cliStartOptionsCsj

// ----------------------------------------------------------------------------

const fsPromises = fs.promises

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Provided:
// language (c, c++)
// buildGenerator (cmake, meson)

// Computed:
// fileExtension (c, cpp)

// ============================================================================

// The result is in the properties map:
// context.config.properties[key] = value
// The description is shown when '?' is entered as selection.

const propertiesDefinitions = {
  target: {
    label: 'Target',
    description: 'Select the target architecture',
    type: 'select',
    items: {
      'cortex-m7f': 'Cortex-M7F (mps2-an500)',
      'cortex-m0': 'Cortex-M0 (mps2-an385)',
      'cortex-a15': 'Cortex-A15 (virt AArch32)',
      'cortex-a72': 'Cortex-A72 (virt AArch64)',
      'riscv-rv32imac': 'RV32 (virt RISC-V 32-bit)',
      'riscv-rv64imafdc': 'RV64 (virt RISC-V 64-bit)'
    },
    default: 'cortex-m7f',
    isMandatory: true
  },
  language: {
    label: 'Programming language',
    description: 'Select the preferred programming language',
    type: 'select',
    items: {
      c: 'C for the application files',
      cpp: 'C++ for the application files'
    },
    default: 'cpp',
    isMandatory: false
  },
  buildGenerator: {
    label: 'Build System',
    description: 'Select the tool to generate the builds',
    type: 'select',
    items: {
      cmake: 'The CMake build system',
      meson: 'The Meson build system'
    },
    default: 'cmake',
    isMandatory: false
  }
}

export { propertiesDefinitions as properties }

// ============================================================================

export class XpmInitTemplate {
  // --------------------------------------------------------------------------

  constructor (context) {
    this.context = context
    this.log = context.log
  }

  async run () {
    const log = this.log
    log.trace(`${this.constructor.name}.run()`)

    log.info()

    const context = this.context
    const config = context.config

    let isError = false
    for (const [key, val] of Object.entries(config.properties)) {
      const value = this.validateValue(key, val)
      if (value === undefined) {
        log.error(`Unsupported property '${key}'`)
        isError = true
      }
      if (value === null) {
        log.error(`Unsupported value for '${key}=${val}'`)
        isError = true
      }
    }
    if (isError) {
      return CliExitCodes.ERROR.SYNTAX
    }

    // Properties set by `--property name=value` are in `config.properties`.

    // If there is at least one mandatory property without an explicit value,
    // enter the interactive mode and ask for the missing values.

    const mustAsk = Object.keys(propertiesDefinitions).some(
      (key) => {
        return (propertiesDefinitions[key].isMandatory &&
          !config.properties[key])
      }
    )

    let isInteractive
    if (mustAsk) {
      // Need to ask for more values.
      if (!(process.stdin.isTTY && process.stdout.isTTY)) {
        log.error('Interactive mode not possible without a TTY.')
        return CliExitCodes.ERROR.SYNTAX
      }

      await this.askForMoreValues()
      log.trace(util.inspect(config.properties))

      // Reset start time to skip interactive time.
      context.startTime = Date.now()
      isInteractive = true
    } else {
      // Properties without explicit values get their defaults.
      Object.entries(propertiesDefinitions).forEach(
        ([key, val]) => {
          if (!config.properties[key] && val.default) {
            config.properties[key] = val.default
          }
        }
      )
      isInteractive = false
    }

    // Copy all available values in the map used for substitutions.
    const liquidMap = { ...config.properties }

    // Also pass the properties grouped.
    liquidMap.properties = config.properties
    liquidMap.propertiesNames = Object.keys(config.properties)

    liquidMap.projectName = config.projectName
    liquidMap.fileExtension = liquidMap.language

    liquidMap.platform = 'qemu-' + config.properties.target

    const currentTime = new Date()
    liquidMap.year = currentTime.getFullYear().toString()

    const gitConfigPath = getGitConfigPath('global')
    const gitConfig = parseGitConfig.sync({ path: gitConfigPath }) || {}
    if (!gitConfig.user) {
      gitConfig.user = {}
    }

    log.trace(util.inspect(gitConfig))

    liquidMap.author = {
      name: gitConfig.user.name ? gitConfig.user.name : 'my name',
      email: gitConfig.user.email ? gitConfig.user.email : 'my@eMail.com',
      url: gitConfig.user.email === 'ilg@livius.net'
        ? 'https://github.com/ilg-ul'
        : 'https://my-url'
    }

    liquidMap.githubId = gitConfig.user.email === 'ilg@livius.net'
      ? 'ilg-ul'
      : 'my-github-id'

    // Add package (for name & version)
    const packageJsonPath = path.resolve(__dirname, '..', 'package.json')
    const packageJsonContent = await fsPromises.readFile(packageJsonPath)
    const packageJson = JSON.parse(packageJsonContent.toString())
    liquidMap.package = packageJson

    await this.generate(liquidMap, isInteractive)

    return CliExitCodes.SUCCESS
  }

  validateValue (name, value) {
    const propDef = propertiesDefinitions[name]
    if (!propDef) {
      return undefined
    }
    if (propDef.type === 'select') {
      if (propDef.items[value]) {
        return value
      }
    } else if (propDef.type === 'boolean') {
      if (value === 'true') {
        return true
      } else if (value === 'false') {
        return false
      }
    }
    if (value === '') {
      return propDef.default
    }
    return null
  }

  async askForMoreValues (names) {
    const context = this.context
    const config = context.config

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    })

    // https://nodejs.org/docs/latest-v10.x/api/readline.html#readline_rl_question_query_callback
    rl.questionPromise = function (query) {
      return new Promise((resolve) => {
        rl.question(query, (answer) => {
          return resolve(answer)
        })
      })
    }

    for (const name of Object.keys(propertiesDefinitions)) {
      if (config.properties[name]) {
        continue
      }
      const val = propertiesDefinitions[name]
      let out = `${val.label}?`
      if (val.type === 'select') {
        out += ' (' + Object.keys(val.items).join(', ') + ', ?)'
      } else if (val.type === 'boolean') {
        out += ' (true, false, ?)'
      }
      if (val.default !== undefined) {
        out += ` [${val.default}]`
      }
      out += ': '

      while (true) {
        let answer = await rl.questionPromise(out)
        // No need for more trimming
        answer = this.validateValue(name, answer)
        if (answer != null && answer !== undefined) {
          // Store the answer in the configuration.
          config.properties[name] = answer
          break
        }
        console.log(val.description)
        if (val.type === 'select') {
          for (const [ikey, ival] of Object.entries(val.items)) {
            console.log(`- ${ikey}: ${ival}`)
          }
        }
      }
    }
  }

  async copyFile (source, destination = source) {
    const log = this.log

    await makeDir(path.dirname(destination))

    await copyFile(path.resolve(this.templatesPath, source),
      path.resolve(destination))
    log.info(`File '${destination}' copied.`)
  }

  async copyFolder (source, destination = source) {
    const log = this.log

    await this.copyFolderRecursive(path.resolve(this.templatesPath, source),
      path.resolve(destination))
    log.info(`Folder '${destination}' copied.`)
  }

  async copyFolderRecursive (sourcePath, destinationPath) {
    // const log = this.log

    await makeDir(path.dirname(destinationPath))

    const dirents = await fsPromises.readdir(sourcePath,
      { withFileTypes: true })

    for (const dirent of dirents) {
      // log.trace(dirent.name)

      if (dirent.isDirectory()) {
        await this.copyFolderRecursive(
          path.join(sourcePath, dirent.name),
          path.join(destinationPath, dirent.name)
        )
      } else {
        await copyFile(path.join(sourcePath, dirent.name),
          path.join(destinationPath, dirent.name))
      }
    }
  }

  async render (inputFileRelativePath, outputFileRelativePath, map) {
    const log = this.log

    log.trace(`render(${inputFileRelativePath}, ${outputFileRelativePath})`)

    await makeDir(path.dirname(outputFileRelativePath))

    try {
      const fileContent =
        await this.engine.renderFile(inputFileRelativePath, map)

      await fsPromises.writeFile(outputFileRelativePath, fileContent, 'utf8')
    } catch (err) {
      throw new CliError(err.message, CliExitCodes.ERROR.OUTPUT)
    }
    log.info(`File '${outputFileRelativePath}' generated.`)
  }

  async generate (liquidMap, isInteractive) {
    const log = this.log
    const context = this.context
    const config = context.config

    const lang = (liquidMap.language === 'cpp') ? 'C++' : 'C'
    log.info(`Creating the ${lang} project '${liquidMap.projectName}'...`)

    if (!isInteractive) {
      Object.entries(propertiesDefinitions).forEach(
        ([key, val]) => {
          if (key !== 'language') {
            log.info(`- ${key}=${liquidMap[key]}`)
          }
        }
      )
      log.info()
    }

    this.templatesPath = path.resolve(__dirname, '..', 'assets', 'sources')
    log.debug(`from='${this.templatesPath}'`)

    // https://liquidjs.com
    this.engine = new Liquid({
      root: this.templatesPath,
      cache: false,
      strictFilters: true, // default: false
      strictVariables: true, // default: false
      trimTagRight: false, // default: false
      trimTagLeft: false, // default: false
      greedy: false
    })

    const fileExtension = liquidMap.fileExtension

    log.trace(util.inspect(liquidMap))

    // ------------------------------------------------------------------------
    // Generate the application files.

    // The action happens in the target project folder.
    await makeDir(config.cwd)

    if (liquidMap.buildGenerator === 'cmake') {
      await this.copyFolder('cmake')
      await this.render('CMakeLists-liquid.txt', 'CMakeLists.txt', liquidMap)
    } else if (liquidMap.buildGenerator === 'meson') {
      await this.copyFolder('meson')
      await this.render('meson-liquid.build', 'meson.build', liquidMap)
      await this.copyFile('meson_options.txt')
    }

    await this.render('src/main-liquid.cpp', `src/main.${fileExtension}`,
      liquidMap)
    await this.copyFolder('include')

    await this.copyFolder(`platform-${liquidMap.platform}`)
    if (liquidMap.buildGenerator !== 'cmake') {
      await deleteAsync([
          `platform-${liquidMap.platform}/cmake`,
          `platform-${liquidMap.platform}/CMakeLists.txt`
      ])
    }
    if (liquidMap.buildGenerator !== 'meson') {
      await deleteAsync([
          `platform-${liquidMap.platform}/meson`,
          `platform-${liquidMap.platform}/meson.build`
      ])
    }

    // await this.copyFile('.vscode/c_cpp_properties.json')
    await this.copyFile('.vscode/tasks.json')
    await this.copyFile('.vscode/settings.json')
    await this.copyFile('.clang-format')

    await this.render('README-liquid.md', 'README.md', liquidMap)
    await this.render('LICENSE.liquid', 'LICENSE', liquidMap)

    // Make this the last one, so if something goes wrong it will be
    // easier to retry.
    await this.render('package-liquid.json', 'package.json', liquidMap)
  }
}

// ----------------------------------------------------------------------------
