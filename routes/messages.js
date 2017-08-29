router.get('/messages/:user1/:user2', middleware.loggedIn(), (req, res)=>{
  var user      = [req.params.user1, req.params.user2],
      checkLike = req.app.db.collection("users").find({username: user[0], 'match.name': {$eq: user[1]}}).limit(1);
  user.sort();
  url = "/messages/" + user[0] + user[1] + "/" + user[0] + "/" + user[1];
  checkLike.toArray().then((checkLike)=>{
    if (checkLike.length > 0){
      res.redirect(url);
    }
    else {
      res.redirect("/");
    }
  });
});

router.get('/messages/:room/:user1/:user2', middleware.loggedIn(), (req, res)=>{
  var currentUser = {username: req.cookies.user.username, photo: req.cookies.user.photo},
      user        = [req.params.user1, req.params.user2],
      checkLike = req.app.db.collection("users").find({username: user[0], 'match.name': {$eq: user[1]}}).limit(1);
  checkLike.toArray().then((checkLike)=>{
  if ((user[0] === currentUser.username || user[1] === currentUser.username) && checkLike.length > 0)
    res.render("message/tchat", {title: "tchatRoom:", user: currentUser});
  else
    res.redirect("/");
  });
});

io.on('connection', (socket)=>{

  socket.on('subscribe', (data)=>{
    socket.pseudo = data.user;
    socket.join(data.room);
    app.db.collection("tchat").find({room: data.room}).sort({$natural: -1}).limit(10).toArray().then((history)=>{
      history.reverse();
      if (history.length > 0)
        for (message of history) {
          io.sockets.in(data.room).emit('preload', {pseudo: message.pseudo, msg: message.msg, time: message.time});
          console.log(message);
          console.log(">..................<");
        }
    });
  });

  socket.on('chat message', (data)=>{
      app.db.collection("tchat").insert({room: data.room, msg: data.msg, pseudo: socket.pseudo, time: dateFormat()});
      io.sockets.in(data.room).emit('chat message', {pseudo: socket.pseudo, msg: data.msg});
  });
});

router.post('/messages/loadMore', middleware.loggedIn(), (req, res)=>{
  var currentUser = {username: req.cookies.user.username, photo: req.cookies.user.photo},
      room        = req.body.room,
      lastTime    = req.body.lastTime,
      returnValue = "";
  app.db.collection("tchat").find({room: room, time: {$lt: lastTime}}).sort({$natural: -1}).limit(10).toArray().then((history)=>{
    history.reverse();
    if (history.length > 0)
      for (message of history){
        if (message.pseudo === currentUser.username){
          returnValue = returnValue + "<li class='list-group-item'><strong>"+
                                message.pseudo + " </strong>"+ message.msg +
                                "<span class='badge'>" + message.time + "</span></li>";
        }
        else {
          returnValue = returnValue + "<li class='list-group-item disabled'><strong>"+
                                message.pseudo + " </strong>"+ message.msg +
                                "<span class='badge'>" + message.time + "</span></li>";
        }
      }
      res.send(returnValue);
  });

});

module.exports = router;
