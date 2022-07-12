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

/**
 * This is the module entry point, the file that is processed when
 * `require('<module>')` is called.
 *
 * For this to work, it must be linked from `package.json` as
 * `"main": "./index.js",`, which is, BTW, the default behaviour.
 *
 * To import classes from this module into Node.js applications, use:
 *
 * ```javascript
 * const { XpmInitTemplate } = require('<module>')
 * ```
 */

const { XpmInitTemplate } = require('./lib/template.js')

// ----------------------------------------------------------------------------
// Node.js specific export definitions.

// By default, `module.exports = {}`.
module.exports.XpmInitTemplate = XpmInitTemplate

// ----------------------------------------------------------------------------
