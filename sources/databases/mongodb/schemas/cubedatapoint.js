/**
 * Created by tvalcke on 27/09/2016.
 */


module.exports = function( mongoose ) {

    var CubeDataPointSchema = mongoose.Schema({
        data: Buffer
    });

    mongoose.model('CubeDataPoint', CubeDataPointSchema);

    return mongoose;
};
