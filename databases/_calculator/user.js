/**
 * Created by tvalcke on 26/11/2015.
 */

module.exports = function( mongoose ) {

    var UserSchema = mongoose.Schema({
        first_name: String,
        last_name:  String
    });
    mongoose.model('User', UserSchema);

    return mongoose;

};
