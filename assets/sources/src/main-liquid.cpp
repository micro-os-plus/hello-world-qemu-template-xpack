/*
 * This file is part of the µOS++ project (https://micro-os-plus.github.io/).
 * Copyright (c) 2022-2026 Liviu Ionescu. All rights reserved.
 *
 * Permission to use, copy, modify, and/or distribute this software
 * for any purpose is hereby granted, under the terms of the MIT license.
 *
 * If a copy of the license was not distributed with this file, it can
 * be obtained from https://opensource.org/licenses/mit.
 */

// ----------------------------------------------------------------------------

#if defined(MICRO_OS_PLUS_INCLUDE_CONFIG_H)
#include <micro-os-plus/config.h>
#endif // MICRO_OS_PLUS_INCLUDE_CONFIG_H

#include <main.h>

{% if language == "cpp" -%}
#include <iostream>
{% elsif language == "c" -%}
#include <stdio.h>
{% endif -%}

#if defined(__arm__) || defined(__aarch64__)
#define DEFAULT_NAME "Arm"
#elif defined(__riscv) || defined(__riscv__)
#define DEFAULT_NAME "RISC-V"
#else
#define DEFAULT_NAME "Unknown"
#endif

// ----------------------------------------------------------------------------

// Print a greeting message on standard output and exit.

int
main(int argc, char* argv[])
{
{% if language == "cpp" -%}
  std::cout << "Hello " << (argc > 1 ? argv[1] : DEFAULT_NAME) << " World!" << std::endl;
{% elsif language == "c" -%}
  printf("Hello %s World!" "\n", argc > 1 ? argv[1] : DEFAULT_NAME);
{% endif -%}

  return 0;
}

// ----------------------------------------------------------------------------
