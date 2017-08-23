router.get('/messages/:user1/:user2', middleware.loggedIn(), (req, res)=>{
  var user      = [req.params.user1, req.params.user2],
      checkLike = req.app.db.collection("users").find({username: user[0], 'like.name': {$eq: user[1]}}).limit(1);
  user.sort();
  url = "/messages/" + user[0] + user[1] + "/" + user[0] + "/" + user[1];
  checkLike.toArray().then((checkLike)=>{
    if (checkLike.length > 0){
      res.redirect(url);
    }
    else {
      console.log("you cant do this");
    }
  });
});

router.get('/messages/:room/:user1/:user2', middleware.loggedIn(), (req, res)=>{
  var currentUser = {username: req.cookies.user.username, photo: req.cookies.user.photo},
      user        = [req.params.user1, req.params.user2];
  if (user[0] === currentUser.username || user[1] === currentUser.username)
    res.render("message/tchat", {title: "tchatRoom:", user: currentUser});
  else
    res.send("error");
    console.log(req.params)
});
module.exports = router;
