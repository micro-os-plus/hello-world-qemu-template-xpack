# Hello World

This project provides a **functional starting point** for multi-platform
unit tests, running on QEMU via **semihosting**.

It also demonstrates the **convenient way of managing dependencies**
implemented by the
[xPack Reproducible Build Framework](https://xpack.github.io).

## `xpm init`

This project was created with the
[micro-os-plus/hello-world-qemu-template-xpack](https://github.com/micro-os-plus/hello-world-qemu-template-xpack)
project template, using the following command:

```sh
cd <project>
xpm init --template {{ package.name }}/{{ package.version }}{% for property in properties %} --property {{ property[0] }}={{ property[1]}}{% endfor %}
```

## `xpm install`

As usual with npm and xpm projects, to facilitate running the tests
on Continuous Integration environments there is a way to automate
installing the required tools, like build tools, defined as `devDependencies`.

This mechanism is also useful during normal development, so it is
recommended to use the existing binary xPacks as build tools, by
listing them in the `devDependencies`.

Even more, it is possible to define dependencies specific to
build configurations; this allows, for example, to run the builds
with different versions of the same toolchain.

The command can be invoked by running it in a terminal:

```sh
cd <project>
xpm install
```

## Build configurations

The project borrows the structure from **Eclipse CDT** projects,
which have two configurations, **Debug** and **Release**.

## Out of source tree builds

Having multiple build configurations, each with its own build folder,
the builds inherently cannot run in the source tree and require
separate build folders.

The two build folders are:

- `build/{{ platform }}-{{ buildGenerator }}-debug`
- `build/{{ platform }}-{{ buildGenerator }}-release`

## Project structure

The portable code is split into separate `src` and `include` folders.

The platform specific code is in the separate `platform-{{ platform }}` folder
and in the dependencies automatically linked below the `xpacks` folder.

## Actions

The project defines several actions for each build configuration:

- `prepare`: create the build folders
- `build`: update the build folders to cope with possible changes in
  the project structure, and run the actual build
- `clean`: remove all binary objects and temporary files; do not delete
  build folder
- `test`: run the application

There are also several top actions:

- `test-{{ platform }}-{{ buildGenerator }}-debug`
- `test-{{ platform }}-{{ buildGenerator }}-release`
- `clean-all`

The `test-*` definitions perform the prepare/build/execute actions,
and can be used to test the project in CI environments.

The full tests can be invoked with a simple command:

```sh
xpm run test-all
```

## Multi-platform support

By keeping the platform specific files in separate folders,
the project can be easily extended with support for additional platforms.

To achieve this:

- generate separate projects for each platform
- copy the `platform-*` folders into the project
- copy the build configurations from `package.json`

## IntelliSense

The project is **Visual Studio Code** friendly, and, when using the
**VS Code xPack Managed Build Tools** extension,
the `.vscode/c_cpp_properties.json` file is created and updated automatically.

The best way to configure IntelliSense is to use `compile_commands.json`
files in each build folder, since this fully automates the process.

An example of such a `c_cpp_properties.json` file is:

```json
{
  "configurations": [
    {
      "name": "{{ platform }}-{{ buildGenerator }}-debug",
      "compileCommands": "${workspaceFolder}/build/{{ platform }}-{{ buildGenerator }}-debug/compile_commands.json"
    },
    {
      "name": "{{ platform }}-{{ buildGenerator }}-release",
      "compileCommands": "${workspaceFolder}/build/{{ platform }}-{{ buildGenerator }}-release/compile_commands.json"
    }
  ],
  "version": 4
}
```

This file is automatically created and updated by the xPack extension, so
the user should not be very concerned with it.

However, only modern tools (like CMake and meson) can generate the
`compile_commands.json` files.

If the project uses other tools, the
`c_cpp_properties.json` file must be edited and specific details (like
the include folders and preprocessor definitions) must be provided
for each build configuration.

## License

The original content is released under the
[MIT License](https://opensource.org/licenses/MIT), with all rights reserved to
[Liviu Ionescu](https://github.com/ilg-ul/).
