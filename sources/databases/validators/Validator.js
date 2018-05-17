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
    return (data !== null)
}

function isUndefined ( data ) {
    return (data === undefined)
}

function isNotUndefined ( data ) {
    return (data !== undefined)
}

function isNullOrUndefined ( data ) {
    return (isNull( data ) || isUndefined( data ))
}

function isNumber ( value ) {
    return !isNaN( parseFloat( value ) ) && Number.isFinite( value )
}

function isNotNumber ( value ) {
    return isNaN( parseFloat( value ) ) || !Number.isFinite( value )
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

function isArray( data ) {
    return Array.isArray( data )
}

function isNotArray( data ) {
    return !Array.isArray( data )
}

function isObject ( data ) {
    return ( isNotNull( data ) && (typeof data === 'object') && isNotArray( data ) )
}

function isNotObject ( data ) {
    return ( isNullOrUndefined( data ) || (typeof data !== 'object') || isArray( data ) )
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
    isUndefined,
    isNotUndefined,
    isNullOrUndefined,
    isNumber,
    isNotNumber,
    isString,
    isNotString,
    isEmptyString,
    isBlankString,
    isFunction,
    isArray,
    isNotArray,
    isObject,
    isNotObject,
    isSchema,
    isMongoose
}
