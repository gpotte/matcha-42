////CREATE A NEW USER ///////
router.get('/user/new', (req, res)=>{
  res.render('user/new', {title: 'signin'});
});

router.post('/user/new', (req, res)=>{
  var username  = xss(req.body.username),
      mail      = xss(req.body.mail),
      name      = xss(req.body.name),
      firstName = xss(req.body.firstname),
      password  = crypto.createHash('md5').update(req.body.password).digest("hex"),
      token     = crypto.randomBytes(64).toString('hex'),
      photo     = req.body.sex === "male" ? "https://www.smashingmagazine.com/wp-content/uploads/2015/06/10-dithering-opt.jpg" : "http://fr.cdn.v5.futura-sciences.com/buildsv6/images/mediumoriginal/7/2/6/726a071f66_56630_250612-screen-rapace8-1610-diapo.jpg",
      userObject = {
        username: username,
        mail: mail,
        name: name,
        firstName: firstName,
        password: password,
        token: token,
        photo: [photo],
        pref: req.body.pref,
        sex: req.body.sex
      };

      console.log(userObject);
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
                else {
                  res.cookie("user", {username: result.ops[0].username, hash: result.ops[0]._id, photo: result.ops[0].photo[0]});
                  res.send("Success")
                }
              });
            }
          });
        }
      });
});
////CREATE A NEW USER ///////

////ACCESS USER PAGE///////
router.get('/user/:username', middleware.loggedIn(), (req, res)=>{
  var username = req.params.username;
  var profile = req.app.db.collection("users").find({username: username}).limit(1);
  profile.toArray().then((profile)=>{
    if (profile.length > 0)
    {
        var profileObject = profile[0];
        res.render('user/profile', {title: username, user: req.cookies.user, profile: profileObject});
    }
    else
      res.redirect('/404');
  });
});
////ACCESS USER PAGE///////

////EDIT USER INFOS///////
router.get('/user/edit/:username')
router.patch('/user/:username')
////EDIT USER INFOS///////

module.exports = router;
