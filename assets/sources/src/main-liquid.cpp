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

// ----------------------------------------------------------------------------

// Print a greeting message on standard output and exit.

int
main(int argc, char* argv[])
{
{% if language == "cpp" -%}
  std::cout << "Hello " << (argc > 1 ? argv[1] : "Arm") << " World!" << std::endl;
{% elsif language == "c" -%}
  printf("Hello %s World!" "\n", argc > 1 ? argv[1] : "Arm");
{% endif -%}

#if defined(MICRO_OS_PLUS_DEBUG)
  puts ("(in debug mode)");
#else
  puts ("(in release mode)");
#endif

  return 0;
}

// ----------------------------------------------------------------------------
