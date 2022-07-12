[![npm (scoped)](https://img.shields.io/npm/v/@micro-os-plus/hello-world-qemu-template)](https://www.npmjs.com/package/@micro-os-plus/hello-world-qemu-template)
[![GitHub tag (latest by date)](https://img.shields.io/github/v/tag/micro-os-plus/hello-world-qemu-template-xpack)](https://github.com/micro-os-plus/hello-world-qemu-template-xpack)
[![license](https://img.shields.io/github/license/micro-os-plus/hello-world-qemu-template-xpack)](https://github.com/micro-os-plus/hello-world-qemu-template-xpack/blob/micro-os-plus/LICENSE)
[![CI on Push](https://github.com/micro-os-plus/hello-world-qemu-template-xpack/actions/workflows/CI.yml/badge.svg)](https://github.com/micro-os-plus/hello-world-qemu-template-xpack/actions/workflows/CI.yml)

# A source xPack with a template to generate semihosted Hello World projects running on QEMU

Generate simple bare-metal _Hello World_
projects that run on QEMU.

The project is hosted on GitHub as
[micro-os-plus/hello-world-qemu-template-xpack](https://github.com/micro-os-plus/hello-world-qemu-template-xpack),
and is also available from npmjs.com as
[@micro-os-plus/hello-world-qemu-template](https://www.npmjs.com/package/@micro-os-plus/hello-world-qemu-template).

## Features

This project generates multiple variants of the classical application
that prints the _Hello World_ message on standard output.

Both C and C++ are supported, with **CMake** and **meson** as build system
generators.

The `hello-world-qemu-template` project is part of the
[µOS++](https://github.com/micro-os-plus/).

It can be invoked in a terminal, but the main intended use was
to be integrated into the **VS Code xPack Build extension**, to
generate new projects.

## Prerequisites

A recent [xpm](https://xpack.github.io/xpm/), which is a portable
[Node.js](https://nodejs.org/) command line application.

```sh
npm install --global xpm@latest
```

If installing over a previous version fails, uninstall first:

```sh
npm uninstall --global xpm
npm install --global xpm@latest
```

## User info

### Template instantiation via `xpm init`

Instantiating the template can be done via the `xpm init --template` command,
pointing to this xPack.

This command must be invoked in an empty folder, where the project
will be generated.

There are two modes, interactive and non interactive (from a script).

#### Interactive mode

Starting the tool without any command line options will select the
interactive mode and the user can manually enter each choice.

Starting the tool without defining the programming language will select the
interactive mode and the user can manually enter each choice.

```console
% mkdir -p my-project && cd my-project
% xpm init --template @micro-os-plus/hello-world-qemu-template@latest

Checking package @micro-os-plus/hello-world-qemu-template@latest metadata...
Installing @micro-os-plus/hello-world-qemu-template@1.0.0...
Processing @micro-os-plus/hello-world-qemu-template@1.0.0...

Target? (cortex-m7f, cortex-m0, cortex-a15, cortex-a72, ?) [cortex-m7f]:
Programming language? (c, cpp, ?) [cpp]:
Build System? (cmake, meson, ?) [cmake]:
Creating the C++ project 'my-project'...
Folder 'cmake' copied.
File 'CMakeLists.txt' generated.
File 'src/main.cpp' copied.
Folder 'include' copied.
Folder 'platform-qemu-cortex-m7f' copied.
File '.vscode/tasks.json' copied.
File '.vscode/settings.json' copied.
File '.clang-format' copied.
File 'README.md' generated.
File 'LICENSE' generated.
File 'package.json' generated.
%
```

#### Scriptable mode

When used in non-interactive environments, it is possible to pass
all required data on the
command line. The only mandatory property is `language`, all other
have defaults.

```console
% mkdir -p my-project && cd my-project
% xpm init --template @micro-os-plus/hello-world-qemu-template@latest --property target=cortex-m7f

Installing @micro-os-plus/hello-world-qemu-template@1.0.0...
Processing @micro-os-plus/hello-world-qemu-template@1.0.0...

Creating the C++ project 'my-project'...
- target=cortex-m7f
- buildGenerator=cmake

Folder 'cmake' copied.
File 'CMakeLists.txt' generated.
File 'src/main.cpp' copied.
Folder 'include' copied.
Folder 'platform-qemu-cortex-m7f' copied.
File '.vscode/tasks.json' copied.
File '.vscode/settings.json' copied.
File '.clang-format' copied.
File 'README.md' generated.
File 'LICENSE' generated.
File 'package.json' generated.
%
```

### Satisfy dependencies

The next step is to install all packages required, either source packages or
binary tools.

This is done by issuing the `xpm install` command in the project folder:

```console
% cd my-project
% xpm install
@my-scope/my-project...
+ @micro-os-plus/devices-qemu-cortexm@4.1.1
+ @micro-os-plus/build-helper@2.9.0
+ @micro-os-plus/architecture-cortexm@6.1.0
+ @xpack-3rd-party/arm-cmsis-core@5.4.0-6
+ @micro-os-plus/semihosting@5.0.0
+ @micro-os-plus/diag-trace@4.0.0
+ @xpack-dev-tools/arm-none-eabi-gcc@11.2.1-1.2.2
+ @xpack-dev-tools/ninja-build@1.10.2-5.1
+ @xpack-dev-tools/qemu-arm@7.0.0-1.1
+ @xpack-dev-tools/cmake@3.20.6-2.1
'xpacks/micro-os-plus-devices-qemu-cortexm' -> '/Users/ilg/Library/xPacks/@micro-os-plus/devices-qemu-cortexm/4.1.1'
'xpacks/micro-os-plus-build-helper' -> '/Users/ilg/Library/xPacks/@micro-os-plus/build-helper/2.9.0'
'xpacks/micro-os-plus-architecture-cortexm' -> '/Users/ilg/Library/xPacks/@micro-os-plus/architecture-cortexm/6.1.0'
'xpacks/micro-os-plus-semihosting' -> '/Users/ilg/Library/xPacks/@micro-os-plus/semihosting/5.0.0'
'xpacks/xpack-3rd-party-arm-cmsis-core' -> '/Users/ilg/Library/xPacks/@xpack-3rd-party/arm-cmsis-core/5.4.0-6'
'xpacks/micro-os-plus-diag-trace' -> '/Users/ilg/Library/xPacks/@micro-os-plus/diag-trace/4.0.0'
'xpacks/xpack-dev-tools-arm-none-eabi-gcc' -> '/Users/ilg/Library/xPacks/@xpack-dev-tools/arm-none-eabi-gcc/11.2.1-1.2.2'
'xpacks/xpack-dev-tools-ninja-build' -> '/Users/ilg/Library/xPacks/@xpack-dev-tools/ninja-build/1.10.2-5.1'
'xpacks/xpack-dev-tools-qemu-arm' -> '/Users/ilg/Library/xPacks/@xpack-dev-tools/qemu-arm/7.0.0-1.1'
'xpacks/xpack-dev-tools-cmake' -> '/Users/ilg/Library/xPacks/@xpack-dev-tools/cmake/3.20.6-2.1'
'xpacks/.bin/arm-none-eabi-addr2line' -> '../xpack-dev-tools-arm-none-eabi-gcc/.content/bin/arm-none-eabi-addr2line'
'xpacks/.bin/qemu-system-arm' -> '../xpack-dev-tools-qemu-arm/.content/bin/qemu-system-arm'
'xpacks/.bin/ccmake' -> '../xpack-dev-tools-cmake/.content/bin/ccmake'
'xpacks/.bin/ninja' -> '../xpack-dev-tools-ninja-build/.content/bin/ninja'
'xpacks/.bin/arm-none-eabi-ar' -> '../xpack-dev-tools-arm-none-eabi-gcc/.content/bin/arm-none-eabi-ar'
'xpacks/.bin/qemu-system-aarch64' -> '../xpack-dev-tools-qemu-arm/.content/bin/qemu-system-aarch64'
'xpacks/.bin/cmake' -> '../xpack-dev-tools-cmake/.content/bin/cmake'
'xpacks/.bin/arm-none-eabi-as' -> '../xpack-dev-tools-arm-none-eabi-gcc/.content/bin/arm-none-eabi-as'
'xpacks/.bin/qemu-system-gnuarmeclipse' -> '../xpack-dev-tools-qemu-arm/.content/bin/qemu-system-gnuarmeclipse'
'xpacks/.bin/cpack' -> '../xpack-dev-tools-cmake/.content/bin/cpack'
'xpacks/.bin/arm-none-eabi-as-py3' -> '../xpack-dev-tools-arm-none-eabi-gcc/.content/bin/arm-none-eabi-as-py3'
'xpacks/.bin/ctest' -> '../xpack-dev-tools-cmake/.content/bin/ctest'
'xpacks/.bin/arm-none-eabi-c++' -> '../xpack-dev-tools-arm-none-eabi-gcc/.content/bin/arm-none-eabi-c++'
'xpacks/.bin/arm-none-eabi-c++filt' -> '../xpack-dev-tools-arm-none-eabi-gcc/.content/bin/arm-none-eabi-c++filt'
'xpacks/.bin/arm-none-eabi-cpp' -> '../xpack-dev-tools-arm-none-eabi-gcc/.content/bin/arm-none-eabi-cpp'
'xpacks/.bin/arm-none-eabi-elfedit' -> '../xpack-dev-tools-arm-none-eabi-gcc/.content/bin/arm-none-eabi-elfedit'
'xpacks/.bin/arm-none-eabi-g++' -> '../xpack-dev-tools-arm-none-eabi-gcc/.content/bin/arm-none-eabi-g++'
'xpacks/.bin/arm-none-eabi-gcc' -> '../xpack-dev-tools-arm-none-eabi-gcc/.content/bin/arm-none-eabi-gcc'
'xpacks/.bin/arm-none-eabi-gcc-ar' -> '../xpack-dev-tools-arm-none-eabi-gcc/.content/bin/arm-none-eabi-gcc-ar'
'xpacks/.bin/arm-none-eabi-gcc-nm' -> '../xpack-dev-tools-arm-none-eabi-gcc/.content/bin/arm-none-eabi-gcc-nm'
'xpacks/.bin/arm-none-eabi-gcc-ranlib' -> '../xpack-dev-tools-arm-none-eabi-gcc/.content/bin/arm-none-eabi-gcc-ranlib'
'xpacks/.bin/arm-none-eabi-gcov' -> '../xpack-dev-tools-arm-none-eabi-gcc/.content/bin/arm-none-eabi-gcov'
'xpacks/.bin/arm-none-eabi-gcov-dump' -> '../xpack-dev-tools-arm-none-eabi-gcc/.content/bin/arm-none-eabi-gcov-dump'
'xpacks/.bin/arm-none-eabi-gcov-tool' -> '../xpack-dev-tools-arm-none-eabi-gcc/.content/bin/arm-none-eabi-gcov-tool'
'xpacks/.bin/arm-none-eabi-gdb' -> '../xpack-dev-tools-arm-none-eabi-gcc/.content/bin/arm-none-eabi-gdb'
'xpacks/.bin/arm-none-eabi-gdb-add-index' -> '../xpack-dev-tools-arm-none-eabi-gcc/.content/bin/arm-none-eabi-gdb-add-index'
'xpacks/.bin/arm-none-eabi-gdb-add-index-py3' -> '../xpack-dev-tools-arm-none-eabi-gcc/.content/bin/arm-none-eabi-gdb-add-index-py3'
'xpacks/.bin/arm-none-eabi-gdb-py3' -> '../xpack-dev-tools-arm-none-eabi-gcc/.content/bin/arm-none-eabi-gdb-py3'
'xpacks/.bin/arm-none-eabi-gfortran' -> '../xpack-dev-tools-arm-none-eabi-gcc/.content/bin/arm-none-eabi-gfortran'
'xpacks/.bin/arm-none-eabi-gprof' -> '../xpack-dev-tools-arm-none-eabi-gcc/.content/bin/arm-none-eabi-gprof'
'xpacks/.bin/arm-none-eabi-gprof-py3' -> '../xpack-dev-tools-arm-none-eabi-gcc/.content/bin/arm-none-eabi-gprof-py3'
'xpacks/.bin/arm-none-eabi-ld' -> '../xpack-dev-tools-arm-none-eabi-gcc/.content/bin/arm-none-eabi-ld'
'xpacks/.bin/arm-none-eabi-ld.bfd' -> '../xpack-dev-tools-arm-none-eabi-gcc/.content/bin/arm-none-eabi-ld.bfd'
'xpacks/.bin/arm-none-eabi-lto-dump' -> '../xpack-dev-tools-arm-none-eabi-gcc/.content/bin/arm-none-eabi-lto-dump'
'xpacks/.bin/arm-none-eabi-nm' -> '../xpack-dev-tools-arm-none-eabi-gcc/.content/bin/arm-none-eabi-nm'
'xpacks/.bin/arm-none-eabi-objcopy' -> '../xpack-dev-tools-arm-none-eabi-gcc/.content/bin/arm-none-eabi-objcopy'
'xpacks/.bin/arm-none-eabi-objdump' -> '../xpack-dev-tools-arm-none-eabi-gcc/.content/bin/arm-none-eabi-objdump'
'xpacks/.bin/arm-none-eabi-ranlib' -> '../xpack-dev-tools-arm-none-eabi-gcc/.content/bin/arm-none-eabi-ranlib'
'xpacks/.bin/arm-none-eabi-readelf' -> '../xpack-dev-tools-arm-none-eabi-gcc/.content/bin/arm-none-eabi-readelf'
'xpacks/.bin/arm-none-eabi-size' -> '../xpack-dev-tools-arm-none-eabi-gcc/.content/bin/arm-none-eabi-size'
'xpacks/.bin/arm-none-eabi-strings' -> '../xpack-dev-tools-arm-none-eabi-gcc/.content/bin/arm-none-eabi-strings'
'xpacks/.bin/arm-none-eabi-strip' -> '../xpack-dev-tools-arm-none-eabi-gcc/.content/bin/arm-none-eabi-strip'
%
```

### Build and test

The generated project includes dependencies to all build tools, except
the toolchain, which must be available in a system location, such that
the build system generator can find it.

```console
% cd my-project
% xpm run test-all
> xpm run test-qemu-cortex-m7f-cmake-debug
> xpm run prepare --config qemu-cortex-m7f-cmake-debug
> cmake -S . -B build/qemu-cortex-m7f-cmake-debug -G Ninja -D CMAKE_BUILD_TYPE=Debug -D PLATFORM_NAME=qemu-cortex-m7f -D CMAKE_EXPORT_COMPILE_COMMANDS=ON --log-level=VERBOSE -D CMAKE_TOOLCHAIN_FILE=xpacks/micro-os-plus-build-helper/cmake/toolchains/arm-none-eabi-gcc.cmake
-- The C compiler identification is GNU 11.2.1
-- The CXX compiler identification is GNU 11.2.1
-- Detecting C compiler ABI info
-- Detecting C compiler ABI info - done
-- Check for working C compiler: /Users/ilg/tmp/my-project/xpacks/.bin/arm-none-eabi-gcc - skipped
-- Detecting C compile features
-- Detecting C compile features - done
-- Detecting CXX compiler ABI info
-- Detecting CXX compiler ABI info - done
-- Check for working CXX compiler: /Users/ilg/tmp/my-project/xpacks/.bin/arm-none-eabi-g++ - skipped
-- Detecting CXX compile features
-- Detecting CXX compile features - done
-- The ASM compiler identification is GNU
-- Found assembler: /Users/ilg/tmp/my-project/xpacks/.bin/arm-none-eabi-gcc
-- Including micro-os-plus-build-helper module...
-- CMake version: 3.20.6-gc90b991
-- Compiler: GNU 11.2.1
-- package.name: @my-scope/my-project
-- package.version: 1.0.0
-- Platform name: qemu-cortex-m7f
-- Build type: Debug
-- Project path: /Users/ilg/tmp/my-project
-- Build path: /Users/ilg/tmp/my-project/build/qemu-cortex-m7f-cmake-debug
-- Module path: /Users/ilg/tmp/my-project/xpacks/micro-os-plus-build-helper/cmake
-- CMAKE_C_COMPILER_ID: GNU
-- CMAKE_SYSTEM_NAME: Generic
-- CMAKE_SYSTEM_PROCESSOR: arm
-- Including global definitions...
-- Adding GCC warnings...
-- Including platform-qemu-cortex-m7f globals...
-- .G+ -I platform-qemu-cortex-m7f/include-config
-- .G+ -D $<$<CONFIG:Debug>:MICRO_OS_PLUS_DEBUG>
-- .G+ -D $<$<CONFIG:Debug>:MICRO_OS_PLUS_TRACE>
-- .G+ -D MICRO_OS_PLUS_INCLUDE_CONFIG_H
-- .G+ -D _POSIX_C_SOURCE=200809L
-- .G+ -fmessage-length=0
-- .G+ -fsigned-char
-- .G+ -ffunction-sections
-- .G+ -fdata-sections
-- .G+ -fdiagnostics-color=always
-- .G+ -Wall
...
-- .G+ -Wvla
-- .G+ $<$<COMPILE_LANGUAGE:C>:-Wbad-function-cast>
...
-- .G+ $<$<COMPILE_LANGUAGE:CXX>:-Wmismatched-tags>
-- .G+ -mcpu=cortex-m7
-- .G+ -mthumb
-- .G+ -mfloat-abi=hard
-- .G+ -fno-move-loop-invariants
-- .G+ -Werror
-- .G+ $<$<CONFIG:Debug>:-fno-omit-frame-pointer>
-- .G+ $<$<COMPILE_LANGUAGE:CXX>:-fno-use-cxa-atexit>
-- .G+ $<$<COMPILE_LANGUAGE:CXX>:-fno-threadsafe-statics>
-- Adding 'xpacks/micro-os-plus-architecture-cortexm'...
-- Processing xPack @micro-os-plus/architecture-cortexm@6.1.0...
-- > micro-os-plus-architecture-cortexm-interface
-- + -I include
-- > micro-os-plus::architecture-cortexm -> micro-os-plus-architecture-cortexm-interface
-- > micro-os-plus::architecture -> micro-os-plus-architecture-cortexm-interface
-- Adding 'xpacks/micro-os-plus-devices-qemu-cortexm'...
-- Processing xPack @micro-os-plus/devices-qemu-cortexm@4.1.1...
-- > micro-os-plus-devices-qemu-cortexm-interface
-- + -I include
-- + src/reset-handler.c
-- + src/system-cortexm.c
-- + src/vectors-cortexm.c
-- + src/exception-handlers.cpp
-- + -D DEVICE_QEMU_CORTEX_M7
-- + xpack-3rd-party::arm-cmsis-core-m
-- > micro-os-plus::devices-qemu-cortexm -> micro-os-plus-devices-qemu-cortexm-interface
-- > micro-os-plus::device -> micro-os-plus-devices-qemu-cortexm-interface
-- Adding 'xpacks/micro-os-plus-diag-trace'...
-- Processing xPack @micro-os-plus/diag-trace@4.0.0...
-- > micro-os-plus-diag-trace-interface
-- + -I include
-- + src/trace.cpp
-- > micro-os-plus::diag-trace -> micro-os-plus-diag-trace-interface
-- Adding 'xpacks/micro-os-plus-semihosting'...
-- Processing xPack @micro-os-plus/semihosting@5.0.0...
-- > micro-os-plus-semihosting-interface
-- + -I include
-- + src/syscalls-semihosting.cpp
-- + src/trace-semihosting.cpp
-- + micro-os-plus::diag-trace
-- + micro-os-plus::architecture
-- > micro-os-plus::semihosting -> micro-os-plus-semihosting-interface
-- Adding 'xpacks/xpack-3rd-party-arm-cmsis-core'...
-- Processing xPack @xpack-3rd-party/arm-cmsis-core@5.4.0-6...
-- > xpack-3rd-party-arm-cmsis-core-m-interface
-- + -I CMSIS/Core/Include
-- + -D __PROGRAM_START
-- > xpack-3rd-party::arm-cmsis-core-m -> xpack-3rd-party-arm-cmsis-core-m-interface
-- > xpack-3rd-party-arm-cmsis-core-a-interface
-- + -I CMSIS/Core_A/Include
-- + -D __PROGRAM_START
-- > xpack-3rd-party::arm-cmsis-core-a -> xpack-3rd-party-arm-cmsis-core-a-interface
-- > hello-world-interface
-- + -I include
-- + src/main.cpp
-- > app::hello-world -> hello-world-interface
-- Processing 'platform-qemu-cortex-m7f'...
-- > platform-qemu-cortex-m7f-interface
-- + -I include-platform
-- + -D PLATFORM_QEMU_CORTEX_M7F
-- + micro-os-plus::devices-qemu-cortexm
-- > micro-os-plus::platform -> platform-qemu-cortex-m7f-interface
-- A> hello-world
-- Configuring done
-- Generating done
-- Build files have been written to: /Users/ilg/tmp/my-project/build/qemu-cortex-m7f-cmake-debug
> xpm run build --config qemu-cortex-m7f-cmake-debug
> cmake -S . -B build/qemu-cortex-m7f-cmake-debug -G Ninja -D CMAKE_BUILD_TYPE=Debug -D PLATFORM_NAME=qemu-cortex-m7f -D CMAKE_EXPORT_COMPILE_COMMANDS=ON
-- Configuring done
-- Generating done
-- Build files have been written to: /Users/ilg/tmp/my-project/build/qemu-cortex-m7f-cmake-debug
> cmake --build build/qemu-cortex-m7f-cmake-debug
[9/9] Linking CXX executable platform-bin/hello-world.elf
   text	   data	    bss	    dec	    hex	filename
 354288	   5040	   8760	 368088	  59dd8	/Users/ilg/tmp/my-project/build/qemu-cortex-m7f-cmake-debug/platform-bin/hello-world.elf
> xpm run test --config qemu-cortex-m7f-cmake-debug
> cd build/qemu-cortex-m7f-cmake-debug && ctest -V
UpdateCTestConfiguration  from :/Users/ilg/tmp/my-project/build/qemu-cortex-m7f-cmake-debug/DartConfiguration.tcl
UpdateCTestConfiguration  from :/Users/ilg/tmp/my-project/build/qemu-cortex-m7f-cmake-debug/DartConfiguration.tcl
Test project /Users/ilg/tmp/my-project/build/qemu-cortex-m7f-cmake-debug
Constructing a list of tests
Done constructing a list of tests
Updating test list for fixtures
Added 0 tests to meet fixture requirements
Checking test dependency graph...
Checking test dependency graph end
test 1
    Start 1: hello-world

1: Test command: /Users/ilg/tmp/my-project/xpacks/.bin/qemu-system-arm "--machine" "mps2-an500" "--cpu" "cortex-m7" "--kernel" "hello-world.elf" "--nographic" "-d" "unimp,guest_errors" "--semihosting-config" "enable=on,target=native,arg=hello-world,arg=M7"
1: Test timeout computed to be: 10000000
1: Hello M7 World!
1: (in debug mode)
1/1 Test #1: hello-world ......................   Passed    0.04 sec

100% tests passed, 0 tests failed out of 1

Total Test time (real) =   0.04 sec
> xpm run test-qemu-cortex-m7f-cmake-release
> xpm run prepare --config qemu-cortex-m7f-cmake-release
> cmake -S . -B build/qemu-cortex-m7f-cmake-release -G Ninja -D CMAKE_BUILD_TYPE=Release -D PLATFORM_NAME=qemu-cortex-m7f -D CMAKE_EXPORT_COMPILE_COMMANDS=ON --log-level=VERBOSE -D CMAKE_TOOLCHAIN_FILE=xpacks/micro-os-plus-build-helper/cmake/toolchains/arm-none-eabi-gcc.cmake
-- The C compiler identification is GNU 11.2.1
-- The CXX compiler identification is GNU 11.2.1
-- Detecting C compiler ABI info
-- Detecting C compiler ABI info - done
-- Check for working C compiler: /Users/ilg/tmp/my-project/xpacks/.bin/arm-none-eabi-gcc - skipped
-- Detecting C compile features
-- Detecting C compile features - done
-- Detecting CXX compiler ABI info
-- Detecting CXX compiler ABI info - done
-- Check for working CXX compiler: /Users/ilg/tmp/my-project/xpacks/.bin/arm-none-eabi-g++ - skipped
-- Detecting CXX compile features
-- Detecting CXX compile features - done
-- The ASM compiler identification is GNU
-- Found assembler: /Users/ilg/tmp/my-project/xpacks/.bin/arm-none-eabi-gcc
-- Including micro-os-plus-build-helper module...
-- CMake version: 3.20.6-gc90b991
-- Compiler: GNU 11.2.1
-- package.name: @my-scope/my-project
-- package.version: 1.0.0
-- Platform name: qemu-cortex-m7f
-- Build type: Release
-- Project path: /Users/ilg/tmp/my-project
-- Build path: /Users/ilg/tmp/my-project/build/qemu-cortex-m7f-cmake-release
-- Module path: /Users/ilg/tmp/my-project/xpacks/micro-os-plus-build-helper/cmake
-- CMAKE_C_COMPILER_ID: GNU
-- CMAKE_SYSTEM_NAME: Generic
-- CMAKE_SYSTEM_PROCESSOR: arm
-- Including global definitions...
-- Adding GCC warnings...
-- Including platform-qemu-cortex-m7f globals...
-- .G+ -I platform-qemu-cortex-m7f/include-config
-- .G+ -D $<$<CONFIG:Debug>:MICRO_OS_PLUS_DEBUG>
-- .G+ -D $<$<CONFIG:Debug>:MICRO_OS_PLUS_TRACE>
-- .G+ -D MICRO_OS_PLUS_INCLUDE_CONFIG_H
-- .G+ -D _POSIX_C_SOURCE=200809L
-- .G+ -fmessage-length=0
-- .G+ -fsigned-char
-- .G+ -ffunction-sections
-- .G+ -fdata-sections
-- .G+ -fdiagnostics-color=always
-- .G+ -Wall
-- .G+ -Waggregate-return
...
-- .G+ $<$<COMPILE_LANGUAGE:CXX>:-Wmismatched-tags>
-- .G+ -mcpu=cortex-m7
-- .G+ -mthumb
-- .G+ -mfloat-abi=hard
-- .G+ -fno-move-loop-invariants
-- .G+ -Werror
-- .G+ $<$<CONFIG:Debug>:-fno-omit-frame-pointer>
-- .G+ $<$<COMPILE_LANGUAGE:CXX>:-fno-use-cxa-atexit>
-- .G+ $<$<COMPILE_LANGUAGE:CXX>:-fno-threadsafe-statics>
-- Adding 'xpacks/micro-os-plus-architecture-cortexm'...
-- Processing xPack @micro-os-plus/architecture-cortexm@6.1.0...
-- > micro-os-plus-architecture-cortexm-interface
-- + -I include
-- > micro-os-plus::architecture-cortexm -> micro-os-plus-architecture-cortexm-interface
-- > micro-os-plus::architecture -> micro-os-plus-architecture-cortexm-interface
-- Adding 'xpacks/micro-os-plus-devices-qemu-cortexm'...
-- Processing xPack @micro-os-plus/devices-qemu-cortexm@4.1.1...
-- > micro-os-plus-devices-qemu-cortexm-interface
-- + -I include
-- + src/reset-handler.c
-- + src/system-cortexm.c
-- + src/vectors-cortexm.c
-- + src/exception-handlers.cpp
-- + -D DEVICE_QEMU_CORTEX_M7
-- + xpack-3rd-party::arm-cmsis-core-m
-- > micro-os-plus::devices-qemu-cortexm -> micro-os-plus-devices-qemu-cortexm-interface
-- > micro-os-plus::device -> micro-os-plus-devices-qemu-cortexm-interface
-- Adding 'xpacks/micro-os-plus-diag-trace'...
-- Processing xPack @micro-os-plus/diag-trace@4.0.0...
-- > micro-os-plus-diag-trace-interface
-- + -I include
-- + src/trace.cpp
-- > micro-os-plus::diag-trace -> micro-os-plus-diag-trace-interface
-- Adding 'xpacks/micro-os-plus-semihosting'...
-- Processing xPack @micro-os-plus/semihosting@5.0.0...
-- > micro-os-plus-semihosting-interface
-- + -I include
-- + src/syscalls-semihosting.cpp
-- + src/trace-semihosting.cpp
-- + micro-os-plus::diag-trace
-- + micro-os-plus::architecture
-- > micro-os-plus::semihosting -> micro-os-plus-semihosting-interface
-- Adding 'xpacks/xpack-3rd-party-arm-cmsis-core'...
-- Processing xPack @xpack-3rd-party/arm-cmsis-core@5.4.0-6...
-- > xpack-3rd-party-arm-cmsis-core-m-interface
-- + -I CMSIS/Core/Include
-- + -D __PROGRAM_START
-- > xpack-3rd-party::arm-cmsis-core-m -> xpack-3rd-party-arm-cmsis-core-m-interface
-- > xpack-3rd-party-arm-cmsis-core-a-interface
-- + -I CMSIS/Core_A/Include
-- + -D __PROGRAM_START
-- > xpack-3rd-party::arm-cmsis-core-a -> xpack-3rd-party-arm-cmsis-core-a-interface
-- > hello-world-interface
-- + -I include
-- + src/main.cpp
-- > app::hello-world -> hello-world-interface
-- Processing 'platform-qemu-cortex-m7f'...
-- > platform-qemu-cortex-m7f-interface
-- + -I include-platform
-- + -D PLATFORM_QEMU_CORTEX_M7F
-- + micro-os-plus::devices-qemu-cortexm
-- > micro-os-plus::platform -> platform-qemu-cortex-m7f-interface
-- A> hello-world
-- Configuring done
-- Generating done
-- Build files have been written to: /Users/ilg/tmp/my-project/build/qemu-cortex-m7f-cmake-release
> xpm run build --config qemu-cortex-m7f-cmake-release
> cmake -S . -B build/qemu-cortex-m7f-cmake-release -G Ninja -D CMAKE_BUILD_TYPE=Release -D PLATFORM_NAME=qemu-cortex-m7f -D CMAKE_EXPORT_COMPILE_COMMANDS=ON
-- Configuring done
-- Generating done
-- Build files have been written to: /Users/ilg/tmp/my-project/build/qemu-cortex-m7f-cmake-release
> cmake --build build/qemu-cortex-m7f-cmake-release
[9/9] Linking CXX executable platform-bin/hello-world.elf
   text	   data	    bss	    dec	    hex	filename
 352520	   5040	   8760	 366320	  596f0	/Users/ilg/tmp/my-project/build/qemu-cortex-m7f-cmake-release/platform-bin/hello-world.elf
> xpm run test --config qemu-cortex-m7f-cmake-release
> cd build/qemu-cortex-m7f-cmake-release && ctest -V
UpdateCTestConfiguration  from :/Users/ilg/tmp/my-project/build/qemu-cortex-m7f-cmake-release/DartConfiguration.tcl
UpdateCTestConfiguration  from :/Users/ilg/tmp/my-project/build/qemu-cortex-m7f-cmake-release/DartConfiguration.tcl
Test project /Users/ilg/tmp/my-project/build/qemu-cortex-m7f-cmake-release
Constructing a list of tests
Done constructing a list of tests
Updating test list for fixtures
Added 0 tests to meet fixture requirements
Checking test dependency graph...
Checking test dependency graph end
test 1
    Start 1: hello-world

1: Test command: /Users/ilg/tmp/my-project/xpacks/.bin/qemu-system-arm "--machine" "mps2-an500" "--cpu" "cortex-m7" "--kernel" "hello-world.elf" "--nographic" "-d" "unimp,guest_errors" "--semihosting-config" "enable=on,target=native,arg=hello-world,arg=M7"
1: Test timeout computed to be: 10000000
1: Hello M7 World!
1: (in release mode)
1/1 Test #1: hello-world ......................   Passed    0.04 sec

100% tests passed, 0 tests failed out of 1

Total Test time (real) =   0.04 sec
%
```

### Toolchain

The generated projects use the **xPack GNU Compiler Collection** toolchains.

## Known problems

- On Windows, the VS Code IntelliSense logic does not properly identify
  the toolchain when installed via npm/xpm ([#28](https://github.com/micro-os-plus/vscode-xpack-extension-ts/issues/28)); the workaround is to make the
  invocations use explicit program extensions like `gcc.cmd`.

## Maintainer & developer info

This page is addressed to those who plan to use the template directly.

For maintainer and developer info, please see the
[README-MAINTAINER](README-MAINTAINER.md) and
[README-DEVELOPER](README-DEVELOPER.md) pages.

## License

The original content is released under the
[MIT License](https://opensource.org/licenses/MIT), with all rights reserved to
[Liviu Ionescu](https://github.com/ilg-ul/).
