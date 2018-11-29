var mongoose = require('mongoose')
var User = require('../models/User')
var crypto = require('crypto')


module.exports = {
  Register: function (req, res) {
      console.log(req.body);
      var password = req.body.password;
      var Salt = crypto.randomBytes(16).toString('hex');
      var Hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
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

  }
}
