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

# This file adds the platform dependencies.

# The base folder is root, via the `top` link.
xpack_dependencies = [
  # -
  'xpacks/@micro-os-plus/diag-trace',
  # -
  # 'xpacks/@micro-os-plus/micro-test-plus',

  # -
  # 'xpacks/@micro-os-plus/version',
  # -
  # 'xpacks/@xpack-3rd-party/arm-cmsis-core',
  # (architecture) -
  'xpacks/@micro-os-plus/architecture-aarch64',

  # +(diag_trace, architecture) >semihosting
  'xpacks/@micro-os-plus/semihosting',

  # -
  'xpacks/@micro-os-plus/startup',

  # +(arm_cmsis_core_m, devices_aarch64, startup) >devices_qemu_aarch64
  'xpacks/@micro-os-plus/devices-qemu-aarch64',
]

# -----------------------------------------------------------------------------
