var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://127.0.0.1/my_mongo");

var UserSchema = new mongoose.Schema({
    email: {
    	type: String,
        required: [true, 'Please enter email ID']
    },
 	password: {
 		type: String,
        required: true
    }
});
var checkAuth = function checkAuth(req, res, next) {
  if (!req.session.user_id)
    return false;
  else
  	return true;
}
module.exports = mongoose.model('User', UserSchema ); 