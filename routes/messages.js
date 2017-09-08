router.get('/messages', middleware.loggedIn(), (req, res)=>{
  var currentUser = {
    username  : req.cookies.user.username,
    _id       : ObjectId(req.cookies.user.hash)
  },
  returnValue = [];
  req.app.db.collection("users").find(currentUser).limit(1).toArray().then((user)=>{
    if (user[0].match)
    {
      var promises = user[0].match.map(function(match){
        return new Promise(function(resolve, reject) {
          var tmp         = {};
          tmp.url = '/messages/' + match.name + '/' + currentUser.username;
          tmp.name = match.name;
          tmp.photo = match.photo;
          req.app.db.collection("tchat").find({room: match.room}).sort({$natural: -1}).limit(1).toArray().then((message)=>{
            if (message.length > 0){
              tmp.msg = message[0].msg;
              tmp.time = message[0].time;
              tmp.date = message[0].date;
            }
            else {
              tmp.date = match.date;
              tmp.time = match.time;
            }
          }).then(()=>{
            returnValue.push(tmp);
            resolve();
          });
        });
      });

      Promise.all(promises)
      .then(function() {
        returnValue.sort((a, b)=>{return(b.time - a.time)});
        res.render('message/index', {title: "messages", user: req.cookies.user, messages: returnValue});
      });
    }
    else
      res.render('message/index', {title: "messages", user: req.cookies.user, messages: ""});
  });
});

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
    res.render("message/tchat", {title: "tchatRoom", user: currentUser});
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
          io.sockets.in(data.room).emit('preload', {pseudo: message.pseudo, msg: message.msg, time: message.date});
          console.log(message);
          console.log(">..................<");
        }
    });
  });

  socket.on('chat message', (data)=>{
      if (data.users[0] === socket.pseudo)
        app.db.collection("users").update({username: data.users[1]}, {$addToSet: {unread: data.room}});
      else
        app.db.collection("users").update({username: data.users[0]}, {$addToSet: {unread: data.room}});
      app.db.collection("tchat").insert({room: data.room, msg: xss(data.msg), pseudo: socket.pseudo, date: dateFormat(), time: Date.now()});
      io.sockets.in(data.room).emit('chat message', {pseudo: socket.pseudo, msg: xss(data.msg)});
  });
});

router.post('/messages/loadMore', middleware.loggedIn(), (req, res)=>{
  var currentUser = {username: req.cookies.user.username, photo: req.cookies.user.photo},
      room        = req.body.room,
      lastTime    = req.body.lastTime,
      returnValue = "";
  app.db.collection("tchat").find({room: room, date: {$lt: lastTime}}).sort({$natural: -1}).limit(10).toArray().then((history)=>{
    history.reverse();
    if (history.length > 0)
      for (message of history){
        if (message.pseudo === currentUser.username){
          returnValue = returnValue + "<li class='list-group-item'><strong>"+
                                message.pseudo + " </strong>"+ message.msg +
                                "<span class='badge'>" + message.date + "</span></li>";
        }
        else {
          returnValue = returnValue + "<li class='list-group-item disabled'><strong>"+
                                message.pseudo + " </strong>"+ message.msg +
                                "<span class='badge'>" + message.date + "</span></li>";
        }
      }
      res.send(returnValue);
  });

});

router.post('/checkUnread', middleware.loggedIn(), (req, res)=>{
  var currentUser = {
    username  : req.cookies.user.username,
    _id       : ObjectId(req.cookies.user.hash)
  },
  room = req.body.loc;
  req.app.db.collection("users").update(currentUser, {$pull: {unread: room}});
  req.app.db.collection("users").find(currentUser).limit(1).toArray().then((user)=>{
    if (user[0].unread && user[0].unread.length > 0)
      res.send("unread");
    else
      res.send("Nothing");
  });
});

module.exports = router;
