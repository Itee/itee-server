/**
 * Created by tvalcke on 26/11/2015.
 */

module.exports = function( mongoose ) {

    var MemorySchema = mongoose.Schema({
        free:  {
            type:     Number,
            default: 0,
            min: 0,
            validate: [
                function( freeMemory ) {
                    return (freeMemory >= 0);
                },
                'La valeur "{VALUE}" pour le champ "{PATH}" est invalide, il doit être positif ou égal à zéro !'
            ]
        },
        used:  {
            type:     Number,
            default: 0,
            min: 0,
            validate: [
                function( useMemory ) {
                    return (useMemory >= 0);
                },
                'La valeur "{VALUE}" pour le champ "{PATH}" est invalide, il doit être positif ou égal à zéro !'
            ]
        },
        total: {
            type:     Number,
            default: 0,
            min: 0,
            validate: [
                function( totalMemory ) {
                    return (totalMemory >= 0);
                },
                'La valeur "{VALUE}" pour le champ "{PATH}" est invalide, il doit être positif ou égal à zéro !'
            ]
        },
        usage: {
            type:     Number,
            default: 0,
            min: 0,
            max: 100,
            validate: [
                function( memoryUsage ) {
                    return (memoryUsage >= 0 && memoryUsage <= 100);
                },
                'La valeur "{VALUE}" pour le champ "{PATH}" est invalide, il doit être compris entre 0 et 100 !'
            ]
        }
    });
    mongoose.model('Memory', MemorySchema);

    return mongoose;

};
