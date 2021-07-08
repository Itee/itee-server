## [6.2.4](https://github.com/Itee/itee-server/compare/v6.2.3...v6.2.4) (2021-07-08)


### Bug Fixes

* **tbackendmanager:** fix parameter assignment in ctor ([de61172](https://github.com/Itee/itee-server/commit/de61172b2d87dacaecf887fa29c5856aa848e759))

## [6.2.3](https://github.com/Itee/itee-server/compare/v6.2.2...v6.2.3) (2021-07-08)


### Bug Fixes

* **tbackendmanager:** fix logger usage ([d9aacb3](https://github.com/Itee/itee-server/commit/d9aacb3df6cb3951c257c3674550bbc4725c9eab))

## [6.2.2](https://github.com/Itee/itee-server/compare/v6.2.1...v6.2.2) (2021-07-08)


### Bug Fixes

* **eslint:** remove console statement in favor of this.logger from itee core package ([3593054](https://github.com/Itee/itee-server/commit/3593054254b3b00ea98d17b9c8a76dacac5a68f3))
* **package:** apply dependencies fix ([03c7064](https://github.com/Itee/itee-server/commit/03c7064e266917f4d119a398c6f56d3169d4eeaf))
* **package:** apply fix from dependencies ([992e868](https://github.com/Itee/itee-server/commit/992e8684028521d256dd30d92af730c7ce0e95d8))
* **package:** apply npm audit fix ([2b28842](https://github.com/Itee/itee-server/commit/2b28842a88d05ac334b0737735a654c24382c90b))
* **package:** update all dependencies to their latest version ([49162e4](https://github.com/Itee/itee-server/commit/49162e4c4e1b6bc895946cf3dfc05eeb2edf71eb))
* **releaserc:** fix missing dev maps ([26fbe2d](https://github.com/Itee/itee-server/commit/26fbe2d7bb22a2da13a49019c61783939ce7c17c))
* **tbackendmanager:** fix bad server shutdown when connection are open, and add setter/getter ([20c8f1d](https://github.com/Itee/itee-server/commit/20c8f1dd694f5106cfca1926de85b88f44c5de73))

## [6.2.1](https://github.com/Itee/itee-server/compare/v6.2.0...v6.2.1) (2020-02-18)


### Bug Fixes

* **tbackendmanager:** fix database package assignment ([cf4c973](https://github.com/Itee/itee-server/commit/cf4c9738e0df59fb17dab6bad8692493bb39d5dc))

# [6.2.0](https://github.com/Itee/itee-server/compare/v6.1.1...v6.2.0) (2020-02-18)


### Bug Fixes

* **package:** move itee packages as peer dependencies ([c88f92d](https://github.com/Itee/itee-server/commit/c88f92db53e514cf26af5a178502061eb67f4818))
* **tbackendmanager:** add missing import isDefined ([986b96a](https://github.com/Itee/itee-server/commit/986b96a0509d8c1f21f0849487aee9088f082640))
* **tbackendmanager:** comment itee-database mapping waiting new release ([7ddbfb6](https://github.com/Itee/itee-server/commit/7ddbfb6681beae909c4977e7bfc7231132b2b323))


### Features

* **tbackendmanager:** allow user to specify the database package to use ([0c3de43](https://github.com/Itee/itee-server/commit/0c3de437da84ab10928014adb6d7e400c73bf6c6))

## [6.1.1](https://github.com/Itee/itee-server/compare/v6.1.0...v6.1.1) (2020-02-17)


### Bug Fixes

* **package:** update package lock ([178957d](https://github.com/Itee/itee-server/commit/178957da1d12a130b68501252426e1bfc1273cb5)), closes [#2](https://github.com/Itee/itee-server/issues/2)
* **package:** update package lock ([246bec6](https://github.com/Itee/itee-server/commit/246bec6b9d70fe526f4d86fb4460e5c93f20d43d)), closes [#7](https://github.com/Itee/itee-server/issues/7)

# [6.1.0](https://github.com/Itee/itee-server/compare/v6.0.0...v6.1.0) (2019-08-12)


### Bug Fixes

* **tbackendmanager:** fix router initialisation ([2fae240](https://github.com/Itee/itee-server/commit/2fae240))
* **tbackendmanager:** fix stop method crash in case no callback was provide ([cac1489](https://github.com/Itee/itee-server/commit/cac1489))


### Features

* **docs:** add documentation to github ([2619908](https://github.com/Itee/itee-server/commit/2619908))
* **tbackendmanager:** allow to load middlesware from package and/or local folder, like routers ([e813ab4](https://github.com/Itee/itee-server/commit/e813ab4))

# [6.0.0](https://github.com/Itee/itee-server/compare/v5.5.4...v6.0.0) (2019-08-05)


### Bug Fixes

* **gulpfile:** fix default name of package to use in banner ([67b76eb](https://github.com/Itee/itee-server/commit/67b76eb))
* **package:** fix main and module keys to target builds and add postversion script ([62990b6](https://github.com/Itee/itee-server/commit/62990b6))
* **rollupbenchconfig:** fix files to use under benchs tests ([d6dd453](https://github.com/Itee/itee-server/commit/d6dd453))
* **tserver:** remove duplicate applications declaration and remove/add some express config ([05dea56](https://github.com/Itee/itee-server/commit/05dea56))
* **tserver:** update error message, and remove bad conditional check in initRouters ([734127c](https://github.com/Itee/itee-server/commit/734127c))


### Build System

* **gulpfile:** remove iife and umd support ([e73ea2e](https://github.com/Itee/itee-server/commit/e73ea2e))


### Code Refactoring

* **tbackendmanager:** rename tserver into tbackendmanager ([d67c08f](https://github.com/Itee/itee-server/commit/d67c08f))
* **tserver:** update the router usage and declaration ([2420565](https://github.com/Itee/itee-server/commit/2420565))


### Features

* **tserver:** allow to load local middleware for application, and refactor in smarter way ([0c047e2](https://github.com/Itee/itee-server/commit/0c047e2))
* **tserver:** allow to start multiple servers. use map to cache them. refactor the start message ([c4f0eda](https://github.com/Itee/itee-server/commit/c4f0eda))


### BREAKING CHANGES

* **tbackendmanager:** rename tserver to tbackendmanager
* **tserver:** the routers declaration change, and related configuration is now under application
* **gulpfile:** remove iife and umd bundles
