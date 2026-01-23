import { createRollupConfigs } from '@itee/tasks/sources/utils/builds.mjs'

export default createRollupConfigs( {
    formats:     [ 'esm', 'cjs' ],
    externalMap: {
        'esm': [
            'node:fs',
            'node:http',
            'node:https',
            'node:path',
            'express',
            'itee-validators',
            'itee-core',
            'itee-database'
        ],
        'cjs': [
            'node:fs',
            'node:http',
            'node:https',
            'node:path',
            'express',
            'itee-validators',
            'itee-core',
            'itee-database'
        ],
    }
} )
