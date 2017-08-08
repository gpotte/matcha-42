router.post('/like', (req, res)=>{
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
    var target = req.app.db.collection("users").find({username: username}).limit(1);
    target.toArray().then((target)=>{
      if (target[0].dislike && profile[0].dislike.indexOf(currentUser.username) !== -1)
        req.app.db.collection("users").update({username: username}, {$pull: {dislike: {name: currentUser.username}}});
    });
  });
});

module.exports = router;
