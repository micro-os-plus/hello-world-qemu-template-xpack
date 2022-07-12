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

#include <stdio.h>

// Print a greeting message on standard output and exit.

int
main(int argc, char* argv[])
{
  printf("Hello %s World!" "\n", argc > 1 ? argv[1] : "Arm");

#if defined(MICRO_OS_PLUS_DEBUG)
  puts ("(in debug mode)");
#else
  puts ("(in release mode)");
#endif

  return 0;
}

// ----------------------------------------------------------------------------
