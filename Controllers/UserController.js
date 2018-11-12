var mongoose = require('mongoose')
var User = require('../models/User')
var crypto = require('crypto')


module.exports = {
  Register: function (req, res) {
      console.log(req.body);
      var password = req.body.password;
      var salt = crypto.randomBytes(16).toString('hex');
      var hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
      var User1 = new User({email:req.body.email,username:req.body.username,password:hash,role:req.body.role,address:req.body.address});
      User1.save(function (err, User) {
          if (err) {
              console.log(err);
              res.json({success: false, error: "An unexpected error has occured1"})
          } else {
              res.json({success: true, user: req.User})
          }

      })
}
}
