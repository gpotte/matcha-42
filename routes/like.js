router.post('/like', (req, res)=>{
  var currentUser = {username: req.cookies.user.username, photo: req.cookies.user.photo},
      username    = req.body.user,
      profile     = req.app.db.collection("users").find({username: currentUser.username}).limit(1);
  profile.toArray().then((profile)=>{
    //LIKE FOR THE FIRST TIME
    if (!profile.like || profile.like.indexOf("username") === '-1'){

    }
    //LIKE + MATCH
    else if (profile.like.indexOf("username") !== '-1'){
      
    }
  });

});

module.exports = router;
