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
