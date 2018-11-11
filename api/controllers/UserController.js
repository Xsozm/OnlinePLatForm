var mongoose = require('mongoose')
var User = require('../models/User')
var crypto = require('crypto')


module.exports = {
  Register: function (req, res) {
      var password = req.body.password;
      var salt = crypto.randomBytes(16).toString('hex');
      var hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
      var User = new User();
          User.email =  req.body.email;
          User.username = req.body.username;
          User.password = hash;
          User.role = req.body.role
          User.address = req.body.address;
      User.save(function (err, corp) {
          if (err) {
              console.log(err);
              res.json({success: false, error: "An unexpected error has occured1"})
          } else {
              res.json({success: true, user: req.User})
          }

      })
}
}
