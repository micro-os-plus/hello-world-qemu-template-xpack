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

message(VERBOSE "Processing 'platform-qemu-cortex-a15'...")

# -----------------------------------------------------------------------------

set(xpack_platform_compile_definition "PLATFORM_QEMU_CORTEX_A15")

# set(xpack_create_listing true)
# set(xpack_create_hex true)

# -----------------------------------------------------------------------------
# Define the platform library.

add_library(platform-qemu-cortex-a15-interface INTERFACE EXCLUDE_FROM_ALL)

# -----------------------------------------------------------------------------

target_include_directories(platform-qemu-cortex-a15-interface INTERFACE
  "include-platform"
)

target_sources(platform-qemu-cortex-a15-interface INTERFACE
  # None.
)

target_compile_definitions(platform-qemu-cortex-a15-interface INTERFACE
  "${xpack_platform_compile_definition}"
)

target_compile_options(platform-qemu-cortex-a15-interface INTERFACE
  # None.
)

target_link_libraries(platform-qemu-cortex-a15-interface INTERFACE
  micro-os-plus::devices-qemu-aarch32
)

if (COMMAND xpack_display_target_lists)
  xpack_display_target_lists(platform-qemu-cortex-a15-interface)
endif()

# -----------------------------------------------------------------------------
# Aliases.

add_library(micro-os-plus::platform ALIAS platform-qemu-cortex-a15-interface)
message(VERBOSE "> micro-os-plus::platform -> platform-qemu-cortex-a15-interface")

# =============================================================================
# Define the tests executables.

if("${CMAKE_HOST_SYSTEM_NAME}" STREQUAL "Windows")
  set(extension ".cmd")
endif()

function(add_test_executable name)

  add_executable(${name})

  set_target_properties(${name}

    PROPERTIES
      OUTPUT_NAME "${name}"
  )

  # Include folders.
  # `tests/platform-qemu-cortex-a15/include` was added globally.
  target_include_directories(${name} PRIVATE
    # None
  )

  # Application sources.
  target_sources(${name} PRIVATE
    # None
  )

  target_compile_definitions(${name} PRIVATE
    # None
  )

  target_compile_options(${name} PRIVATE
    # None
  )

  target_link_options(${name} PRIVATE
    # -nostartfiles
    --specs=rdimon.specs -Wl,--start-group -lgcc -lc -lc -lm -lrdimon -Wl,--end-group

    # Force the linker to keep the interrupt vectors which otherwise
    # are not referred from anywhere.
    # -u_interrupt_vectors

    # nano has no exceptions.
    # -specs=nano.specs

    -Wl,--gc-sections

    -Wl,-Map,platform-bin/${name}-map.txt
    # -v

    # Including files from other packages is not very nice, but functional.
    # Use absolute paths, otherwise set -L.
    -T${CMAKE_SOURCE_DIR}/xpacks/micro-os-plus-devices-qemu-aarch32/linker-scripts/mem-cortex-a15.ld
    -T${CMAKE_SOURCE_DIR}/xpacks/micro-os-plus-architecture-cortexa/linker-scripts/sections-ram.ld
  )

  target_link_libraries(${name}  PRIVATE
    # Application code.
    app::${name}

    # Portable dependencies.
    micro-os-plus::diag-trace

    # Platform specific dependencies.
    micro-os-plus::platform # bring device & architecture too

    micro-os-plus::semihosting # for the trace implementation
  )

  # TODO use add_custom_target()
  # https://cmake.org/cmake/help/v3.20/command/add_custom_command.html
  add_custom_command(TARGET ${name} POST_BUILD
    COMMAND ${CMAKE_SIZE} --format=berkeley "$<TARGET_FILE:${name}>"
  )

  if (xpack_create_hex)
    add_custom_command(TARGET ${name} POST_BUILD
      COMMAND ${CMAKE_OBJCOPY} -O ihex "$<TARGET_FILE:${name}>" "$<TARGET_FILE:${name}>.hex"
    )
  endif()

  if(xpack_create_listing)
    add_custom_command(TARGET ${name} POST_BUILD
      COMMAND ${CMAKE_OBJDUMP} --source --all-headers --demangle --line-numbers --wide "$<TARGET_FILE:${name}>" > ${name}-list.txt
      VERBATIM
    )
  endif()

  message(VERBOSE "A> ${name}")

endfunction()

# -----------------------------------------------------------------------------

add_test_executable("hello-world")

add_test(
  NAME "hello-world"

  COMMAND qemu-system-arm${extension}
    --machine virt
    --cpu cortex-a15
    --kernel hello-world.elf
    --nographic
    -smp 1
    -d unimp,guest_errors
    --semihosting-config enable=on,target=native,arg=hello-world,arg=A15
)

# -----------------------------------------------------------------------------
