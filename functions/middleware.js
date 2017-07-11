var exports = module.exports = {};
var ObjectId = require('mongodb').ObjectID;

exports.loggedIn = function(){
  return function(req, res, next){
    var user = req.cookies.user;
    if (user && user.username && user.hash)
    {
          var logCheck = req.app.db.collection("users").find({ _id: ObjectId(user.hash), username: user.username}, {"_id": 1}).limit(1);
          logCheck.toArray().then((logCheck)=>{
            if (logCheck.length > 0)
              next();
            else
              res.redirect('/login');
          });
    }
    else
      res.redirect('/login');
  }
}
