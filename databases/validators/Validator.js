/**
 * @author [Tristan Valcke]{@link https://github.com/Itee}
 * @license [BSD-3-Clause]{@link https://opensource.org/licenses/BSD-3-Clause}
 *
 * @file Todo
 *
 * @example Todo
 *
 */

function isNull ( data ) {
    return (data === null)
}

function isNotNull ( data ) {
    return !isNull( data )
}

function isString ( data ) {
    return (typeof data === 'string')
}

function isNotString ( data ) {
    return (typeof data !== 'string')
}

function isEmptyString ( data ) {

    return (
        (typeof data === 'string') &&
        (data.length === 0)
    )
}

function isBlankString ( data ) {
    return (
        (typeof data === 'string') &&
        (data.length > 0) &&
        (!/\S/.test( data ))
    )
}

function isFunction ( data ) {
    return data && {}.toString.call( data ) === '[object Function]'
}

function isObject ( data ) {
    return ( isNotNull( data ) && (typeof data === 'object') && !Array.isArray( data ) )
}

function isSchema ( data ) {
    return ( isFunction( data ) && data.name === 'Schema' )
}

function isMongoose ( data ) {
    return ( isObject( data ) && data.constructor.name === 'Mongoose' )
}

module.exports = {
    isNull,
    isNotNull,
    isString,
    isNotString,
    isEmptyString,
    isBlankString,
    isFunction,
    isObject,
    isSchema,
    isMongoose
}
