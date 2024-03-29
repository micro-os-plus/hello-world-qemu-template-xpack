# platform-qemu-cortex-m0

Support files for building Cortex-M0 application to run on the
QEMU "mps2-an385" emulated board (which is a Cortex-M3 board).

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

- FLASH: 0x0000_0000-0x007F_FFFF (8 MB)
- RAM: 0x2000_0000-0x207F_FFFF (8 MB)
- HEAP: 0x2100_0000-0x21FF_FFFF (16 MB)
- stack: 0x2200_0000

The heap and stack are set automatically in `_startup()` to the values
returned by `SEMIHOSTING_SYS_HEAPINFO`.

## QEMU invocation

To run tests, pass the ELF file and the arguments:

```sh
qemu-system-arm --machine mps2-an365 --cpu cortex-m3 --nographic -d unimp,guest_errors --kernel "unit-test.elf" --semihosting-config enable=on,target=native,arg=unit-test
```

For debug sessions start QEMU in GDB server mode by passing both `-s -S`:

```sh
qemu-system-arm --machine mps2-an5365 --cpu cortex-m3 --nographic -d unimp,guest_errors -s -S --semihosting-config enable=on,target=native,arg=test
```

## Links

- [QEMU Arm](https://www.qemu.org/docs/master/system/target-arm.html)
- [virt](https://www.qemu.org/docs/master/system/arm/virt.html)
