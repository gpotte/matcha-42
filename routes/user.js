router.get('/new', (req, res)=>{
  res.render('user/new', {title: 'signin'});
});

router.post('/new', (req, res)=>{
  var username  = xss(req.body.username),
      mail      = xss(req.body.mail),
      name      = xss(req.body.name),
      firstName = xss(req.body.firstName),
      password  = crypto.createHash('md5').update(req.body.password).digest("hex"),
      userObject = {
        username: username,
        mail: mail,
        name: name,
        firstName: firstName,
        password: password
      };

      var checkExist = req.app.db.collection("users").find({username: username}, {"_id": 1}).limit(1);
      checkExist.toArray().then((checkExist)=>{
        if (checkExist.length > 0)
          res.send("username taken");
        else
        {
          var checkExist = req.app.db.collection("users").find({mail: mail}, {"_id": 1}).limit(1);
          checkExist.toArray().then((checkExist)=>{
            if (checkExist.length > 0)
              res.send("mail taken");
            else
            {
              req.app.db.collection("users").insert(userObject, (err, result)=>{
                if (err){res.send("Error")}
                else {res.send("Success")}
              });
            }
          });
        }
      });
});

module.exports = router;
