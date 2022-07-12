# platform-qemu-aarch64

Support files for building application to run on the QEMU "virt"
emulated board with "cortex-a72" CPU.

## Include folders

The following folders should be passed to the compiler during the build:

- `include-config`
- `include-platform`

The header files to be included in user projects are:

```c++
#include <micro-os-plus/config.h>
#include <micro-os-plus/platform.h>
```

## Source files

The source files to be added to user projects are:

- none

## Memory range

The applications are built for the following memory range:

- RAM: 0x4000_0000-0x43FF_FFFF (64 MB)
- HEAP: 0x4400_0000-0x47FF_FFFF (64 MB)
- stack: 0x4800_0000

The heap and stack are set automatically in `_startup()` to the values
returned by `SEMIHOSTING_SYS_HEAPINFO`.

## Advanced SIMD & FP

By default, in certain cases (like variable arguments functions),
when generating code for `-mcpu=cortex-a72`, GCC uses quad registers
from the Advanced SIMD & FP unit, which is not enabled by default
in QEMU, and requires explicit code in the reset handler, before
calling the `_start()` function.

## QEMU invocation

To run tests, pass the ELF file and the arguments:

```sh
qemu-system-aarch64 --machine virt --cpu cortex-a72 --nographic -smp 1 -d unimp,guest_errors --kernel "unit-test.elf" --semihosting-config enable=on,target=native,arg=unit-test
```

For debug sessions start QEMU in GDB server mode by passing both `-s -S`:

```sh
qemu-system-aarch64 --machine virt --cpu cortex-a72 --nographic -smp 1 -d unimp,guest_errors -s -S --semihosting-config enable=on,target=native,arg=test
```

## Links

- [QEMU Arm](https://www.qemu.org/docs/master/system/target-arm.html)
- [virt](https://www.qemu.org/docs/master/system/arm/virt.html)
