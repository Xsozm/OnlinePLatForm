var mongoose = require('mongoose')
var Request = require('../models/Request')

module.exports = {
  ViewRequests: function (req, res) {
    Request.find({status: "Not Reviewed"}, function (err, corp) {
          if (request) {
              res.json({success: true, Requests: request})
          }else{
              res.json({success: false, error: "Failed to retrieve corporation requests"})
          }
    });
  },
  ApproveRequest: function (req, res) {
    var e = req.body.email;
        Request.findOne({email:e},function(err,request){
            if(request) {
                request.status = 'Approved'
                request.save(function(err,request){
                    if (err) {
                        console.log(err)
                        res.json({success: false, error: "An unexpected error occured while updating request"})
                    }else {
                        res.json({success: true})
                    }
                })
            }
      })
  },
  RejectRequest: function (req, res) {
    var e = req.body.email;
        Request.findOne({email:e},function(err,request){
            if(request) {
                request.status = 'Rejected'
                request.save(function(err,request){
                    if (err) {
                        console.log(err)
                        res.json({success: false, error: "An unexpected error occured while updating request"})
                    }else {
                        res.json({success: true})
                    }
                })
            }
      })
  }


}
