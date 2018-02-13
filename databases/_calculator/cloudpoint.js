/**
 * Created by tvalcke on 27/09/2016.
 */

module.exports = function( mongoose ) {

    var SchemaTypes = mongoose.Schema.Types;

    var CubeDataPointReferenceSchema = mongoose.Schema({
        coordinates: {
            x: Number,
            y: Number,
            z: Number
        },
        id: SchemaTypes.ObjectId
    }, {_id: false, id: false});

    var CloudPointSchema = mongoose.Schema({
        lambert_coordinates: {
            x: SchemaTypes.Double,
            y: SchemaTypes.Double,
            z: SchemaTypes.Double
        },
        boundingBox:         {
            xMin:   Number,
            xMax:   Number,
            yMin:   Number,
            yMax:   Number,
            zMin:   Number,
            zMax:   Number
        },
        cube_data_point:      [CubeDataPointReferenceSchema]
    });

    mongoose.model('CloudPoint', CloudPointSchema);

    return mongoose;
};
