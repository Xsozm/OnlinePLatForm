var mongoose = require('mongoose')
var User = require('../models/User')
var Request = require('../models/Request')
var crypto = require('crypto')
let validator = require('lodash');
let Order = require('../models/Order.js');
var nodemailer = require('nodemailer');
var bcrypt = require('bcrypt-nodejs');
var async = require('async');
var crypto = require('crypto');
var xoauth2 = require('xoauth2');


module.exports = {
  Register: function (req, res) {
      console.log(req.body);
      var password = req.body.password;
      var Salt = crypto.randomBytes(16).toString('hex');
      var Hash = crypto.pbkdf2Sync(password, Salt, 1000, 64, 'sha512').toString('hex');
      var User1 = new User({email:req.body.email,username:req.body.username,salt:Salt,hash:Hash,role:req.body.role,address:req.body.address});
      User1.save(function (err, User) {
          if (err) {
              console.log(err);
              res.json({success: false, error: "An unexpected error has occured1"})
          } else {
              res.json({success: true, user: req.User})
          }

      })
},

	Login:function (req,res){
		User.findOne({username:req.body.username},function(err,user){
			if(err){
				res.send(err.message);
			}else{
				if(user){
					var salt = user.salt;
					var hash = crypto.pbkdf2Sync(req.body.password, salt, 1000, 64,'sha512').toString('hex');
					if(hash === user.hash){
						res.send("logged in")
					}else{
						res.send("password incorrect")
					}
				}else{
					res.send("not logged in")
				}
			}
		})

	},
  Forgot: function(req, res, next) {
        async.waterfall([
        function(done) {
          crypto.randomBytes(20, function(err, buf) {
            var token = buf.toString('hex');
            done(err, token);
          });
        },
        function(token, done) {
          User.findOne({ email: req.body.email }, function(err, user) {
            if (!user) {
            }

            user.resetPasswordToken = token;
            user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

            user.save(function(err) {
              done(err, token, user);
            });
          });
        },
        function(token, user, done) {
          var smtpTransport = nodemailer.createTransport({
            service: 'SendGrid',
            auth: {
              user: 'forgotpassword',
              pass: 'platform1234'
            }
          });
          var mailOptions = {
            to: user.email,
            from: 'forgotpassword@platformenactus.com',
            subject: 'Node.js Password Reset',
            text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
              'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
              'http://' + req.headers.host + '/reset/' + token + '\n\n' +
              'If you did not request this, please ignore this email and your password will remain unchanged.\n'
          };
          smtpTransport.sendMail(mailOptions, function(err) {
            done(err, 'done');
          });
        }
      ], function(err) {
        if (err) return next(err);
      });
  },
  resetpass:function(req, res) {
    async.waterfall([
  function(done) {
    User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
      if (!user) {
        req.flash('error', 'Password reset token is invalid or has expired.');
        return res.redirect('back');
      }

      user.password = req.body.password;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;

      user.save(function(err) {
        req.logIn(user, function(err) {
          done(err, user);
        });
      });
    });
  },
  function(user, done) {
    var smtpTransport = nodemailer.createTransport('SMTP', {
      service: 'SendGrid',
      auth: {
        user: '!!! YOUR SENDGRID USERNAME !!!',
        pass: '!!! YOUR SENDGRID PASSWORD !!!'
      }
    });
    var mailOptions = {
      to: user.email,
      from: 'passwordreset@demo.com',
      subject: 'Your password has been changed',
      text: 'Hello,\n\n' +
        'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
    };
    smtpTransport.sendMail(mailOptions, function(err) {
      req.flash('success', 'Success! Your password has been changed.');
      done(err);
    });
  }
], function(err) {
  res.redirect('/');
});
},

changepass:function(req,res){
  User.findOne({ email: req.body.email }, function(err, user) {
    if (!user) {
      // notfound
    }
    var Salt = crypto.randomBytes(16).toString('hex');
    var Hash = crypto.pbkdf2Sync(req.body.password, Salt, 1000, 64, 'sha512').toString('hex');
    user.salt = Salt;
    user.hash = Hash;
    user.save(function(err){

    })
}



}

module.exports.makeorder = function(req, res) {
//user the id if the user (we should use token to getthe id but maybe later )
// price of the order
// delievry fees
// products IDs

	var valid = req.body.price && validator.isInteger(req.body.price) &&
		req.body.delivery  && validator.isInteger(req.body.delivery)
	req.body.products && validator.isArray(req.body.products) &&  (req.body.user) && validator.isString(req.body.user) ;

	if (!valid) {
		return res.status(422).json({
			err: null,
			msg: 'One or More field(s) is missing or of incorrect type',
			data: null
		});
	}


	let order = {
		price: req.body.price,
		delivery: req.body.delivery,
		products: req.body.products,
		user: req.body.user
	};





	Order.create(order, function(err, neworder) {
		if (err) {
			return res.status(422).json({
				err: err,
				msg: "Couldn't create order",
				data: null
			});
		}
		return res.status(200).json({
			err: null,
			msg: "Created order successfully",
			data: neworder
		});

	});




}

module.exports.makeRequest = function(req,res){
  var valid = req.body.email &&
  req.body.name &&
  req.body.mob &&
  req.body.address &&
  req.body.description;

  if (!valid) {
    return res.status(422).json({
      err: null,
      msg: 'One or More field(s) is missing or of incorrect type',
      data: null
    });
  }

  let request = {
    email:req.body.email,
    name:req.body.name,
    mob:req.body.mob,
    address:req.body.address,
    description:req.body.description
  };

  Request.create(request, function(err, request) {
		if (err) {
			return res.status(422).json({
				err: err,
				msg: "Couldn't create request",
				data: null
			});
		}
		return res.status(200).json({
			err: null,
			msg: "Created request successfully",
			data: request
		});

	});

}
