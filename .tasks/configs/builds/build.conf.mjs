import { createRollupConfigs } from '@itee/tasks/sources/utils/builds.mjs'

export default createRollupConfigs( {
    formats:     [ 'esm', 'cjs' ],
    externalMap: {
        'esm': [
            'fs',
            'express',
            'http',
            'https',
            'path',
            'itee-validators',
            'itee-core',
            'itee-database'
        ],
        'cjs': [
            'fs',
            'express',
            'http',
            'https',
            'path',
            'itee-validators',
            'itee-core',
            'itee-database'
        ],
    }
} )
