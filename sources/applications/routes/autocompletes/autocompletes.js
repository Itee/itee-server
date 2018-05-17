/**
 * Created by tvalcke on 11/06/2015.
 * This module allow to hold on /autocomplete route.
 */
var express  = require('../../node_modules/express'),
    router   = express.Router(),
    fs       = require('fs'),
    basePath = 'C:/Users/tvalcke/Programmations/MyPerazio';
/**
 * Hold /autocomplete route as '/',
 * and under children the same philosophies.
 */
router.route('/')
    .get(function( request, response, next ) {

        var query = request.query.q;

        fs.readFile(basePath + '/resources/json/city.list.json', 'utf8', function( err, data ) {
            if ( err ) {
                return console.log(err);
            }

            var wrappedResult = [],
                jsonDocument  = JSON.parse(data);
            for ( var i = 0, arrayLength = jsonDocument.length ; i < arrayLength ; i++ ) {

                var element = jsonDocument[ i ];
                if ( element.name && element._id && element.name.toLowerCase().indexOf(query.toLowerCase()) > -1 && element.name.toLowerCase().indexOf(query.toLowerCase()) < 2 ) {
                    wrappedResult.push({
                        label:  element.name,
                        cityId: element._id
                    });
                }

                if ( wrappedResult.length >= 10 ) {
                    break;
                }

            }

            if ( wrappedResult.length === 0 ) {
                wrappedResult.push({
                    label:  'No city found...',
                    cityId: null
                });
            }

            response.writeHead(200, {"Content-Type": "application/json"});
            response.end(JSON.stringify(wrappedResult));

        });


    });

module.exports = router;
