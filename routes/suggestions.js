router.post('/suggestion', (req, res)=>{
  var currentUser = {username: req.cookies.user.username},
      sort        = req.body.sort,
      age         = [],
      fame        = [];
  age[0] = req.body.minAge === "" ? 0 : parseInt(req.body.minAge);
  age[1] = req.body.maxAge === "" ? 250 : parseInt(req.body.maxAge);
  fame[0] = req.body.minFame === "" ? 0 : parseInt(req.body.minFame);
  fame[1] = req.body.maxFame === "" ? 1000 : parseInt(req.body.maxFame);

  app.db.collection("users").find(currentUser).toArray().then((user)=>{
    if (req.body.tag !== ""){
      req.app.db.collection("tags").find({tag: req.body.tag}).limit(1).toArray().then((tag)=>{
        if (tag.length > 0)
          user[0].tags = [{id: tag[0]._id, tag: tag[0].tag}];
      });
    }
    user[0].localisation = req.body.location === "" ? user[0].localisation : req.body.location;
    if (user[0].tags === undefined)
      res.send("missing tags");
    else {
///////////SEARCH FOR THE BISEXUALS USERS///////////////////
      if (user[0].pref === 'bi'){
        if (user[0].sex === "male"){
          app.db.collection("users").find({sex: "female", pref: {$in: ["hetero", "bi"]}, localisation: user[0].localisation, age: {$gte: age[0], $lte: age[1]},
                                          fame: {$gte: fame[0], $lte: fame[1]}, username: {$ne: user[0].username}, tags: {$in: user[0].tags}, 'like.name': {$ne: user[0].username},
                                          blocked: {$ne: user[0].username}}).sort({fame: -1}).toArray().then((result)=>{
          app.db.collection("users").find({sex: "male", pref: {$in: ["homo", "bi"]}, localisation: user[0].localisation, age: {$gte: age[0], $lte: age[1]},
                                          fame: {$gte: fame[0], $lte: fame[1]}, username: {$ne: user[0].username}, tags: {$in: user[0].tags}, 'like.name': {$ne: user[0].username},
                                          blocked: {$ne: user[0].username}}).sort({fame: -1}).toArray().then((result2)=>{
          result = result.concat(result2);
          if (result.length < 1)
            res.send("no results");
            else
            {
              if (sort === "age")
                result.sort((a, b)=>{return a.age- b.age });
              res.send(result);
            }
            });
          });
        }
        else {
          app.db.collection("users").find({sex: "male", pref: {$in: ["hetero", "bi"]}, localisation: user[0].localisation, age: {$gte: age[0], $lte: age[1]},
                                      fame: {$gte: fame[0], $lte: fame[1]}, username: {$ne: user[0].username}, tags: {$in: user[0].tags}, 'like.name': {$ne: user[0].username},
                                      blocked: {$ne: user[0].username}}).sort({fame: -1}).toArray().then((result)=>{
          app.db.collection("users").find({sex: "female", pref: {$in: ["homo", "bi"]}, localisation: user[0].localisation, age: {$gte: age[0], $lte: age[1]},
                                      fame: {$gte: fame[0], $lte: fame[1]}, username: {$ne: user[0].username}, tags: {$in: user[0].tags}, 'like.name': {$ne: user[0].username},
                                      blocked: {$ne: user[0].username}}).sort({fame: -1}).toArray().then((result2)=>{
          result = result.concat(result2);
          if (result.length < 1)
            res.send("no results");
            else
            {
              if (sort === "age")
                result.sort((a, b)=>{return a.age- b.age });
              res.send(result);
            }
          });
        });
      }
    }
///////////SEARCH FOR THE BISEXUALS USERS///////////////////
///////////SEARCH FOR THE MANS///////////////////
      else if (user[0].sex === "male"){
        if (user[0].pref === "hetero") {
          app.db.collection("users").find({sex: "female", pref: {$in: ["hetero", "bi"]}, localisation: user[0].localisation, age: {$gte: age[0], $lte: age[1]},
                                          fame: {$gte: fame[0], $lte: fame[1]}, username: {$ne: user[0].username}, tags: {$in: user[0].tags}, 'like.name': {$ne: user[0].username},
                                          blocked: {$ne: user[0].username}}).sort({fame: -1}).toArray().then((result)=>{
            if (result.length < 1)
              res.send("no results");
              else
              {
                if (sort === "age")
                  result.sort((a, b)=>{return a.age- b.age });
                res.send(result);
              }
          });
        }
        else if (user[0].pref === "homo") {
          app.db.collection("users").find({sex: "male", pref: {$in: ["homo", "bi"]}, localisation: user[0].localisation, age: {$gte: age[0], $lte: age[1]},
                                          fame: {$gte: fame[0], $lte: fame[1]}, username: {$ne: user[0].username}, tags: {$in: user[0].tags}, 'like.name': {$ne: user[0].username},
                                          blocked: {$ne: user[0].username}}).sort({fame: -1}).toArray().then((result)=>{
            if (result.length < 1)
              res.send("no results");
              else
              {
                if (sort === "age")
                  result.sort((a, b)=>{return a.age- b.age });
                res.send(result);
              }
          });
        }
      }
///////////SEARCH FOR THE MANS///////////////////
///////////SEARCH FOR THE WOMANS///////////////////
      else {
        if (user[0].pref === "hetero") {
          app.db.collection("users").find({sex: "male", pref: {$in: ["hetero", "bi"]}, localisation: user[0].localisation, age: {$gte: age[0], $lte: age[1]},
                                          fame: {$gte: fame[0], $lte: fame[1]}, username: {$ne: user[0].username}, tags: {$in: user[0].tags}, 'like.name': {$ne: user[0].username},
                                          blocked: {$ne: user[0].username}}).sort({fame: -1}).toArray().then((result)=>{
            if (result.length < 1)
              res.send("no results");
              else
              {
                if (sort === "age")
                  result.sort((a, b)=>{return a.age - b.age });
                res.send(result);
              }
          });
        }
        else if (user[0].pref === "homo") {
          app.db.collection("users").find({sex: "female", pref: {$in: ["homo", "bi"]}, localisation: user[0].localisation, age: {$gte: age[0], $lte: age[1]},
                                          fame: {$gte: fame[0], $lte: fame[1]}, username: {$ne: user[0].username}, tags: {$in: user[0].tags}, 'like.name': {$ne: user[0].username},
                                          blocked: {$ne: user[0].username}}).sort({fame: -1}).toArray().then((result)=>{
            if (result.length < 1)
              res.send("no results");
            else
            {
              if (sort === "age")
                result.sort((a, b)=>{return a.age - b.age });
              res.send(result);
            }
          });
        }
      }
///////////SEARCH FOR THE WOMANS///////////////////
    }
  });
});

router.post('/getTag', (req, res)=>{
  req.app.db.collection("tags").find({tag: req.body.tag}).limit(1).toArray().then((tag)=>{
    if (tag.length > 0)
      res.send(tag[0]._id);
    else
      res.send("Error");
  });
});
module.exports = router;
