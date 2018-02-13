/**
 * Created by tvalcke on 26/11/2015.
 */

module.exports = function( mongoose ) {

    var CoreSchema = mongoose.model('Core').schema,
        CpuSchema  = mongoose.Schema({
            name:  {
                type:     String,
                trim:     true,
                default: 'CpuDefaultName'
            },
            usage: {
                type:     Number,
                default: 0,
                min: 0,
                max: 100,
                validate: [
                    function( cpuUsage ) {
                        return (cpuUsage >= 0 && cpuUsage <= 100);
                    },
                    'La valeur "{VALUE}" pour le champ "{PATH}" est invalide, il doit être compris entre 0 et 100 !'
                ]
            },
            cores: [ CoreSchema ]
        });
    mongoose.model('Cpu', CpuSchema);

    return mongoose;

};
