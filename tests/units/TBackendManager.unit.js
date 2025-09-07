import { expect }       from 'chai'
import { beforeEach, afterEach, describe, it } from 'mocha'
import { Testing }      from 'itee-utils'
import * as TBackendManagerNamespace from '../../sources/TBackendManager.js'

function TBackendManagerUnits () {

	beforeEach( () => {

		this._dataMap = Testing.createDataMap()

	} )

	afterEach( () => {

		delete this._dataMap

	} )

	describe( 'TBackendManagerUnits', () => {

	} )

}

export { TBackendManagerUnits }

