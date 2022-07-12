# -----------------------------------------------------------------------------
#
# This file is part of the µOS++ distribution.
#   (https://github.com/micro-os-plus/)
# Copyright (c) 2022 Liviu Ionescu
#
# Permission to use, copy, modify, and/or distribute this software
# for any purpose is hereby granted, under the terms of the MIT license.
#
# If a copy of the license was not distributed with this file, it can
# be obtained from https://opensource.org/licenses/MIT/.
#
# -----------------------------------------------------------------------------

# This file defines the global compiler settings that apply to all targets.
# Must be included with include() in the `tests` scope.

message(VERBOSE "Including platform-qemu-cortex-a15 globals...")

# -----------------------------------------------------------------------------

# Required in devices-qemu-cortexa.
set(xpack_device_compile_definition "DEVICE_QEMU_CORTEX_A15")

# Global definitions.
# add_compile_definitions()
# include_directories()

set(xpack_platform_common_args

  # https://gcc.gnu.org/onlinedocs/gcc-11.3.0/gcc/ARM-Options.html#ARM-Options
  -mcpu=cortex-a15

  -fno-move-loop-invariants

  # Embedded builds must be warning free.
  -Werror

  # -flto fails with undefined reference to `__assert_func'...
  # $<$<CONFIG:Release>:-flto>
  # $<$<CONFIG:MinSizeRel>:-flto>

  $<$<CONFIG:Debug>:-fno-omit-frame-pointer>

  # ... libs-c/src/stdlib/exit.c:132:46
  # $<$<CXX_COMPILER_ID:GNU>:-Wno-missing-attributes>

  # $<$<COMPILE_LANGUAGE:C>:-fxxx>

  # https://cmake.org/cmake/help/v3.20/manual/cmake-generator-expressions.7.html?highlight=compile_language#genex:COMPILE_LANGUAGE
  # $<$<COMPILE_LANGUAGE:CXX>:-fno-exceptions>
  # $<$<COMPILE_LANGUAGE:CXX>:-fno-rtti>
  $<$<COMPILE_LANGUAGE:CXX>:-fno-use-cxa-atexit>
  $<$<COMPILE_LANGUAGE:CXX>:-fno-threadsafe-statics>
)

add_compile_definitions(
  # Full POSIX conformance:
  # https://pubs.opengroup.org/onlinepubs/9699919799/basedefs/V1_chap02.html#tag_02_01_03
  _POSIX_C_SOURCE=200809L
)

add_compile_options(
  ${xpack_platform_common_args}
)

# When `-flto` is used, the compile options must be passed to the linker too.
add_link_options(
  ${xpack_platform_common_args}
)

# -----------------------------------------------------------------------------
