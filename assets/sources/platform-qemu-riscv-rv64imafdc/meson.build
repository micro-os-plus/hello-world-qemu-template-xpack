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

# Create the test applications.

message('Processing platform-qemu-rv64imafdc...')

# -----------------------------------------------------------------------------

xpack_platform_compile_definition = 'PLATFORM_QEMU_RISCV_RV64IMAFDC'

# Enable them only when needed.
xpack_create_listing = false
xpack_create_hex = false

# -----------------------------------------------------------------------------
# Define the platform library.

xpack_common_args = []
xpack_include_directories = []
xpack_sources = []
xpack_compile_definitions = []

# -----------------------------------------------------------------------------

xpack_include_directories += [
  'include-platform',
]

xpack_sources += [
  # None.
]

xpack_compile_definitions += [
  '-D' + xpack_platform_compile_definition,
]

# https://mesonbuild.com/Reference-manual_functions.html#declare_dependency
platform_qemu_riscv_rv64imafdc_dependency = declare_dependency(
  include_directories: include_directories(xpack_include_directories),
  sources: files(xpack_sources),
  compile_args: xpack_common_args + xpack_compile_definitions,
  dependencies: [
    micro_os_plus_devices_qemu_riscv_dependency,
  ]
)

foreach xn : xpack_include_directories
  message('+ -I ' + xn)
endforeach
# Note: depenedencies compile_args not shown.
foreach xn : xpack_sources + xpack_common_args + xpack_compile_definitions
  message('+ ' + xn)
endforeach
message('> platform_qemu_riscv_rv64imafdc_dependency')

# =============================================================================
# Define the tests executables.

# Get the command names from the toolchain file.
size = find_program('size')
objdump = find_program('objdump')
objcopy = find_program('objcopy')

# -----------------------------------------------------------------------------

test_names = [ 'hello-world' ]

foreach name : test_names

  xpack_common_args = []
  xpack_c_args = []
  xpack_cpp_args = []
  xpack_include_directories = []
  xpack_sources = []
  xpack_compile_definitions = []
  xpack_dependencies = []
  xpack_link_args = []
  xpack_link_with = []

  # ---------------------------------------------------------------------------

  xpack_include_directories += [
    # None
  ]

  xpack_sources += [
    # None
  ]

  # xpack_c_args += micro_os_plus_utils_lists_dependency_c_args
  # xpack_cpp_args += micro_os_plus_utils_lists_dependency_cpp_args

  xpack_link_args += [
    '-nostartfiles',

    # Ensure the linker will keep the interrupt vectors which otherwise
    # are not referred from anywhere.
    # '-u_interrupt_vectors',

    # nano has no exceptions.
    # '-specs=nano.specs'

    '-Wl,--gc-sections',

    '-Wl,-Map,'+ name + '-map.txt',
    # '-v',

    # Path are relative to the build folder.
    '-T'+ xpack_project_folder_path + '/xpacks/@micro-os-plus/devices-qemu-riscv/linker-scripts/mem-virt-rv32.ld',
    # '-T'+ xpack_project_folder_path + '/xpacks/@micro-os-plus/architecture-riscv/linker-scripts/sections-flash.ld',
    '-T'+ xpack_project_folder_path + '/xpacks/@micro-os-plus/architecture-riscv/linker-scripts/sections-ram.ld',
  ]

  if name == 'hello-world'
    xpack_dependencies += [
      # Application code.
      app_hello_world_dependency
    ]
  endif

  xpack_dependencies += [
    # Portable dependencies.
    micro_os_plus_diag_trace_dependency,
    # micro_os_plus_micro_test_plus_dependency,
  ]

  xpack_dependencies += [
    # Platform specific dependencies.
    platform_qemu_riscv_rv64imafdc_dependency, # bring device & architecture too

    micro_os_plus_semihosting_dependency,
    micro_os_plus_startup_dependency,
  ]

  xpack_link_with += [
    # None
  ]

  # https://mesonbuild.com/Reference-manual.html#executable
  exe = executable(
    name,
    include_directories: include_directories(xpack_include_directories),
    sources: files(xpack_sources),
    c_args: xpack_common_args + xpack_c_args + xpack_compile_definitions,
    cpp_args: xpack_common_args + xpack_cpp_args + xpack_compile_definitions,
    dependencies: xpack_dependencies,
    link_args: xpack_link_args,
    link_with: xpack_link_with,
    name_suffix: 'elf',
  )

  foreach xn : xpack_include_directories
    message('A+ -I ' + xn)
  endforeach
  # Note: depenedencies compile_args not shown.
  foreach xn : xpack_sources + xpack_common_args + xpack_c_args + xpack_cpp_args + xpack_compile_definitions + xpack_link_args
    message('A+ ' + xn)
  endforeach
  message('A> ' + name)

  # Leave the result in a variable with the test name.
  set_variable(name.underscorify(), exe)

  # https://mesonbuild.com/Reference-manual_functions.html#custom_target
  custom_target(
    name + '-size',

    input: exe,
    output: name + '.size',
    command: [
      size,
      '--format=berkeley',
      '@INPUT@'
    ],
    build_always_stale: true,
    build_by_default: true,
  )

  # --source --all-headers --demangle --line-numbers --wide "xxx.elf"
  custom_target(
    name + '-list',

    input: exe,
    output: name + '-list.txt',
    command: [
      objdump,
      '--source',
      '--all-headers',
      '--demangle',
      '--line-numbers',
      '--wide',
      '@INPUT@'
    ],
    build_always_stale: true,
    build_by_default: xpack_create_listing,
    capture: true,
  )

  # -O ihex "xxx.elf"
  custom_target(
    name + '-hex',

    input: exe,
    output: name + '.hex',
    command: [
      objcopy,
      '-O',
      'ihex',
      '@INPUT@',
      '@OUTPUT@',
    ],
    build_always_stale: true,
    build_by_default: xpack_create_hex,
  )

endforeach

qemu = find_program('qemu-system-riscv64')

# https://mesonbuild.com/Unit-tests.html#malloc_perturb_
nomalloc = environment({'MALLOC_PERTURB_': '0'})

# -----------------------------------------------------------------------------

# https://mesonbuild.com/Reference-manual_functions.html#test
test(
  'hello-world',
  qemu,
  args: [
    '--machine', 'virt',
    '--kernel', hello_world,
    '--nographic',
    '-smp', '1',
    '-bios', 'none',
    '-d', 'unimp,guest_errors',
    '--semihosting-config', 'enable=on,target=native,arg=hello-world,arg=RV64',
  ],
  env: nomalloc
)

# -----------------------------------------------------------------------------
