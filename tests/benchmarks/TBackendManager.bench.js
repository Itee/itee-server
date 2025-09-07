
import Benchmark   from 'benchmark'
import { Testing } from 'itee-utils/sources/testings/benchmarks'
import * as TBackendManagerNamespace from '../../sources/TBackendManager.js'

const setApplicationsSuite = Benchmark.Suite( 'TBackendManagerNamespace.setApplications', Testing.createSuiteOptions() )
                                     .add( 'setApplications()', Testing.iterateOverDataMap( TBackendManagerNamespace.setApplications ), Testing.createBenchmarkOptions() )

const addMiddlewareSuite = Benchmark.Suite( 'TBackendManagerNamespace.addMiddleware', Testing.createSuiteOptions() )
                                     .add( 'addMiddleware()', Testing.iterateOverDataMap( TBackendManagerNamespace.addMiddleware ), Testing.createBenchmarkOptions() )

const setRouterSuite = Benchmark.Suite( 'TBackendManagerNamespace.setRouter', Testing.createSuiteOptions() )
                                     .add( 'setRouter()', Testing.iterateOverDataMap( TBackendManagerNamespace.setRouter ), Testing.createBenchmarkOptions() )

const setDatabasesSuite = Benchmark.Suite( 'TBackendManagerNamespace.setDatabases', Testing.createSuiteOptions() )
                                     .add( 'setDatabases()', Testing.iterateOverDataMap( TBackendManagerNamespace.setDatabases ), Testing.createBenchmarkOptions() )

const addDatabaseSuite = Benchmark.Suite( 'TBackendManagerNamespace.addDatabase', Testing.createSuiteOptions() )
                                     .add( 'addDatabase()', Testing.iterateOverDataMap( TBackendManagerNamespace.addDatabase ), Testing.createBenchmarkOptions() )

const setServersSuite = Benchmark.Suite( 'TBackendManagerNamespace.setServers', Testing.createSuiteOptions() )
                                     .add( 'setServers()', Testing.iterateOverDataMap( TBackendManagerNamespace.setServers ), Testing.createBenchmarkOptions() )

const setRootPathSuite = Benchmark.Suite( 'TBackendManagerNamespace.setRootPath', Testing.createSuiteOptions() )
                                     .add( 'setRootPath()', Testing.iterateOverDataMap( TBackendManagerNamespace.setRootPath ), Testing.createBenchmarkOptions() )

const Suite = Benchmark.Suite( 'TBackendManagerNamespace.', Testing.createSuiteOptions() )
                                     .add( '_initApplications()', Testing.iterateOverDataMap( TBackendManagerNamespace._initApplications ), Testing.createBenchmarkOptions() )
                                     .add( '_initMiddlewares()', Testing.iterateOverDataMap( TBackendManagerNamespace._initMiddlewares ), Testing.createBenchmarkOptions() )
                                     .add( '_initPackageMiddleware()', Testing.iterateOverDataMap( TBackendManagerNamespace._initPackageMiddleware ), Testing.createBenchmarkOptions() )
                                     .add( '_initLocalMiddleware()', Testing.iterateOverDataMap( TBackendManagerNamespace._initLocalMiddleware ), Testing.createBenchmarkOptions() )
                                     .add( '_initRouters()', Testing.iterateOverDataMap( TBackendManagerNamespace._initRouters ), Testing.createBenchmarkOptions() )
                                     .add( '_initPackageRouter()', Testing.iterateOverDataMap( TBackendManagerNamespace._initPackageRouter ), Testing.createBenchmarkOptions() )
                                     .add( '_initLocalRouter()', Testing.iterateOverDataMap( TBackendManagerNamespace._initLocalRouter ), Testing.createBenchmarkOptions() )
                                     .add( '_initDatabases()', Testing.iterateOverDataMap( TBackendManagerNamespace._initDatabases ), Testing.createBenchmarkOptions() )
                                     .add( '_initServers()', Testing.iterateOverDataMap( TBackendManagerNamespace._initServers ), Testing.createBenchmarkOptions() )

const databaseOnSuite = Benchmark.Suite( 'TBackendManagerNamespace.databaseOn', Testing.createSuiteOptions() )
                                     .add( 'databaseOn()', Testing.iterateOverDataMap( TBackendManagerNamespace.databaseOn ), Testing.createBenchmarkOptions() )

const serverOnSuite = Benchmark.Suite( 'TBackendManagerNamespace.serverOn', Testing.createSuiteOptions() )
                                     .add( 'serverOn()', Testing.iterateOverDataMap( TBackendManagerNamespace.serverOn ), Testing.createBenchmarkOptions() )

const serversOnSuite = Benchmark.Suite( 'TBackendManagerNamespace.serversOn', Testing.createSuiteOptions() )
                                     .add( 'serversOn()', Testing.iterateOverDataMap( TBackendManagerNamespace.serversOn ), Testing.createBenchmarkOptions() )

const startSuite = Benchmark.Suite( 'TBackendManagerNamespace.start', Testing.createSuiteOptions() )
                                     .add( 'start()', Testing.iterateOverDataMap( TBackendManagerNamespace.start ), Testing.createBenchmarkOptions() )

const stopSuite = Benchmark.Suite( 'TBackendManagerNamespace.stop', Testing.createSuiteOptions() )
                                     .add( 'stop()', Testing.iterateOverDataMap( TBackendManagerNamespace.stop ), Testing.createBenchmarkOptions() )

const allClosedSuite = Benchmark.Suite( 'TBackendManagerNamespace.allClosed', Testing.createSuiteOptions() )
                                     .add( 'allClosed()', Testing.iterateOverDataMap( TBackendManagerNamespace.allClosed ), Testing.createBenchmarkOptions() )

const closeServersSuite = Benchmark.Suite( 'TBackendManagerNamespace.closeServers', Testing.createSuiteOptions() )
                                     .add( 'closeServers()', Testing.iterateOverDataMap( TBackendManagerNamespace.closeServers ), Testing.createBenchmarkOptions() )

export { setApplicationsSuite,addMiddlewareSuite,setRouterSuite,setDatabasesSuite,addDatabaseSuite,setServersSuite,setRootPathSuite,Suite,databaseOnSuite,serverOnSuite,serversOnSuite,startSuite,stopSuite,allClosedSuite,closeServersSuite }

