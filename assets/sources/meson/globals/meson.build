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
## Common definitions for all platforms ##

xpack_global_common_args = []
xpack_global_include_directories = []
xpack_global_compile_definitions = []

# -----------------------------------------------------------------------------

# Assume GCC or clang, for MSVC things are different
# https://mesonbuild.com/Reference-tables.html#c_compiler-ids
if c_compiler.get_id() == 'gcc' or c_compiler.get_id().contains('clang')

  # Always add the `include-config` folder.
  xpack_global_include_directories += [ '-I../../platform-' + xpack_platform_name + '/include-config' ]

  # Global compiler preprocessor definitions.
  # Native builds may not use them.
  if get_option('buildtype').contains('debug')
    # TODO: remove DEBUG
    xpack_global_compile_definitions += [ '-DDEBUG' ]

    xpack_global_compile_definitions += [ '-DMICRO_OS_PLUS_DEBUG' ]
    xpack_global_compile_definitions += [ '-DMICRO_OS_PLUS_TRACE' ]
  elif get_option('buildtype') == 'release'
    xpack_global_compile_definitions += [ '-DNDEBUG' ]
  endif
  xpack_global_compile_definitions += [ '-DMICRO_OS_PLUS_INCLUDE_CONFIG_H' ]

  # DO NOT define it globally, one test does not need it!
  # xpack_global_compile_definitions += ['-DMICRO_OS_PLUS_TRACE']

  # Options for both compilers and linkers. When using `-flto`, all options
  # must also be passed to the linker.

  if get_option('buildtype') == 'debug'
    # xpack_global_common_args += [ '-O0' ]
  elif get_option('buildtype') == 'debugoptimized'
    xpack_global_common_args += [ '-Og' ] # Override -O2
  elif get_option('buildtype') == 'minsize'
    # xpack_global_common_args += [ '-Os' ]
  elif get_option('buildtype') == 'release'
    # xpack_global_common_args += [ '-O3' ]
  else
    xpack_global_common_args += [ '-O' ]
  endif

  xpack_global_common_args += [
    '-fmessage-length=0',
    '-fsigned-char',

    # These are used in conjunction with linker `--gc-sections`.
    '-ffunction-sections',
    '-fdata-sections',

    '-fdiagnostics-color=always',
  ]

  add_global_arguments(
    xpack_global_include_directories + xpack_global_common_args + xpack_global_compile_definitions,

    language: [ 'c', 'cpp' ]
  )

  foreach xn : xpack_global_include_directories + xpack_global_common_args + xpack_global_compile_definitions
    message('G+ ' + xn)
  endforeach

  # When `-flto` is used, the compile options must be passed to the linker too.
  add_global_link_arguments(
    xpack_global_common_args,

    language: [ 'c', 'cpp' ]
  )

  # Warnings must be included from the tests.

else
  message('Unsupported compiler')
endif

# -----------------------------------------------------------------------------
