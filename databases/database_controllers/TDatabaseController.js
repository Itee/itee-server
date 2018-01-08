/**
 * @author [Tristan Valcke]{@link https://github.com/Itee}
 * @license [BSD-3-Clause]{@link https://opensource.org/licenses/BSD-3-Clause}
 *
 * @class TDatabaseController
 * @classdesc The TDatabaseController is the base class to perform CRUD operations on the database
 */

const i = require( 'i-return' )

/**
 * @constructor
 */
function DatabaseController ( databaseSchema ) {

    if ( !databaseSchema ) { throw new Error( 'DatabaseController: Database schema cannot be null or undefined !' ) }

    this._databaseSchema = databaseSchema

}

// Static
Object.assign( DatabaseController, {

    /**
     * Check if requested params named 'dataName' exist in request.body, request.params or request.query
     *
     * @param dataName - The property name to looking for
     * @param request - The server request
     * @param response - The server response
     * @returns {*} - Return the property or return error to the end user if the property doesn't exist
     * @private
     */
    __checkData: function ( dataName, request, response ) {

        if ( !request.body && !request.params && !request.query ) {

            i.returnError( {
                title:   'Erreur de paramètre',
                message: 'Aucun paramètre n\'a été reçu !'
            }, response )

        }

        if ( request.body[ dataName ] ) {

            return request.body[ dataName ]

        } else if ( request.params[ dataName ] ) {

            return request.params[ dataName ]

        } else if ( request.query[ dataName ] ) {

            return request.query[ dataName ]

        } else {

            i.returnError( {
                title:   'Erreur de paramètre',
                message: dataName + " n'existe pas dans les paramètres !"
            }, response )

        }
    },

    /**
     * Check if the property 'idName' exist in request.params properties,
     * return the property if exist, else return an error to end user.
     *
     * @param idName - The id property to looking for
     * @param request - The server request
     * @param response - The server response
     * @returns {*} - Return the id property or return error to the end user if the property doesn't exist
     * @private
     */
    __checkIdParam: function ( idName, request, response ) {

        if ( !request.params ) {

            i.returnError( {
                title:   'Erreur de paramètre',
                message: 'Aucun paramètre n\'a été reçu !'
            }, response )

        }

        if ( !request.params[ idName ] ) {

            i.returnError( {
                title:   'Erreur de paramètre',
                message: 'L\'id  est null !'
            }, response )

        }

        return request.params[ idName ]

    },

    /**
     * Check if the property 'idName' exist in request.body properties,
     * return the property if exist, else return an error to end user.
     *
     * @param idName - The id property to looking for
     * @param request - The server request
     * @param response - The server response
     * @returns {*} - Return the id property or return error to the end user if the property doesn't exist
     * @private
     */
    __checkBodyData: function ( idName, request, response ) {

        if ( !request.body ) {
            i.returnError( {
                title:   'Erreur de paramètre',
                message: 'Aucun paramètre n\'a été reçu !'
            }, response )
        }

        if ( !request.body[ idName ] ) {
            i.returnError( {
                title:   'Erreur de paramètre',
                message: 'L\'id  est null !'
            }, response )
        }

        return request.body[ idName ]
        //        return JSON.parse( request.body[ idName ] )

    },

    /**
     * Returns a random integer between min (inclusive) and max (inclusive)
     * Using Math.round() will give you a non-uniform distribution!
     *
     * @param min - The minimum (inclusive) range value for random number
     * @param max - The maximum (inclusive) range value for random number
     * @returns {Number} - A random number between man and max
     * @private
     */
    _getRandomInt: function ( min, max ) {
        return Math.floor( Math.random() * (max - min + 1) ) + min
    }

} )

// Public
Object.assign( DatabaseController.prototype, {

    create ( request, response ) {

        const requestBody = request.body
        if ( !requestBody ) {

            i.returnError( {
                title:   'Erreur de paramètre',
                message: 'Aucun paramètre n\'a été reçu !'
            }, response )
            return

        }

        this._databaseSchema.create( requestBody, i.return( response ) )

    },

    read ( request, response ) {

        const requestBody = request.body
        const idParam     = request.params[ 'id' ]

        if ( Array.isArray( requestBody ) ) {

            if ( requestBody.length === 0 ) {

                i.returnError( {
                    title:   'Erreur de paramètre',
                    message: 'La requête ne contient pas de données !'
                }, response )
                return

            }

            //todo: check array of string id or object
            this._databaseSchema
                .find( { '_id': { $in: requestBody } } )
                .lean()
                .exec( i.return( response ) )

        } else if ( idParam ) {

            this._databaseSchema
                .find( { '_id': idParam } )
                //                .find( { '_id': { $in: idParam } } )
                .lean()
                .exec( i.return( response ) )

        } else {

            this._databaseSchema
                .find( i.return( response ) )

        }

    },

    update ( request, response ) {

        const requestBody = request.body
        const idParam     = request.params[ 'id' ]

        if ( Array.isArray( requestBody ) ) {

            if ( requestBody.length === 0 ) {

                i.returnError( {
                    title:   'Erreur de paramètre',
                    message: 'La requête ne contient pas de données !'
                }, response )
                return

            }

            //todo: check array of string id or object
            let errors         = []
            let results        = []
            let data           = undefined
            let id             = undefined
            let numberOfUpdate = 0
            for ( let dataIndex = 0, numberOfDatas = requestBody.length ; dataIndex < numberOfDatas ; dataIndex++ ) {

                data = requestBody[ dataIndex ]
                id   = data[ '_id' ]
                delete data[ '_id' ]

                this._databaseSchema.update( { _id: id }, { $set: data }, function ( error, result ) {

                    if ( error ) { errors.push( error ) }
                    if ( result ) {results.push( result )}
                    numberOfUpdate++

                    if ( numberOfUpdate === numberOfDatas ) {

                        if ( results.length > 0 && errors.length > 0 ) {

                            i.returnErrorAndData( errors, results, response )

                        } else if ( results.length > 0 && errors.length === 0 ) {

                            i.returnData( results, response )

                        } else if ( results.length === 0 && errors.length > 0 ) {

                            i.returnError( errors, response )

                        } else {

                            i.returnNotFound( response )

                        }

                    }

                } )
            }

        } else if ( idParam ) {

            this._databaseSchema.update( { _id: idParam }, { $set: requestBody }, i.return( response ) )

        } else {

            // Not allowed !

        }

    },

    delete ( request, response ) {

        const requestBody = request.body
        const idParam     = request.params[ 'id' ]

        if ( Array.isArray( requestBody ) ) {

            if ( requestBody.length === 0 ) {

                i.returnError( {
                    title:   'Erreur de paramètre',
                    message: 'La requête ne contient pas de données !'
                }, response )
                return

            }

            //todo: check array of string id or object
            this._databaseSchema.deleteMany( { '_id': { $in: requestBody } }, i.return( response ) )

        } else if ( idParam ) {

            this._databaseSchema.remove( { '_id': idParam }, i.return( response ) )

        } else {

            // Not allowed !

        }

    },

} )

module.exports = DatabaseController
