var express  = require('express'),
    router   = express.Router();

router.get('/', (req, res)=>{
  res.render('login/index', {title: 'login'});
});

router.post('/', (req, res)=>{
  var username  = xss(req.body.username),
      password  = crypto.createHash('md5').update(req.body.password).digest("hex"),
      userObject = {
        username: username,
        password: password
      };
      var logCheck = req.app.db.collection("users").find(userObject, {"_id": 1}).limit(1);
      logCheck.toArray().then((logCheck)=>{
        if (logCheck.length > 0)
        {
          res.cookie("user", {username: username, hash: logCheck[0]._id});
          res.send("Success");
        }
        else
          res.send("Error");
      });
});

module.exports = router;
