/**
 * Created by tvalcke on 26/11/2015.
 */

module.exports = function( mongoose ) {

    var MemorySchema     = mongoose.model('Memory').schema,
        CpuSchema        = mongoose.model('Cpu').schema,
        GpuSchema        = mongoose.model('Gpu').schema,
        TaskSchema       = mongoose.model('Task').schema,
        CalculatorSchema = mongoose.Schema({
            state:            {
                type:    String,
                default: 'up',
                trim:    true,
                enum:    {
                    values:  'up down error'.split(' '),
                    message: 'Le calculateur ne peut pas avoir un état "{VALUE}". Les états valides sont: up, down, ou error'
                }
            },
            scheme: {
                type:     String,
                trim:     true,
                required: 'Le calculateur ne peut pas avoir un scheme "{VALUE}". Les états valides sont: shttp, http, ftp ou ssh',
                enum:     {
                    values:  'shttp http ftp ssh'.split(' '),
                    message: 'Le calculateur ne peut pas avoir un scheme "{VALUE}". Les états valides sont: shttp, http, ftp ou ssh'
                }
            },
            auth_data: {
                user_name: String,
                password:  String
            },
            hostname:  {
                type:     String,
                trim:     true,
                required: 'La valeur "{VALUE}" pour le champ "{PATH}" est invalide, merci de vous reporter à la RFC 1123 pour trouver un nom de domain correct !',
                validate: [
                    function( strHostname ) {
                        return /(^\s*((?=.{1,255}$)[0-9A-Za-z](?:(?:[0-9A-Za-z]|\b-){0,61}[0-9A-Za-z])?(?:\.[0-9A-Za-z](?:(?:[0-9A-Za-z]|\b-){0,61}[0-9A-Za-z])?)*\.?)\s*$)/.test(strHostname);
                    },
                    'La valeur "{VALUE}" pour le champ "{PATH}" est invalide, merci de vous reporter à la RFC 1123 pour trouver un nom de domain correct !'
                ]
            },
            ipv4:      {
                type:     String,
                trim:     true,
                required: 'La valeur "{VALUE}" pour le champ "{PATH}" est invalide !',
                validate: [
                    function( strIpv4 ) {
                        return /(^\s*((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?))\s*$)/.test(strIpv4);
                    },
                    'La valeur "{VALUE}" pour le champ "{PATH}" est invalide !'
                ]
            },
            ipv6:      {
                type:     String,
                trim:     true,
                validate: [
                    function( strIpv6 ) {
                        return /(^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$)/.test(strIpv6);
                    },
                    'La valeur "{VALUE}" pour le champ "{PATH}" est invalide !'
                ]
            },
            mac_address: {
                type:     String,
                trim:     true,
                required: 'La valeur "{VALUE}" pour le champ "{PATH}" est invalide, elle doit correspondre au standard IEEE 802 !',
                validate: [
                    function( strMac ) {
                        return /(^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$)/.test(strMac);
                    },
                    'La valeur "{VALUE}" pour le champ "{PATH}" est invalide, elle doit correspondre au standard IEEE 802 !'
                ]
            },
            port:        {
                type:     Number,
                trim:     true,
                required: 'La valeur "{VALUE}" pour le champ "{PATH}" est invalide, il doit être superieur à 0 et inferieur à 65536 !',
                validate: [
                    function( numPort ) {
                        return (numPort > 0 && numPort < 65536 );
                    },
                    'La valeur "{VALUE}" pour le champ "{PATH}" est invalide, il doit être superieur à 0 et inferieur à 65536 !'
                ]
            },
            arch:        {
                type:    String,
                default: 'UnknownArch',
                trim:    true
            },
            uptime:      {
                type:     Number,
                default:  0,
                min:      0,
                validate: [
                    function( uptime ) {
                        return (uptime >= 0);
                    },
                    'La valeur "{VALUE}" pour le champ "{PATH}" est invalide, il doit être positif ou par défault égal à zéro !'
                ]
            },
            type:        {
                type:    String,
                default: 'UnknownType',
                trim:    true
            },
            platform:    {
                type:    String,
                default: 'UnknownPlatform',
                trim:    true
            },
            endianness:  {
                type:    String,
                default: 'UnknownEndianness',
                trim:    true
            },
            homedir:     {
                type:    String,
                default: 'UnknownHomeDir',
                trim:    true
            },
            tmpDir:      {
                type:    String,
                default: 'UnknownTmpDir',
                trim:    true
            },
            memory:      [ MemorySchema ],
            cpus:        [ CpuSchema ],
            gpus:        [ GpuSchema ],
            networkInterface: {
                type:    Object,
                default: {}
            },
            tasks:            [ TaskSchema ],
            calculator_errors: [
                {
                    title:   String,
                    message: String
                }
            ]
        });
    
    mongoose.model('Calculator', CalculatorSchema);

    return mongoose;

};
