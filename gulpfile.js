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
 * @method npm run lint
 * @description Will lint the sources files and try to fix the style when possible
 */
gulp.task( 'lint', () => {

    // Todo: split between source and test with differents env
    const filesToLint = [
        'gulpfile.js',
        'sources/**/*.js'
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
        'sources/**/*.js'
    ]

    return gulp.src( filesToDocument, { read: false } )
               .pipe( jsdoc( config ) )

} )

/**
 * @method npm run unit
 * @description Will run unit tests using karma
 */
gulp.task( 'unit', ( done ) => {
    done()
} )

/**
 * @method npm run bench
 * @description Will run benchmarks using karma
 */
gulp.task( 'bench', ( done ) => {
    done()
} )

/**
 * @method npm run test
 * @description Will run unit tests and benchmarks using karma
 */
gulp.task( 'test', gulp.parallel( 'unit', 'bench' ) )

/**
 * @method npm run release
 * @description Will perform a complet release of the library.
 */
gulp.task( 'test', gulp.parallel( 'lint', 'doc', 'test' ) )

//---------

gulp.task( 'default', gulp.series( 'help' ) )
