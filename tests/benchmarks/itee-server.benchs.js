import {setApplicationsSuite, addMiddlewareSuite, setRouterSuite, setDatabasesSuite, addDatabaseSuite, setServersSuite, setRootPathSuite, Suite, databaseOnSuite, serverOnSuite, serversOnSuite, startSuite, stopSuite, allClosedSuite, closeServersSuite} from './TBackendManager.bench.js'

const suites = [
	setApplicationsSuite,
	addMiddlewareSuite,
	setRouterSuite,
	setDatabasesSuite,
	addDatabaseSuite,
	setServersSuite,
	setRootPathSuite,
	Suite,
	databaseOnSuite,
	serverOnSuite,
	serversOnSuite,
	startSuite,
	stopSuite,
	allClosedSuite,
	closeServersSuite
]

for ( const suite of suites ) {
	suite.run()
}
