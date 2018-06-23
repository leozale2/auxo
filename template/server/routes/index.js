var express = require('express');
var router = express.Router();

router.post("/domain/User/:id/:method", function(req, res, next) {
    let [name, captcha] = req.body;
    if(captcha && captcha === req.session.captcha){
      next();
    }else{
      res.send({error:{ captcha : "captcha error!" }});
    }
  })
module.exports = router;
