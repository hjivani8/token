var express = require('express');
var router = express.Router();
var register = require('../model/register');
var jwt = require('jsonwebtoken');

/* GET home page. */
router.post('/register',async function(req, res, next) {

    try {

      const data = await register.create(req.body)
      var token = jwt.sign({ id: data._id }, 'HARSH');

      res.status(201).json({

        data:data,
        token

      })
      
    } catch (error) {

      res.send(error.message);
      
    }

});


const secure = (res,req,next) => {
//console.log("Hello");
    console.log(res.headers.authorization);
    
    if (!res.headers.authorization) {
      console.log('send token');   
    }

    var decoded = jwt.verify(res.headers.authorization, 'HARSH');
    console.log(decoded);
    next();    

}





router.get('/getalldata', secure , async function(req, res, next) {

  try {

    const data = await register.find()

    res.status(200).json({

      data:data,

    })
    
  } catch (error) {

    // res.send(error.message);
    console.log(error);
    
  }

});

module.exports = router;
