/**
 * @author [Tristan Valcke]{@link https://github.com/Itee}
 * @license [BSD-3-Clause]{@link https://opensource.org/licenses/BSD-3-Clause}
 *
 * @module gulpfile
 *
 * @description The gulp tasks file. It allow to run some tasks from command line interface.<br>
 * The available tasks are:
 * <ul>
 * <li>help</li>
 * <li>clean</li>
 * <li>lint</li>
 * <li>doc</li>
 * <li>test</li>
 * <li>build</li>
 * <li>release</li>
 * </ul>
 * You could find a complet explanation about these tasks using: <b>npm run help</b>.
 *
 * @requires {@link module: [gulp]{@link https://github.com/gulpjs/gulp}}
 * @requires {@link module: [gulp-util]{@link https://github.com/gulpjs/gulp-util}}
 * @requires {@link module: [gulp-jsdoc3]{@link https://github.com/mlucool/gulp-jsdoc3}}
 * @requires {@link module: [gulp-eslint]{@link https://github.com/adametry/gulp-eslint}}
 * @requires {@link module: [del]{@link https://github.com/sindresorhus/del}}
 * @requires {@link module: [run-sequence]{@link https://github.com/OverZealous/run-sequence}}
 * @requires {@link module: [rollup]{@link https://github.com/rollup/rollup}}
 */

/* eslint-env node */

const gulp        = require( 'gulp' )
const util        = require( 'gulp-util' )
const jsdoc       = require( 'gulp-jsdoc3' )
const eslint      = require( 'gulp-eslint' )
const gulpif      = require( 'gulp-if' )
const less        = require( 'gulp-less' )
const cleanCss    = require( 'gulp-clean-css' )
const rename      = require( 'gulp-rename' )
const nodemon     = require( 'gulp-nodemon' )
const liveReload  = require( 'gulp-livereload' )
const del         = require( 'del' )
const runSequence = require( 'run-sequence' )
const rollup      = require( 'rollup' )

const log     = util.log
const colors  = util.colors
const red     = colors.red
const green   = colors.green
const blue    = colors.blue
const cyan    = colors.cyan
const yellow  = colors.yellow
const magenta = colors.magenta

/**
 * @method npm run help ( default )
 * @description Will display the help in console
 */
gulp.task( 'default', [ 'help' ] )
gulp.task( 'help', ( done ) => {

    log( '====================================================' )
    log( '|                                                  |' )
    log( '|                Itee Client - HELP                |' )
    log( '|                                                  |' )
    log( '====================================================' )
    log( '' )
    log( 'Available commands are:' )
    log( blue( 'npm run' ), cyan( 'help' ), ' - Display this help.' )
    log( blue( 'npm run' ), cyan( 'patch' ), ' - Will patch three package to fix some invalid state.', red( '( Must be run only once after installing three package !!! )' ) )
    log( blue( 'npm run' ), cyan( 'clean' ), ' - Will delete builds and temporary folders.' )
    log( blue( 'npm run' ), cyan( 'lint' ), ' - Will run the eslint in pedantic mode with auto fix when possible.' )
    log( blue( 'npm run' ), cyan( 'doc' ), ' - Will run jsdoc, and create documentation under `documentation` folder, using the docdash theme' )
    log( blue( 'npm run' ), cyan( 'test' ), ' - Will run the test framworks (unit and bench), and create reports under `test/report` folder, using the mochawesome theme' )
    log( blue( 'npm run' ), cyan( 'unit' ), ' - Will run the karma server for unit tests.', red( '( /!\\ Deprecated: will be remove as soon as test script is fixed !!! )' ) )
    log( blue( 'npm run' ), cyan( 'bench' ), ' - Will run the karma server for benchmarks.', red( '( /!\\ Deprecated: will be remove as soon as test script is fixed !!! )' ) )
    log( blue( 'npm run' ), cyan( 'build' ), yellow( '--' ), green( '<options>' ), ' - Will build the application for development and/or production environments.', yellow( 'Note: The two dash are only required if you provide options !' ) )
    log( '  The available options are:' )
    log( '      ', green( '-d' ), 'or', green( '--dev' ), ' - to build in development environment' )
    log( '      ', green( '-p' ), 'or', green( '--prod' ), ' - to build in production environment' )
    log( '       (in case no environment is provide both will be compile)' )
    log( '' )
    log( '      ', green( '-f:' ), magenta( '<format>' ), 'or', green( '--format:' ), magenta( '<format>' ), ' - to specify the output build type.' )
    log( '       where format could be any of:', magenta( 'amd' ), magenta( 'cjs' ), magenta( 'es' ), magenta( 'iife' ), magenta( 'umd' ) )
    log( '' )
    log( '      ', green( '-s' ), 'or', green( '--sourcemap' ), ' - to build with related source map' )
    log( '' )
    log( blue( 'npm run' ), cyan( 'release' ), ' - Will run all the lint, test stuff, and if succeed will build the application in both environments.' )
    log( '' )
    log( 'In case you have', blue( 'gulp' ), 'installed globally, you could use also:' )
    log( blue( 'gulp' ), cyan( 'command' ), ' - It will perform the command like using "npm run" but with less characters to type... Because you\'re a developer, right ?' )

    done()

} )

/**
 * @method npm run clean
 * @description Will delete builds and temporary folders
 */
gulp.task( 'clean', () => {

    return del( [
        '../builds'
    ] )

} )

/**
 * @method npm run lint
 * @description Will lint the sources files and try to fix the style when possible
 */
gulp.task( 'lint', () => {

    // Todo: split between source and test with differents env
    const filesToLint = [
        'gulpfile.js',
        'run.js',
        'configs/**/*.js',
        'scripts/**/*.js',
        'sources/**/*',
        'tests/**/*.js',
        'application/**/*',
        'database/**/*',
        'modules/**/*',
        'routes/**/*',
        'server/**/*',
        'assets/javascript/**/*'
    ]

    return gulp.src( filesToLint )
               .pipe( eslint( {
                   allowInlineConfig: true,
                   globals:           [],
                   fix:               true,
                   quiet:             false,
                   envs:              [],
                   configFile:        './configs/eslint.conf.js',
                   parser:            'babel-eslint',
                   parserOptions:     {
                       ecmaFeatures: {
                           jsx: true
                       }
                   },
                   plugins:           [],
                   rules:             {},
                   useEslintrc:       false
               } ) )
               .pipe( eslint.format( 'stylish' ) )
               .pipe( eslint.failAfterError() )

} )

/**
 * @method npm run doc
 * @description Will generate this documentation
 */
gulp.task( 'doc', () => {

    const config = require( './configs/jsdoc.conf' )

    const filesToDocument = [
        'README.md',
        'gulpfile.js',
        'run.js',
        '_config.js',
        'application/*',
        'database/*',
        'modules/*',
        'routes/*',
        'server/*'
    ]

    return gulp.src( filesToDocument, { read: false } )
               .pipe( jsdoc( config ) )

} )

/**
 * @method npm run test
 * @description Will run unit tests and benchmarks using karma
 */
gulp.task( 'test', ( done ) => {

    runSequence(
        'unit',
        'bench',
        done
    )

} )

/**
 * @method npm run unit
 * @description Will run unit tests using karma
 */
gulp.task( 'unit', () => {

} )

/**
 * @method npm run bench
 * @description Will run benchmarks using karma
 */
gulp.task( 'bench', () => {

} )

/**
 *
 * @description Build less files from assets, and concat them into one file
 */
gulp.task( 'build-style', () => {

    log( 'Building:', blue( (util.env.production) ? 'style.min.css' : 'style.css' ), '...' )

    const styleFiles = [
        './assets/node_modules/font-awesome/less/font-awesome.less',
        './assets/node_modules/bootstrap/less/bootstrap.less',
        './assets/node_modules/bootstrap-slider/dist/css/bootstrap-slider.css',
        './assets/less/**/*'
    ]

    return gulp.src( styleFiles )
               .pipe( gulpif( /[.]less$/, less() ) )
               .pipe( concat( 'style.css' ) )
               .pipe( gulpif( util.env.production, rename( 'style.min.css' ), util.noop() ) )
               .pipe( gulpif( util.env.production, cleanCss( { compatibility: 'ie8' } ), util.noop() ) )
               .pipe( gulp.dest( './resources/css/' ) )

} )

/**
 * Add watcher to assets less/css files and run build-style on file change
 */
gulp.task( 'watch-style', [ 'build-style' ], done => {

    log( 'Add watcher to style files !' )

    gulp.watch( styleFiles, [ 'build-style' ] )
    done()

} )

/**
 * @method npm run build
 * @description Will build itee client module using optional arguments, running clean and _extendThree tasks before. See help to further informations.
 */
gulp.task( 'build-scripts', ( done ) => {

    const options = processArguments( process.argv )
    const configs = createBuildsConfigs( options )

    nextBuild()

    function processArguments ( processArgv ) {
        'use strict'

        let defaultOptions = {
            environments: [ 'development', 'production' ],
            formats:      [ 'amd', 'cjs', 'es', 'iife', 'umd' ],
            sourceMap:    false
        }

        const argv = processArgv.slice( 3 ) // Ignore nodejs, script paths and gulp params
        argv.forEach( argument => {

            if ( argument.indexOf( '-f' ) > -1 || argument.indexOf( '--format' ) > -1 ) {

                const splits    = argument.split( ':' )
                const splitPart = splits[ 1 ]

                defaultOptions.formats = []
                defaultOptions.formats.push( splitPart )

            } else if ( argument.indexOf( '-d' ) > -1 || argument.indexOf( '--dev' ) > -1 ) {

                defaultOptions.environments = []
                defaultOptions.environments.push( 'development' )

            } else if ( argument.indexOf( '-p' ) > -1 || argument.indexOf( '--prod' ) > -1 ) {

                defaultOptions.environments = []
                defaultOptions.environments.push( 'production' )

            } else if ( argument.indexOf( '-s' ) > -1 || argument.indexOf( '--sourcemap' ) > -1 ) {

                defaultOptions.sourceMap = true

            } else {

                throw new Error( `Build Script: invalid argument ${argument}. Type \`npm run help build\` to display available argument.` )

            }

        } )

        return defaultOptions

    }

    function createBuildsConfigs ( options ) {
        'use strict'

        let configs = []

        for ( let formatIndex = 0, numberOfFormats = options.formats.length ; formatIndex < numberOfFormats ; ++formatIndex ) {
            const format = options.formats[ formatIndex ]

            for ( let envIndex = 0, numberOfEnvs = options.environments.length ; envIndex < numberOfEnvs ; ++envIndex ) {
                const environment  = options.environments[ envIndex ]
                const onProduction = (environment === 'production')

                const config = require( './configs/rollup.conf' )( format, onProduction, options.sourceMap )

                configs.push( config )
            }
        }

        return configs

    }

    function nextBuild () {
        'use strict'

        if ( configs.length === 0 ) {
            done()
            return
        }

        build( configs.pop(), nextBuild )

    }

    function build ( config, done ) {

        log( `Building ${config.outputOptions.file}` )

        rollup.rollup( config.inputOptions )
              .then( ( bundle ) => {

                  bundle.write( config.outputOptions )
                        .catch( ( error ) => {
                            log( red( error ) )
                            done()
                        } )

                  done()
              } )
              .catch( ( error ) => {
                  log( red( error ) )
                  done()
              } )

    }

} )

/**
 * Build css and javascript files
 */
gulp.task( 'build', done => {

    log( 'Start build css and javascript...' )

    // Allow to build in an automatic way css and javascript files on change
    if ( util.env.auto ) {

        runSequence(
            'clean',
            'lint',
            [ 'watch-style', 'watch-scripts' ],
            done
        )

    } else if ( util.env.production ) {

        runSequence(
            'clean',
            'lint',
            [ 'build-style', 'build-scripts' ],
            'doc',
            done
        )

    } else {

        runSequence(
            'clean',
            [ 'build-style', 'build-scripts' ],
            done
        )

    }

} )

/**
 * Add watcher to assets javascript files and run build-js on file change
 */
gulp.task( 'watch-scripts', [ 'build-scripts' ], done => {

    log( 'Add watcher to javascript files !' )

    gulp.watch( './assets/javascript/**/*.js', [ 'build-js' ] )
    done()

} )

/**
 * @method npm run release
 * @description Will perform a complet release of the library.
 */
gulp.task( 'release', ( done ) => {

    runSequence(
        'clean',
        [
            'lint',
            'doc',
            'test'
        ],
        'build',
        done
    )

} )

//
// RUN SERVER
//

/**
 * Launch node deamon to auto-reload server on file change
 */
gulp.task( 'nodemon', done => {

    log( 'Start node server as daemon...' )

    nodemon( {
        script:  'run.js',
        verbose: true,
        ignore:  [
            // Folders
            '.git',
            '.idea',
            'assets',
            'docs',
            'downloads',
            'logs',
            'node_modules',
            'resources',
            'services',
            'tests',
            'views',

            // Files
            '.babelrc',
            '.eslintrc',
            '.gitignore',
            'install_win.cmd',
            'jsdoc.json',
            'karma.conf',
            'LICENSE.md',
            'package.json',
            'package-lock.json',
            'README.md'
        ],
        execMap: {
            "js": "node --max-old-space-size=16384"
        },
        env:     { 'NODE_ENV': (util.env.production) ? 'production' : 'development' }
    } )

    done()

} )

/**
 * Start sources auto building,
 * and node server refresh on file change
 */
gulp.task( 'build-n-run', done => {

    log( 'Running auto build and run nodemon...' )

    runSequence(
        'build',
        'nodemon',
        done
    )

} )

/**
 * Set a livereaload server for dev workflow
 * reload gulp and server on files change
 */
gulp.task( 'live-reload', [ 'build-n-run' ], done => {

    log( 'Run live-reload gulp with options :' )
    log( util.env )

    // Create LiveReload server
    liveReload.listen()

    // Watch this file, and reload gulp on change
    gulp.watch( [ './gulpfile.js' ] ).on( 'change', liveReload.changed )

    done()

} )
