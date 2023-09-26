# Change & release log

Releases in reverse chronological order.

Please check
[GitHub](https://github.com/micro-os-plus/hello-world-qemu-template-xpack/issues/)
and close existing issues and pull requests.

## 2023-09-26

* 20dc22c ci.yml: update
* ed04109 assets: bump deps
* 0d2ba79 update for ESM
* 0eccc98 package.json: bump deps
* c667a88 package.json: update scripts
* 1a98885 package.json: engines.node >=16.14.0
* b69096d package.json: type: module

## 2023-07-14

* 973de5c README updates
* 4565feb template.js: cosmetise urls
* ccbcb49 assets: cosmetics
* 5c769ba package-liquid.json: cosmetise urls
* b9fe524 package.json: cosmetise urls
* f264b0d package.json: minXpm 0.16.2

## 2023-06-04

* 7f70579 package.json: bump xpm 0.16.1
* 5daa1a0 ci.yml: bump matrix.os, remove node 14
* 65dc52e update for xpacks/@scope/name
* 278c2e3 test.js: remove --quiet
* 0d25d8a remove --quiet

## 2023-06-03

* ee51e34 lower case ci.yml
* 45d1dcb package.json min 0.16.0
* 8d9f4e6 package.json min 0.16.0
* e782562 lower case ci.yml

## 2023-05-08

* 6d9d70a .npmignore update
* 4c29ab6 meson.build cosmetics

## 2022-08-16

* c64b790 package.json min 0.14.0 & defaults
* d96fab6 CHANGELOG update
* 74ba828 1.4.1
* ff0b606 prepare v1.4.1
* 55c80fd package-liquid.json: fix empty bundledDependencies
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
