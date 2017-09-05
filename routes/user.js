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
        sex: req.body.sex,
        fame: 100,
        connected: "Now",
        blocked: ['a'],
        age: parseInt(req.body.age)
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
                  var localisation;
                  //GET ZIP CODE
                  request('http://ip-api.com/json', function (error, response, body) {
                    if (!error && response.statusCode == 200) {
                        body = JSON.parse(body)
                        req.app.db.collection("users").update(userObject, {$set: {localisation: body.zip}});
                     }
                  });
                  //GET ZIP CODE
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
  var username        = req.params.username,
      currentUser     = {username: req.cookies.user.username, photo: req.cookies.user.photo},
      like            = 0,
      liked            = 0,
      profile         = req.app.db.collection("users").find({username: username}).limit(1);
  profile.toArray().then((profile)=>{
    if (profile.length > 0)
    {
      var profileObject = profile[0];
        if (currentUser.username !== username)
        {
          req.app.db.collection("users").update({username: username, 'visitors.name': {$ne: currentUser.username}}, {$set: {notif: 1}, $inc: {fame: -1}, $addToSet: {visitors: {name: currentUser.username, date: (new Date()).getTime(), type: "visit", photo: currentUser.photo}}});
        //CHECK IF CURRENT USER LIKE THE PROFILE
          if (profileObject.like !== undefined)
            for (like of profileObject.like)
              if (like.name === currentUser.username)
                like = 1;
        }
        res.render('user/profile', {title: username, user: req.cookies.user, profile: profileObject, like: like, liked: liked});
    }
    else
      res.redirect('/404');
  });
});
////ACCESS USER PAGE///////

////EDIT USER INFOS///////
router.post('/user/edit', middleware.loggedIn(), (req, res)=>{
  var userObject = {
    firstname : xss(req.body.firstName),
    name      : xss(req.body.name),
    mail      : xss(req.body.mail),
    bio       : xss(req.body.bio),
    sex       : xss(req.body.sex),
    pref      : xss(req.body.pref),
    age       : req.body.age
  },
  currentUser = {
    username  : req.cookies.user.username,
    _id       : ObjectId(req.cookies.user.hash)
  };
  req.app.db.collection("users").findOneAndUpdate(currentUser, {$set: userObject}, (err, result)=>{
    if (err){res.send("Error");}
    else if(result.lastErrorObject.n > 0){
      res.send("Success");
    }
  });
});

router.post('/user/edit/photo', middleware.loggedIn(), (req, res)=>{
  var photo       = [xss(req.body.photo1)],
      currentUser = {
        username  : req.cookies.user.username,
        _id       : ObjectId(req.cookies.user.hash)
      };
    if (xss(req.body.photo2) != '')
      photo.push(xss(req.body.photo2));
    if (xss(req.body.photo3) != '')
      photo.push(xss(req.body.photo3));
    if (xss(req.body.photo4) != '')
      photo.push(xss(req.body.photo4));
    if (xss(req.body.photo5) != '')
      photo.push(xss(req.body.photo5));
    req.app.db.collection("users").findOneAndUpdate(currentUser, {$set: {photo: photo}}, (err, result)=>{
    if (err){res.send("Error");}
    else if(result.lastErrorObject.n > 0){
      req.app.db.collection("users").find({'like.name': currentUser.username}).toArray().then((test)=>{
        for (tes of test){
          console.log(tes);
        }
      });

      req.app.db.collection("users").updateMany({'visitors.name': currentUser.username}, {$set: {'visitors.$.photo': photo[0]}}, false);
      req.app.db.collection("users").updateMany({'like.name': currentUser.username}, {$set: {'like.$.photo': photo[0]}}, false);
      req.app.db.collection("users").updateMany({'match.name': currentUser.username}, {$set: {'match.$.photo': photo[0]}}, false);
      res.cookie("user", {username: currentUser.username, hash: req.cookies.user.hash, photo: photo[0]});
      res.send("Success");
    }
  });
});

router.post('/user/add/tag', middleware.loggedIn(), (req, res)=>{
  var tag = req.body.tag,
  currentUser = {
    username  : req.cookies.user.username,
    _id       : ObjectId(req.cookies.user.hash)
  },
  checkExist = req.app.db.collection("tags").find({tag: tag}, {"_id": 1}).limit(1);
  checkExist.toArray().then((checkExist)=>{
    if (checkExist.length > 0){
      req.app.db.collection("users").update(currentUser, { $addToSet: {tags: {id: checkExist[0]._id, tag: tag}}}, (err, result)=>{
        if (err)
          res.send("Error");
        else
          res.send("Success");
      });
    }
    else {
      req.app.db.collection("tags").insert({tag: tag}, (err, result)=>{
          if (err){res.send("Error")}
          else {
            req.app.db.collection("users").update(currentUser, { $addToSet: {tags: {id: result.insertedIds[0], tag: tag}}}, (err, result)=>{
              if (err)
                res.send("Error");
              else
                res.send("Success");
            });
          }
      });
    }
  });
});

router.post('/user/remove/tag', middleware.loggedIn(), (req, res)=>{
  var tag = req.body.id,
  currentUser = {
    username  : req.cookies.user.username,
    _id       : ObjectId(req.cookies.user.hash)
  };
req.app.db.collection("users").update(currentUser, {$pull: {tags: {id: ObjectId(req.body.id)}}}, (err, result)=>{
    if (err){res.send("Error")}
    else {
      console.log(result.result)
      res.send("Success")
    }
  });
});

router.post('/user/change/loc', middleware.loggedIn(), (req, res)=>{
  var loc = req.body.loc,
  currentUser = {
    username  : req.cookies.user.username,
    _id       : ObjectId(req.cookies.user.hash)
  };
  if (loc.length === 5){
  req.app.db.collection("users").update(currentUser, {$set: {localisation: loc}}, (err, result)=>{
      if (err){res.send("Error")}
      else
        res.send("Success")
    });
  }
});
////EDIT USER INFOS///////

//REPORT AND BLOCK
router.post('/user/report', (req, res)=>{
  var currentUser = { username  : req.cookies.user.username},
      reported    = req.body.reported;
  sendmail({
    from: 'no-reply@matcha.com',
    to: 'gilles.potte.jirandrid@gmail.com',
    subject: "User reported",
    html: "Hello " + currentUser.username + " just reported " + reported + ".\nYou can access it via http://e9bae412.ngrok.io/user/" + reported
    }, (err, reply)=>{
      if (err){res.send("Error")}
      if (reply){res.send("Success")}
    });
});

router.post('/user/block', (req, res)=>{
  var currentUser = { username  : req.cookies.user.username},
      blocked     = req.body.blocked,
      room        = [currentUser.username, blocked].sort();
  console.log(blocked);
  req.app.db.collection("users").update({username: currentUser.username, blocked: {$ne: blocked}}, {$addToSet: {blocked: blocked}, $pull: {like: {name: blocked}, match: {name: blocked}, dislike: {name: blocked}, visitors: {name: blocked}}});
  req.app.db.collection("users").update({username: blocked, blocked: {$ne: currentUser.username}}, {$addToSet: {blocked: currentUser.username}, $pull: {like: {name: currentUser.username}, match: {name: currentUser.username}, dislike: {name: currentUser.username}, visitors: {name: currentUser.username}}});
  req.app.db.collection("tchat").remove({room: room[0]+room[1]});
  res.send("Success");
});
//REPORT AND BLOCK

module.exports = router;
