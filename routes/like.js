router.post('/like', middleware.loggedIn(), (req, res)=>{
  var currentUser = {username: req.cookies.user.username, photo: req.cookies.user.photo},
      username    = req.body.user,
      photo       = req.body.photo,
      profile     = req.app.db.collection("users").find({username: currentUser.username}).limit(1);
  profile.toArray().then((profile)=>{
    req.app.db.collection("users").update({username: username}, {$set: {notif: 1}});
    //LIKE
      req.app.db.collection("users").update({username: username, 'like.name': {$ne: currentUser.username}}, {$addToSet: {like: {name: currentUser.username, date: (new Date()).getTime(), type: "like", photo: currentUser.photo}}, $inc: {fame: 2}});
    //MATCH
    if (profile[0].like){
    var i = profile[0].like.length;
    while(i-- > 0) {
      if (profile[0].like[i].name === username){
        req.app.db.collection("users").update({username: username , 'match.name': {$ne: currentUser.username}}, {$addToSet: {match: {name: currentUser.username, date: (new Date()).getTime(), type: "match", photo: currentUser.photo}}});
        req.app.db.collection("users").update({username: currentUser.username , 'match.name': {$ne: username}}, {$addToSet: {match: {name: username, date: (new Date()).getTime(), type: "match", photo: photo}}, $set: {notif: 1}});
        break ;
      }
    }}
    //REMOVE DISLIKE
    req.app.db.collection("users").update({username: username}, {$pull: {dislike: {name: currentUser.username}}});
  });
});

router.post('/dislike', middleware.loggedIn(), (req, res)=>{
  var currentUser = {username: req.cookies.user.username, photo: req.cookies.user.photo},
      username    = req.body.user,
      photo       = req.body.photo,
      profile     = req.app.db.collection("users").find({username: currentUser.username}).limit(1);
      profile.toArray().then((profile)=>{
        req.app.db.collection("users").update({username: username}, {$set: {notif: 1}, $inc: {fame: -2}});
        //REMOVE LIKE AND MATCHS
          req.app.db.collection("users").update({username: username}, {$pull: {like: {name: currentUser.username}, match: {name: currentUser.username}}});
          req.app.db.collection("users").update({username: currentUser.username}, {$pull: {match: {name: username}}});
        //ADD dislike
          req.app.db.collection("users").update({username: username}, {$addToSet: {dislike: {name: currentUser.username, date: (new Date()).getTime(), type: "dislike", photo: currentUser.photo}}});
      });
});

router.post('/getLike', (req, res)=>{
  var currentUser = {username: req.cookies.user.username, photo: req.cookies.user.photo},
      username    = req.body.user,
      bool        = 0,
      currentProfile = req.app.db.collection("users").find({username: currentUser.username}).limit(1);
  //CHECK IF VISITED USER LIKE OR MATCH CURRENT USER
  currentProfile.toArray().then((currentProfile)=>{
    if (currentProfile[0].match !== undefined)
      for (match of currentProfile[0].match)
        if (match.name === username)
        {
          res.send("Match");
          bool = 1;
        }
    if (currentProfile[0].like !== undefined && bool === 0)
      for (like of currentProfile[0].like)
        if (like.name === username)
        {
          res.send("Liked");
        }
  });
});
module.exports = router;
