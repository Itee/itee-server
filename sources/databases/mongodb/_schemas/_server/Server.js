/**
 * Created by tvalcke on 26/11/2015.
 */
const Memory = require( '../_computer/Memory' )
const Cpu    = require( '../_computer/Cpu' )
const Gpu    = require( '../_computer/Gpu' )

let _schema = undefined
let _model  = undefined

function getSchemaFrom ( Mongoose ) {
    'use strict'

    if ( !_schema ) {
        _createSchema( Mongoose )
    }

    return _schema

}

function _createSchema ( Mongoose ) {
    'use strict'

    const MemorySchema = Memory.getSchemaFrom( Mongoose )
    const CpuSchema    = Cpu.getSchemaFrom( Mongoose )
    const GpuSchema    = Gpu.getSchemaFrom( Mongoose )
    const Schema       = Mongoose.Schema
    const Types        = Schema.Types
    const ObjectId     = Types.ObjectId

    _schema = new Schema( {
        state:             {
            type:    String,
            default: 'up',
            trim:    true,
            enum:    {
                values:  'up down error'.split( ' ' ),
                message: 'Le calculateur ne peut pas avoir un état "{VALUE}". Les états valides sont: up, down, ou error'
            }
        },
        scheme:            {
            type:     String,
            trim:     true,
            required: 'Le calculateur ne peut pas avoir un scheme "{VALUE}". Les états valides sont: shttp, http, ftp ou ssh',
            enum:     {
                values:  'shttp http ftp ssh'.split( ' ' ),
                message: 'Le calculateur ne peut pas avoir un scheme "{VALUE}". Les états valides sont: shttp, http, ftp ou ssh'
            }
        },
        auth_data:         {
            user_name: String,
            password:  String
        },
        hostname:          {
            type:     String,
            trim:     true,
            required: 'La valeur "{VALUE}" pour le champ "{PATH}" est invalide, merci de vous reporter à la RFC 1123 pour trouver un nom de domain correct !',
            validate: [
                strHostname => /(^\s*((?=.{1,255}$)[0-9A-Za-z](?:(?:[0-9A-Za-z]|\b-){0,61}[0-9A-Za-z])?(?:\.[0-9A-Za-z](?:(?:[0-9A-Za-z]|\b-){0,61}[0-9A-Za-z])?)*\.?)\s*$)/.test( strHostname ),
                'La valeur "{VALUE}" pour le champ "{PATH}" est invalide, merci de vous reporter à la RFC 1123 pour trouver un nom de domain correct !'
            ]
        },
        ipv4:              {
            type:     String,
            trim:     true,
            required: 'La valeur "{VALUE}" pour le champ "{PATH}" est invalide !',
            validate: [
                strIpv4 => /(^\s*((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?))\s*$)/.test( strIpv4 ),
                'La valeur "{VALUE}" pour le champ "{PATH}" est invalide !'
            ]
        },
        ipv6:              {
            type:     String,
            trim:     true,
            validate: [
                strIpv6 => /(^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$)/.test( strIpv6 ),
                'La valeur "{VALUE}" pour le champ "{PATH}" est invalide !'
            ]
        },
        mac_address:       {
            type:     String,
            trim:     true,
            required: 'La valeur "{VALUE}" pour le champ "{PATH}" est invalide, elle doit correspondre au standard IEEE 802 !',
            validate: [
                strMac => /(^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$)/.test( strMac ),
                'La valeur "{VALUE}" pour le champ "{PATH}" est invalide, elle doit correspondre au standard IEEE 802 !'
            ]
        },
        port:              {
            type:     Number,
            trim:     true,
            required: 'La valeur "{VALUE}" pour le champ "{PATH}" est invalide, il doit être superieur à 0 et inferieur à 65536 !',
            validate: [
                numPort => (numPort > 0 && numPort < 65536 ),
                'La valeur "{VALUE}" pour le champ "{PATH}" est invalide, il doit être superieur à 0 et inferieur à 65536 !'
            ]
        },
        arch:              {
            type:    String,
            default: 'UnknownArch',
            trim:    true
        },
        uptime:            {
            type:     Number,
            default:  0,
            min:      0,
            validate: [
                uptime => (uptime >= 0),
                'La valeur "{VALUE}" pour le champ "{PATH}" est invalide, il doit être positif ou par défault égal à zéro !'
            ]
        },
        type:              {
            type:    String,
            default: 'UnknownType',
            trim:    true
        },
        platform:          {
            type:    String,
            default: 'UnknownPlatform',
            trim:    true
        },
        endianness:        {
            type:    String,
            default: 'UnknownEndianness',
            trim:    true
        },
        homedir:           {
            type:    String,
            default: 'UnknownHomeDir',
            trim:    true
        },
        tmpDir:            {
            type:    String,
            default: 'UnknownTmpDir',
            trim:    true
        },
        memory:            [ MemorySchema ],
        cpus:              [ CpuSchema ],
        gpus:              [ GpuSchema ],
        networkInterface:  {
            type:    Object,
            default: {}
        },
        tasks:             [ ObjectId ],
        calculator_errors: [
            {
                title:   String,
                message: String
            }
        ]
    } )

}

function getModelFrom ( Mongoose ) {
    'use strict'

    if ( !_model ) {
        _createModel( Mongoose )
    }

    return _model

}

function _createModel ( Mongoose ) {
    'use strict'

    _model = Mongoose.model( 'Server', getSchemaFrom( Mongoose ) )

}

function registerModelTo ( Mongoose ) {

    if ( !_model ) {
        _createModel( Mongoose )
    }

    return Mongoose

}

module.exports = {
    getSchemaFrom:   getSchemaFrom,
    getModelFrom:    getModelFrom,
    registerModelTo: registerModelTo
}
