import { describe }      from 'mocha'
import { TBackendManagerUnits }   from './TBackendManager.unit.js'

const root = typeof window === 'undefined'
    ? typeof global === 'undefined'
        ? Function( 'return this' )() 
        : global 
    : window

describe( 'Itee#Validators', () => {

    TBackendManagerUnits.call( root )

} )
