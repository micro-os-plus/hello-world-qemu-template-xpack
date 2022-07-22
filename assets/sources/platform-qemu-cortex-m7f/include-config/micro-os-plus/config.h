/*
 * This file is part of the µOS++ distribution.
 *   (https://github.com/micro-os-plus/)
 * Copyright (c) 2022 Liviu Ionescu. All rights reserved.
 *
 * Permission to use, copy, modify, and/or distribute this software
 * for any purpose is hereby granted, under the terms of the MIT license.
 *
 * If a copy of the license was not distributed with this file, it can
 * be obtained from https://opensource.org/licenses/MIT/.
 */

#ifndef MICRO_OS_PLUS_CONFIG_H_
#define MICRO_OS_PLUS_CONFIG_H_

// ----------------------------------------------------------------------------

// On bare-metal platforms, tests are semihosted applications.
#define MICRO_OS_PLUS_USE_SEMIHOSTING

#if defined(MICRO_OS_PLUS_TRACE)
#define MICRO_OS_PLUS_USE_TRACE_SEMIHOSTING_DEBUG
// #define MICRO_OS_PLUS_USE_TRACE_SEMIHOSTING_STDERR
// #define MICRO_OS_PLUS_INTEGER_TRACE_PRINTF_TMP_ARRAY_SIZE 500

// #define MICRO_OS_PLUS_TRACE_UTILS_LISTS_CONSTRUCT
// #define MICRO_OS_PLUS_TRACE_UTILS_LISTS
#endif // MICRO_OS_PLUS_TRACE

// ----------------------------------------------------------------------------

#endif /* MICRO_OS_PLUS_CONFIG_H_ */

// ----------------------------------------------------------------------------
