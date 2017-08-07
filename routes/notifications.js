router.post('/notifications', (req, res) => {
  var currentUser = {
    username  : req.cookies.user.username,
    _id       : ObjectId(req.cookies.user.hash)
  },
  notifs  = [],
  visits  = [],
  message = [],
  like    = [],
  dislike = [],
  profile = req.app.db.collection("users").find(currentUser).limit(1);
  profile.toArray().then((profile)=>{
    if (profile[0].visitors){
    profile[0].visitors.sort(function(a,b){return a.getTime() - b.getTime()});
    var visits = profile[0].visitors.slice(-10);
  }
  //ADD EVERY NOTIFS (MESSAGE/LIKE/DISLIKE)
  notifs = visits.concat(message, like, dislike);
  notifs.sort(function(a,b){return a.getTime() - b.getTime()});
  notifs = notifs.slice(-10);
  console.log(notifs);
  res.render('partials/notifs', {newNotifs: profile[0].notif, notifs: notifs});
  });
});

module.exports = router;
