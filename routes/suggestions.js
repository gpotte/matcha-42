router.post('/suggestion', (req, res)=>{
  var currentUser = {username: req.cookies.user.username};
  app.db.collection("users").find(currentUser).toArray().then((user)=>{
    if (user[0].tags === undefined)
      res.send("missing tags");
    else {
///////////SEARCH FOR THE BISEXUALS USERS///////////////////
      if (user[0].pref === 'bi'){
        if (user[0].sex === "male"){
          app.db.collection("users").find({sex: "female", pref: {$in: ["hetero", "bi"]}, localisation: user[0].localisation,
                                          username: {$ne: user[0].username}, tags: {$in: user[0].tags}, 'like.name': {$ne: user[0].username},
                                          blocked: {$ne: user[0].username}}).sort({fame: -1}).toArray().then((result)=>{
          app.db.collection("users").find({sex: "male", pref: {$in: ["homo", "bi"]}, localisation: user[0].localisation,
                                          username: {$ne: user[0].username}, tags: {$in: user[0].tags}, 'like.name': {$ne: user[0].username},
                                          blocked: {$ne: user[0].username}}).sort({fame: -1}).toArray().then((result2)=>{
          result = result.concat(result2);
          if (result.length < 1)
            res.send("no results");
          else
            res.send(result);
            });
          });
        }
        else {
          app.db.collection("users").find({sex: "male", pref: {$in: ["hetero", "bi"]}, localisation: user[0].localisation,
                                      username: {$ne: user[0].username}, tags: {$in: user[0].tags}, 'like.name': {$ne: user[0].username},
                                      blocked: {$ne: user[0].username}}).sort({fame: -1}).toArray().then((result)=>{
          app.db.collection("users").find({sex: "female", pref: {$in: ["homo", "bi"]}, localisation: user[0].localisation,
                                      username: {$ne: user[0].username}, tags: {$in: user[0].tags}, 'like.name': {$ne: user[0].username},
                                      blocked: {$ne: user[0].username}}).sort({fame: -1}).toArray().then((result2)=>{
          result = result.concat(result2);
          if (result.length < 1)
            res.send("no results");
          else
            res.send(result);
          });
        });
      }
    }
///////////SEARCH FOR THE BISEXUALS USERS///////////////////
///////////SEARCH FOR THE MANS///////////////////
      else if (user[0].sex === "male"){
        if (user[0].pref === "hetero") {
          app.db.collection("users").find({sex: "female", pref: {$in: ["hetero", "bi"]}, localisation: user[0].localisation,
                                          username: {$ne: user[0].username}, tags: {$in: user[0].tags}, 'like.name': {$ne: user[0].username},
                                          blocked: {$ne: user[0].username}}).sort({fame: -1}).toArray().then((result)=>{
            if (result.length < 1)
              res.send("no results");
            else
              res.send(result);
          });
        }
        else if (user[0].pref === "homo") {
          app.db.collection("users").find({sex: "male", pref: {$in: ["homo", "bi"]}, localisation: user[0].localisation,
                                          username: {$ne: user[0].username}, tags: {$in: user[0].tags}, 'like.name': {$ne: user[0].username},
                                          blocked: {$ne: user[0].username}}).sort({fame: -1}).toArray().then((result)=>{
            if (result.length < 1)
              res.send("no results");
            else
              res.send(result);
          });
        }
      }
///////////SEARCH FOR THE MANS///////////////////
///////////SEARCH FOR THE WOMANS///////////////////
      else {
        if (user[0].pref === "hetero") {
          app.db.collection("users").find({sex: "male", pref: {$in: ["hetero", "bi"]}, localisation: user[0].localisation,
                                          username: {$ne: user[0].username}, tags: {$in: user[0].tags}, 'like.name': {$ne: user[0].username},
                                          blocked: {$ne: user[0].username}}).sort({fame: -1}).toArray().then((result)=>{
            if (result.length < 1)
              res.send("no results");
            else
              res.send(result);
          });
        }
        else if (user[0].pref === "homo") {
          app.db.collection("users").find({sex: "female", pref: {$in: ["homo", "bi"]}, localisation: user[0].localisation,
                                          username: {$ne: user[0].username}, tags: {$in: user[0].tags}, 'like.name': {$ne: user[0].username},
                                          blocked: {$ne: user[0].username}}).sort({fame: -1}).toArray().then((result)=>{
            if (result.length < 1)
              res.send("no results");
            else
              res.send(result);
          });
        }
      }
///////////SEARCH FOR THE WOMANS///////////////////
    }
  });
});

module.exports = router;
