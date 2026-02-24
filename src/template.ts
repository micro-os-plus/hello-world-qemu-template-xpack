/*
 * This file is part of the xPack project (http://xpack.github.io).
 * Copyright (c) 2022-2026 Liviu Ionescu. All rights reserved.
 *
 * Permission to use, copy, modify, and/or distribute this software
 * for any purpose is hereby granted, under the terms of the MIT license.
 *
 * If a copy of the license was not distributed with this file, it can
 * be obtained from https://opensource.org/licenses/mit.
 */

// ----------------------------------------------------------------------------

/**
 * The XpmInitTemplate module.
 *
 * @remarks
 * It is re-exported publicly by `index.js`. The `xpm init --template`
 * command imports it via the `main` property of `package.json`, instantiates
 * it with the current context, which includes the log and the configurations,
 * then invokes the `run()` method.
 */

// ----------------------------------------------------------------------------

import assert from 'node:assert'
import * as fs from 'node:fs/promises'
import * as path from 'node:path'

import * as util from 'node:util'
import { fileURLToPath } from 'node:url'

// https://www.npmjs.com/package/git-config-path
import gitConfigPath from 'git-config-path'
// https://www.npmjs.com/package/parse-git-config
import parseGitConfig from 'parse-git-config'

import * as xpmLib from '@xpack/xpm-lib'

// ----------------------------------------------------------------------------

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// ----------------------------------------------------------------------------
// Type Definitions

/**
 * Git configuration interface.
 */
interface GitConfig {
  user?: {
    name?: string
    email?: string
  }
}

/**
 * Author information interface.
 */
interface Author {
  name: string
  email: string
  url: string
}

/**
 * Matrix configuration interface.
 */
interface Matrix {
  target:
    | 'cortex-m7f'
    | 'cortex-m0'
    | 'cortex-a15'
    | 'cortex-a72'
    | 'riscv-rv32imac'
    | 'riscv-rv64imafdc'
  language: 'c' | 'cpp'
  buildGenerator: 'cmake' | 'meson'
}

// ----------------------------------------------------------------------------
// Data definitions.

const propertiesDefinitions: xpmLib.InitTemplatePropertiesDefinitions = {
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
      'riscv-rv64imafdc': 'RV64 (virt RISC-V 64-bit)',
    },
    default: 'cortex-m7f',
    isMandatory: true,
  },
  language: {
    label: 'Programming language',
    description: 'Select the preferred programming language',
    type: 'select',
    items: {
      c: 'C for the application files',
      cpp: 'C++ for the application files',
    },
    default: 'cpp',
    isMandatory: false,
  },
  buildGenerator: {
    label: 'Build System',
    description: 'Select the tool to generate the builds',
    type: 'select',
    items: {
      cmake: 'The CMake build system',
      meson: 'The Meson build system',
    },
    default: 'cmake',
    isMandatory: false,
  },
}

// ============================================================================

export class XpmInitTemplate extends xpmLib.InitTemplateBase {
  // --------------------------------------------------------------------------

  constructor({ context, policies }: xpmLib.InitTemplateConstructorParameters) {
    super({
      context,
      templatesPath: path.resolve(__dirname, '..', 'templates', 'sources'),
      __dirname: path.dirname(__dirname),

      policies,
      propertiesDefinitions,
    })
  }

  async generate(): Promise<void> {
    const log = this.log
    const context = this.context
    const config = context.config
    const moduleFolderPath = this.__dirname

    const substitutionsVariables = this.substitutionsVariables
    assert(substitutionsVariables, 'Substitutions variables not initialised')

    const matrix = substitutionsVariables.matrix as unknown as Matrix
    const fileExtension: string = matrix.language
    substitutionsVariables.fileExtension = fileExtension

    const platform = 'qemu-' + matrix.target
    substitutionsVariables.platform = platform

    const lang: string = matrix.language === 'cpp' ? 'C++' : 'C'
    log.info(
      `Creating the ${lang} project ` +
        `'${substitutionsVariables.projectName as string}'...`
    )

    if (!this.isInteractive) {
      Object.entries(this.propertiesDefinitions).forEach(([key, val]) => {
        if (!val.isMandatory) {
          log.info(`- ${key}=${String(substitutionsVariables[key])}`)
        }
      })
      log.info()
    }

    // ------------------------------------------------------------------------
    // Load the Git configuration to populate author information.

    const configPath = gitConfigPath('global')
    const gitConfig: GitConfig = (
      configPath ? parseGitConfig.sync({ path: configPath }) : {}
    ) as GitConfig
    gitConfig.user ??= {}
    log.trace(util.inspect(gitConfig))

    const author: Author = {
      name: gitConfig.user.name ?? 'my name',
      email: gitConfig.user.email ?? 'my@eMail.com',
      url:
        gitConfig.user.email === 'ilg@livius.net'
          ? 'https://github.com/ilg-ul'
          : 'https://my-url',
    }
    substitutionsVariables.author = author

    const githubId: string =
      gitConfig.user.email === 'ilg@livius.net' ? 'ilg-ul' : 'my-github-id'
    substitutionsVariables.githubId = githubId

    // ------------------------------------------------------------------------
    // Add content of package.json (for name & version).

    const xpmPackage = new xpmLib.Package({
      packageFolderPath: moduleFolderPath,
      log: log,
    })
    const jsonPackage = await xpmPackage.readPackageDotJson({ withThrow: true })
    substitutionsVariables.package = jsonPackage

    log.debug(`from='${this.templatesPath}'`)
    log.trace(util.inspect(substitutionsVariables))

    // ------------------------------------------------------------------------
    // Generate the application files.

    await fs.mkdir(config.cwd, { recursive: true })

    if (matrix.buildGenerator === 'cmake') {
      await this.copyFolder({
        sourceFolderRelativePath: 'cmake',
        destinationFolderPath: 'cmake',
      })
      await this.render({
        sourceFilePath: 'CMakeLists-liquid.txt',
        destinationFilePath: 'CMakeLists.txt',
      })
    } else /* if (matrix.buildGenerator === 'meson') */ {
      await this.copyFolder({
        sourceFolderRelativePath: 'meson',
        destinationFolderPath: 'meson',
      })
      await this.render({
        sourceFilePath: 'meson-liquid.build',
        destinationFilePath: 'meson.build',
      })
      await this.copyFile({
        sourceFileRelativePath: 'meson_options.txt',
        destinationFilePath: 'meson_options.txt',
      })
    }

    await this.render({
      sourceFilePath: 'src/main-liquid.cpp',
      destinationFilePath: `src/main.${fileExtension}`,
    })
    await this.copyFolder({
      sourceFolderRelativePath: 'include',
      destinationFolderPath: 'include',
    })

    await this.copyFolder({
      sourceFolderRelativePath: `platform-${platform}`,
      destinationFolderPath: `platform-${platform}`,
    })
    if (matrix.buildGenerator !== 'cmake') {
      await fs.rm(`platform-${platform}/cmake`, {
        recursive: true,
        force: true,
      })
      await fs.rm(`platform-${platform}/CMakeLists.txt`, { force: true })
    }
    if (matrix.buildGenerator !== 'meson') {
      await fs.rm(`platform-${platform}/meson`, {
        recursive: true,
        force: true,
      })
      await fs.rm(`platform-${platform}/meson.build`, { force: true })
    }

    // await this.copyFile('.vscode/c_cpp_properties.json')
    await this.copyFile({
      sourceFileRelativePath: 'dot.vscode/tasks.json',
      destinationFilePath: '.vscode/tasks.json',
    })
    await this.copyFile({
      sourceFileRelativePath: 'dot.vscode/settings.json',
      destinationFilePath: '.vscode/settings.json',
    })
    await this.copyFile({
      sourceFileRelativePath: 'dot.clang-format',
      destinationFilePath: '.clang-format',
    })

    await this.render({
      sourceFilePath: 'README-liquid.md',
      destinationFilePath: 'README.md',
    })
    await this.render({
      sourceFilePath: 'LICENSE.liquid',
      destinationFilePath: 'LICENSE',
    })

    // Make this the last one, so if something goes wrong it will be
    // easier to retry.
    await this.render({
      sourceFilePath: 'package-liquid.json',
      destinationFilePath: 'package.json',
    })
  }
}

// ----------------------------------------------------------------------------
