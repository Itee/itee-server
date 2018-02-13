/**
 * Created by tvalcke on 26/11/2015.
 */

module.exports = function( mongoose ) {

    var MemorySchema = mongoose.model('Memory').schema,
        GpuSchema    = mongoose.Schema({
            name:        {
                type:     String,
                trim:     true,
                default: 'GpuDefaultName'
            },
            memory:      [ MemorySchema ],
            temperature: {
                type:     Number,
                default: 0,
                min: 0,
                max: 150,
                validate: [
                    function( temperature ) {
                        return (temperature >= 0 && temperature <= 150);
                    },
                    'La valeur "{VALUE}" pour le champ "{PATH}" est invalide, il doit être compris entre 0 et 150 !'
                ]
            },
            fan_speed:   {
                type:     Number,
                default: 0,
                min: 0,
                max: 100,
                validate: [
                    function( fanSpeed ) {
                        return (fanSpeed >= 0 && fanSpeed <= 100);
                    },
                    'La valeur "{VALUE}" pour le champ "{PATH}" est invalide, il doit être compris entre 0 et 100 !'
                ]
            }
        });
    mongoose.model('Gpu', GpuSchema);

    return mongoose;

};
