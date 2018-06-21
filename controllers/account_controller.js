var User = require('../models/User');
var crypto = require('crypto');

exports.get_signup = function(req, res) {
    if(req.session.user_id){
        User.find({'_id':req.session.user_id}, function(err, data){
            res.render('error', { title: 'Logged In from Before' });
        });
    }else{
        res.render('signup', { title: 'Sign Up' });
    }
};
exports.post_signup = function(req, res) {
    var username = req.body.username;
    var password = req.body.password;

    var salt = "cbaead9aa6eb7992";
    var passwordData = sha512(password, salt);
    var new_user = new User({'email':username, 'password':passwordData});
    new_user.save(function(err){
        if (err) throw err;
        res.render('postSignup', { title: 'Storemanager' });
    })
};

exports.get_login = function(req, res) {
    console.log(req.session.user_id);
    if(req.session.user_id){
        User.find({'_id':req.session.user_id}, function(err, data){
            res.render('error', { title: 'Logged In from Before' });
        });
    }else{
        res.render('login', { title: 'Log In' });
    }
};
exports.post_login= function(req, res) {
    var post = req.body;

    var salt = "cbaead9aa6eb7992";
    var passwordData = sha512(post.password, salt);
    User.find({'email':post.username, 'password':passwordData}, function (err, data){
        if((data === undefined || data.length > 0) && req.session){
            req.session.user_id = data[0]._id;
            res.render('error', { title: 'Logged In' });
        }
        else
            res.render('error', { title: 'Not Logged In' });
    });
};

exports.get_logout= function(req, res) {
    delete req.session.user_id;
    console.log(req.session);
    res.redirect('/fidan/login');
};

var getRandomString = function(length){
    return crypto.randomBytes(Math.ceil(length/2))
            .toString('hex') /** convert to hexadecimal format */
            .slice(0,length);   /** return required number of characters */
};
var sha512 = function(password, salt){
    var hash = crypto.createHmac('sha512', salt); /** Hashing algorithm sha512 */
    hash.update(password);
    var value = hash.digest('hex');
    return value;
};