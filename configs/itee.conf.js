/**
 * @author [Tristan Valcke]{@link https://github.com/Itee}
 * @license [BSD-3-Clause]{@link https://opensource.org/licenses/BSD-3-Clause}
 *
 * @module config/iteeConfiguration
 *
 * @description The configuration file of the itee server and client
 *
 */

/* eslint-env node */

const path = require('path')

function CreateIteeConfiguration( process ) {

    return {
        debug:       false,
        database:    {
            database_url:           'mongodb://127.0.0.1/sight',
            auto_reconnect_timeout: 10000,
        },
        application: {
            env:         (process.env.NODE_ENV) ? process.env.NODE_ENV : 'development', // env Environment mode, defaults to process.env.NODE_ENV or "development"
            development: {
                hostname:                (process.env.HOST) ? process.env.HOST : 'localhost',
                port:                    (process.env.PORT) ? process.env.PORT : '12345',
                trust_proxy:             false,                          // trust proxy Enables reverse proxy support, disabled by default
                case_sensitive_routing:  false,                          // case sensitive routing Enable case sensitivity, disabled by default, treating "/Foo" and "/foo" as the same
                strict_routing:          false,                          // strict routing Enable strict routing, by default "/foo" and "/foo/" are treated the same by the router
                view_cache:              false,                          // view cache Enables view template compilation caching, enabled in production by default
                view_engine:             'pug',
                views:                   path.join(__dirname, '..', 'views'),
                jsonp_callback_name:     'callbackJson',                 // jsonp callback name Changes the default callback name of ?callback=
                jsonp_replacer:          null,                           // json replacer JSON replacer callback, null by default
                jsonp_spaces:            '2',                            // json spaces JSON response spaces for formatting, defaults to 2 in development, 0 in production
                db_uri:                  'localhost/dev',
                path_to_log:             path.join(__dirname, '..', '/logs/access.log'),
                path_to_favicon:         path.join(__dirname, '..', '/resources/favicon.ico'),
                method_override_keyword: '_method'
            },
            production:  {
                hostname:                (process.env.HOST) ? process.env.HOST : '0.0.0.0',
                port:                    '80',
                trust_proxy:             false,                          // trust proxy Enables reverse proxy support, disabled by default
                case_sensitive_routing:  false,                          // case sensitive routing Enable case sensitivity, disabled by default, treating "/Foo" and "/foo" as the same
                strict_routing:          false,                          // strict routing Enable strict routing, by default "/foo" and "/foo/" are treated the same by the router
                view_cache:              false,                          // view cache Enables view template compilation caching, enabled in production by default
                view_engine:             'jade',
                views:                   path.join(__dirname, '..', 'views'),
                jsonp_callback_name:     'callbackJson',                 // jsonp callback name Changes the default callback name of ?callback=
                jsonp_replacer:          null,                           // json replacer JSON replacer callback, null by default
                jsonp_spaces:            '0',                            // json spaces JSON response spaces for formatting, defaults to 2 in development, 0 in production
                db_uri:                  '',
                path_to_log:             path.join(__dirname, '..', '/logs/access.log'),
                path_to_favicon:         path.join(__dirname, '..', '/resources/favicon.ico'),
                method_override_keyword: '_method'
            },
            bus_boy: {
                upload: true,
                allowedPath: /^\/uploads$/
            }
        },
        server:      {
            max_headers_count: 1100,
            timeout: 30000
        }
    };

}

module.exports = CreateIteeConfiguration
