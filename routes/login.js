
//// LOGIN FORM + POST ////
router.get('/login', (req, res)=>{
  res.render('login/index', {title: 'login'});
});

router.post('/login', (req, res)=>{
  var username  = xss(req.body.username),
      password  = crypto.createHash('md5').update(req.body.password).digest("hex"),
      userObject = {
        username: username,
        password: password
      };
      var logCheck = req.app.db.collection("users").find(userObject, {"_id": 1, "photo": 1}).limit(1);
      logCheck.toArray().then((logCheck)=>{
        if (logCheck.length > 0)
        {
          //GET ZIP CODE
          request('http://ip-api.com/json', function (error, response, body) {
            if (!error && response.statusCode == 200) {
                body = JSON.parse(body)
                req.app.db.collection("users").update(userObject, {$set: {connected: "Now", localisation: body.zip}});
             }
          });
          //GET ZIP CODE
          res.cookie("user", {username: username, hash: logCheck[0]._id, photo: logCheck[0].photo[0]});
          res.send("Success");
        }
        else
          res.send("Error");
      });
});
//// LOGIN FORM + POST ////
//// PASSWORD LOST ////

router.get('/login/lost', (req, res)=>{
  res.render('login/lost', {title: 'password lost'});
});

router.post('/login/lost', (req, res)=>{
  var username  = xss(req.body.username),
      mail      = xss(req.body.mail);
  console.log(req.body);
  var logCheck = req.app.db.collection("users").find({username: username, mail: mail}, {"_id": 1, "token": 1}).limit(1);
  logCheck.toArray().then((logCheck)=>{
    if (logCheck.length > 0)
    {
        sendmail({
          from: 'no-reply@matcha.com',
          to: mail,
          subject: "Lost Password",
          html: "Hello " + username + " follow this link to reset your password : http://localhost:3030/login/lost/" + logCheck[0]._id + "/" + logCheck[0].token
        }, (err, reply)=>{
          if (err)(console.log(err))
          if (reply){res.send("Success")}
        });
    }
    else
      res.send("Error")
  });
});

router.get('/login/lost/:id/:token', (req, res)=>{
  res.render('login/reset', {title: 'reset password', id: req.params.id, token: req.params.token});
});

router.post('/login/newPassword', (req, res)=>{
  if (req.body.password === req.body.confirm)
  {
    var password = crypto.createHash('md5').update(req.body.password).digest("hex"),
        newToken = crypto.randomBytes(64).toString('hex');
    req.app.db.collection("users").findOneAndUpdate({_id: ObjectId(req.body.id), token: req.body.token},
                                          {$set: {password: password, token: newToken}},
                                          (err, result)=>{
                                              if (err){res.send("Error");}
                                              else if(result.lastErrorObject.n > 0){
                                                res.send("Success");
                                              }
                                          });
  }
  else
    res.send("Wrong Password");
});
//// PASSWORD LOST ////

module.exports = router;
