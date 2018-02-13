/**
 * Created by tvalcke on 26/11/2015.
 */

module.exports = function( mongoose ) {

    var UserSchema    = mongoose.model('User').schema,
        JobSchema     = mongoose.model('Job').schema,
        ProjectSchema = mongoose.Schema({
            name:           {
                type:     String,
                trim:     true,
                required: 'La valeur "{VALUE}" pour le champ "{PATH}" est invalide, sa longueur doit etre comprise entre 3 et 50 caracteres !',
                validate: [
                    function( strName ) {
                        return strName && strName.length >= 3 && strName.length <= 50;
                    },
                    'La valeur "{VALUE}" pour le champ "{PATH}" est invalide, sa longueur doit etre comprise entre 3 et 50 caracteres !'
                ]
            },
            description: {
                type:     String,
                trim:     true,
                required: 'La valeur "{VALUE}" pour le champ "{PATH}" est invalide, sa longueur doit être comprise entre 20 et 500 caractères !',
                validate: [
                    function( strDesc ) {
                        return strDesc && strDesc.length >= 20 && strDesc.length <= 500;
                    },
                    'La valeur "{VALUE}" pour le champ "{PATH}" est invalide, sa longueur doit être comprise entre 20 et 500 caractères !'
                ]
            },
            start_date:  {
                type:    Date,
                default: Date.now
            },
            end_date:    {
                type:    Date,
                default: null
            },
            due_date:    {
                type:    Date,
                default: null
            },
            state:       {
                type:    String,
                default: 'initial',
                trim:    true,
                enum:    {
                    values:  'initial finish error'.split(' '),
                    message: 'La tache ne peut pas avoir un état "{VALUE}". Les états valides sont: initial, running, stoping, error ou finish'
                }
            },
            assign_users: [ UserSchema ],
            jobs:         [ JobSchema ],
            project_errors: [
                {
                    title:   String,
                    message: String
                }
            ]
        });
    mongoose.model('Project', ProjectSchema);

    return mongoose;

};
