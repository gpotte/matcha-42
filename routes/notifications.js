router.post('/notifications', middleware.loggedIn(), (req, res) => {
  var currentUser = {
    username  : req.cookies.user.username,
    _id       : ObjectId(req.cookies.user.hash)
  },
  notifs  = [],
  visits  = [],
  message = [],
  like    = [],
  match   = [],
  dislike = [],
  profile = req.app.db.collection("users").find(currentUser).limit(1);
  profile.toArray().then((profile)=>{
    if (profile[0].visitors){
    visits = profile[0].visitors.slice(-10);
    }
    if (profile[0].like){
      like = profile[0].like.slice(-10);
    }
    if (profile[0].match){
      match = profile[0].match.slice(-10);
    }
    if (profile[0].dislike){
      dislike = profile[0].dislike.slice(-10);
    }
  //ADD EVERY NOTIFS (MESSAGE/LIKE/DISLIKE)
  if (visits)
  {
    notifs = visits.concat(message, like, match, dislike);
    notifs.sort(function(a,b){return b.date - a.date});
    notifs = notifs.slice(-10);
  }
  res.render('partials/notifs', {newNotifs: profile[0].notif, notifs: notifs});
  });
});

router.post('/notifications/remove', (req, res)=>{
  var currentUser = {
    username : req.cookies.user.username,
    _id      : ObjectId(req.cookies.user.hash)
  }
  req.app.db.collection("users").update(currentUser, {$set: {notif: 0}});
  res.send("Success");
});

router.get('/notifications', (req, res)=>{
  var currentUser = {
    username  : req.cookies.user.username,
    _id       : ObjectId(req.cookies.user.hash),
    photo: req.cookies.user.photo
  },
  notifs  = [],
  visits  = [],
  message = [],
  like    = [],
  match   = [],
  dislike = [],
  profile = req.app.db.collection("users").find({username: currentUser.username}).limit(1);
  profile.toArray().then((profile)=>{
    if (profile[0].visitors)
    visits = profile[0].visitors;
    if (profile[0].like)
      like = profile[0].like;
    if (profile[0].match)
      match = profile[0].match;
    if (profile[0].dislike)
      dislike = profile[0].dislike;
    if (visits)
    {
      notifs = visits.concat(message, like, match, dislike);
      notifs.sort(function(a,b){return b.date - a.date});
    }
  res.render('notifs/notifs', {title: "notifications", user: currentUser, notifs: notifs})
});
});
module.exports = router;
