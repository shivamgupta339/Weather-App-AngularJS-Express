//importing required dependencies
let express = require('express');
let router = express.Router();
let info = require('./../model/Schema');
let register = require('../model/SchemaDetails');
let jwt = require('jsonwebtoken');
let config = require('../config/config');
let passport = require('passport');
//retrieving data from database
router.get('/', (req, res, next)=> {
  info.find({},(err,data)=>{
  	if(err){
  		console.log(err);
  	}
   	else{
  		res.json(data);
  	}
	})
});
//exporting router

router.post('/signIn', (req, res, next)=> {
  register.findOne({
   "emailId" : req.body.emailId,
   "password" : req.body.password
 },(err,data)=>{
  if(!data){
    res.status(401).send({success: false, msg: 'Authentication failed. User not found.'});
  }

  else{
      // check if password matches
      data.comparePassword(req.body.password, function (err, isMatch) {
        if (isMatch) {
          // if user is found and password is right create a token
          var token = jwt.sign({data}, config.secret);
          // return the information including token as JSON
          res.json({success: true, token: 'bearer ' + token});
        } else {
          res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'});
        }
      });
    }
  })
});

var getToken = function(headers){
  if(headers && headers.authorization){
    var parted = headers.authorization.split(' ');
    if(parted.length === 2){
      return parted[1];
    }else{
      return null;
    }
  }else {
    return null;
  }
};

router.get("/fetch",passport.authenticate('jwt', {session: false}),(req,res)=>{
  var token = getToken(req.headers);
  if(token){
    register.find(function(err,user){
      if(err) return next(err);
      res.json(user);
    });
  }else{
    return res.status(403).send({success: false, msg: 'Unauthorized. user'});
  }
});


/*router.get('/', passport.authenticate('jwt', {session: false}), (req, res, next)=> {
  var token = getToken(req.headers);
  if(token){
  info.find({},(err,data)=>{
    if(err){
      console.log(err);
    }
    else{
      res.json(data);
    }
  })
}else{
  return res.status(403).send({success:false,msg: "Unauthorized user"});
}
});*/


module.exports = router;