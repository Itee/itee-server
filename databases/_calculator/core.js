/**
 * Created by tvalcke on 26/11/2015.
 */

module.exports = function( mongoose ) {

    var CoreSchema = mongoose.Schema({
        usage: {
            type:     Number,
            default: 0,
            min: 0,
            max: 100,
            validate: [
                function( coreUsage ) {
                    return (coreUsage >= 0 && coreUsage <= 100);
                },
                'La valeur "{VALUE}" pour le champ "{PATH}" est invalide, il doit être compris entre 0 et 100 !'
            ]
        },
        user:  Number,
        nice:  Number,
        sys:   Number,
        idle:  Number,
        irq:   Number
    });
    mongoose.model('Core', CoreSchema);

    return mongoose;

};
