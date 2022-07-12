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

message('Including platform-qemu-cortex-m7f globals...')

# -----------------------------------------------------------------------------

# Required in devices-qemu-cortexm.
xpack_device_compile_definition='DEVICE_QEMU_CORTEX_M4'

# -----------------------------------------------------------------------------

xpack_platform_common_args = []
xpack_platform_common_c_args = []
xpack_platform_common_cpp_args = []
xpack_platform_compile_definitions = []

# -----------------------------------------------------------------------------

# Compiler definitions must passed as options.
xpack_platform_compile_definitions += [
  '-D_POSIX_C_SOURCE=200809L',
]

xpack_platform_common_args += [
  '-mcpu=cortex-m7',
  '-mthumb',
  '-mfloat-abi=hard',
  # '-mfloat-abi=soft',

  # '-flto' # fails with undefined __assert_func, _write, etc.

  '-fno-move-loop-invariants',

  # Embedded builds must be warning free.
  '-Werror',
]

if get_option('buildtype').contains('debug')
  xpack_platform_common_args += [
    '-fno-omit-frame-pointer'
  ]
endif

xpack_platform_common_cpp_args += [
  # '-fno-exceptions',
  # '-fno-rtti',
  '-fno-use-cxa-atexit',
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

# The base folder is root, via the `top` link.
xpack_dependencies = [
  'xpacks/micro-os-plus-diag-trace', # -

  # -
  # 'xpacks/micro-os-plus-version',
  # -
  'xpacks/xpack-3rd-party-arm-cmsis-core',
  # (architecture) -
  'xpacks/micro-os-plus-architecture-cortexm',

  # +(diag_trace, architecture) >semihosting
  'xpacks/micro-os-plus-semihosting',
  # +(semihosting) >devices_cortexm
  # 'xpacks/micro-os-plus-devices-cortexm',

  # +(arm_cmsis_core_m, devices_cortexm, startup) >devices_qemu_cortexm
  'xpacks/micro-os-plus-devices-qemu-cortexm',
]

# -----------------------------------------------------------------------------
