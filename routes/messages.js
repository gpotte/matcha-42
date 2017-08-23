router.get('/messages/:user1/:user2', middleware.loggedIn(), (req, res)=>{
  var user      = [req.params.user1, req.params.user2],
      checkLike = req.app.db.collection("users").find({username: user[0], 'like.name': {$eq: user[1]}}).limit(1);
  user.sort();
  url = "/messages/"+user[0]+user[1];
  checkLike.toArray().then((checkLike)=>{
    if (checkLike.length > 0){
      res.redirect(url);
    }
    else {
      console.log("you cant do this");
    }
  });
});

module.exports = router;
