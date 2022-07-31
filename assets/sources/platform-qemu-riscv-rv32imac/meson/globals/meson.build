# -----------------------------------------------------------------------------
#
# This file is part of the µOS++ distribution.
#   (https://github.com/micro-os-plus/)
# Copyright (c) 2022 Liviu Ionescu. All rights reserved.
#
# Permission to use, copy, modify, and/or distribute this software
# for any purpose is hereby granted, under the terms of the MIT license.
#
# If a copy of the license was not distributed with this file, it can
# be obtained from https://opensource.org/licenses/MIT/.
#
# -----------------------------------------------------------------------------

# Definitions required for compiling all files, thus the use of
# add_global_*() functions.
# Must be added with subdir() before creating any library or executable.

message('Including platform-qemu-riscv-rv32imac globals...')

# -----------------------------------------------------------------------------

# Required in devices-qemu-riscv-rv32imac.
xpack_device_compile_definition='DEVICE_QEMU_RISCV_RV32IMAC'

# -----------------------------------------------------------------------------

xpack_platform_common_args = []
xpack_platform_common_c_args = []
xpack_platform_common_cpp_args = []
xpack_platform_compile_definitions = []

# -----------------------------------------------------------------------------

# Compiler definitions must passed as options.
xpack_platform_compile_definitions += [
  # Full POSIX conformance:
  # https://pubs.opengroup.org/onlinepubs/9699919799/basedefs/V1_chap02.html#tag_02_01_03
  '-D_POSIX_C_SOURCE=200809L',
]

xpack_platform_common_args += [
  # https://gcc.gnu.org/onlinedocs/gcc/RISC-V-Options.html
  # The compiler matches rv32gc, but better use the explicit string.
  '-march=rv32imac_zicsr',
  '-mabi=ilp32',
  '-mcmodel=medany',
  '-msmall-data-limit=8',

  # '-fno-move-loop-invariants',

  # Embedded builds must be warning free.
  '-Werror',
]

if get_option('buildtype').contains('debug')
  xpack_platform_common_args += [
    '-fno-omit-frame-pointer'
  ]
else
  xpack_platform_common_args += [
    # (.text._write_r+0x14): undefined reference to `_write'
    # (.text._write_r+0x14): relocation truncated to fit: R_RISCV_GPREL_I against undefined symbol `_write'
    # '-flto'
  ]
endif

xpack_platform_common_cpp_args += [
  # '-fno-exceptions',
  # '-fno-rtti',
  # '-fno-use-cxa-atexit',
  '-fno-threadsafe-statics',
]

add_global_arguments(
  xpack_platform_common_args + xpack_platform_common_c_args + xpack_platform_compile_definitions,

  language: [ 'c' ]
)

add_global_arguments(
  xpack_platform_common_args + xpack_platform_common_cpp_args + xpack_platform_compile_definitions,

  language: [ 'cpp' ]
)

foreach xn : xpack_platform_common_args + xpack_platform_common_c_args + xpack_platform_common_cpp_args + xpack_platform_compile_definitions
  message('G+ ' + xn)
endforeach

add_global_link_arguments(
  xpack_platform_common_args + xpack_platform_common_c_args,

  language: [ 'c' ]
)

add_global_link_arguments(
  xpack_platform_common_args + xpack_platform_common_cpp_args,

  language: [ 'cpp' ]
)

# -----------------------------------------------------------------------------
