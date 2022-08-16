# Change & release log

Releases in reverse chronological order.

Please check
[GitHub](https://github.com/micro-os-plus/hello-world-qemu-template-xpack/issues/)
and close existing issues and pull requests.

## 2022-08-16

* v1.4.0

## 2022-08-15

* d9b09fd package.json: bump xpm
* 031198a package-liquid.json: bump xpm to 0.14.0

## 2022-08-07

* 5f2757a CI.yml: try node 14
* bb9c76d template.js: add links to deps
* 2cc1169 .vscode/settings.json: npm/exclude xpacks

## 2022-08-04

* v1.3.0
* b9ca0b7 .vscode/settings.json: npm.exclude build
* 419cd20 bump semihosting

## 2022-08-03

* v1.2.0
* 9b410b5 #1: shorten build path on Windows
* d2dfa27 meson: cross.ini add link to cpu-families
* a03c854 meson: update riscv32/riscv64 cpu families

## 2022-08-01

* 821dc93 package-liquid.json: bump deps
* 8d711af main.h: include platform.h
* 4cddf32 package.json: add clean-build script
* eb9153c test.js: use build to run the tests

## 2022-07-31

* a8fe442 define.h: update guard macro
* 7f98c78 package-liquid.json: bump deps
* f855bf4 platform-*/READMEs updates
* 8f15902 config.h: TRACE_PRINTF_BUFFER_ARRAY_SIZE
* 1da2635 Copyright notices with full text

## 2022-07-28

* f3d2c39 bump deps
* 70aeb55 add develop cortexm/cortexa/riscv tests
* 4137aa3 assets/.vscode: ignoreCMakeListsMissing
* 5610d60 update all arm platforms to use local startup & semihosting
* e0386ec add support for risc-v 32/64
* 95d6279 CI.yml do not trigger on tags
* v1.1.0
* 2ce7a3c package-liquid.json: bump deps
* a5f93d0 disable -flto for cortex-a72
* f3d2c39 bump deps
* 70aeb55 add develop cortexm/cortexa/riscv tests
* 5610d60 update all arm platforms to use local startup & semihosting
* e0386ec add support for risc-v 32/64
* 95d6279 CI.yml do not trigger on tags

## 2022-07-25

* c0eb501 package.json minimumXpmRequired

## 2022-07-22

* c9804ec */config.h: MICRO_OS_PLUS_USE_SEMIHOSTING

## 2022-07-15

* v1.0.1
* 4beb97f rework README-liquid.md
* 52c98de template.js: add package & properties to liquidMap
* 9f71ce2 rework main-liquid.cpp
* 7702ea5 meson: DEVICE_QEMU_CORTEX_M7

## 2022-07-12

* v1.0.0

## 2022-07-03

* 5cc03c5 Initial commit
