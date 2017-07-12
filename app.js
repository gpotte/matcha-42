var express      = require('express'),
    colors       = require(process.env.PWD + '/colors.js'),
    app          = express(),
    http         = require('http').Server(app),
    bodyParser   = require('body-parser'),
    cookieParser = require('cookie-parser'),
    MongoClient  = require("mongodb").MongoClient,
    crypto       = require('crypto');

var port         = process.env.PORT || 3030,
    middleware   = require(__dirname + "/functions/middleware.js");

app.use(cookieParser('your secret here'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.set("view engine", "ejs");

MongoClient.connect("mongodb://localhost/matcha", function(error, result) {
    if (error) console.log("\x1b[41m%s\x1b[0m", error)
    else
    {
      app.db = result;
      console.log("%s%sConnected to matcha Db%s", colors.BgGreen, colors.Bright, colors.Reset);
    }
});

app.get('/', (req, res)=>{
    // app.db.collection("users").insert({username: "gpotte"}, (err, result)=>{console.log(result)});
    // res.cookie("user", {username: "gpotte", hash: "5964ad5fb00c453443faea43"});
    // res.clearCookie("user")
    res.redirect('/home');
});

app.get('/home', middleware.loggedIn(), (req, res)=>{
    res.send('index');
});

//EXPRESS ROUTER
var loginRoute  = require(process.env.PWD + '/routes/login');
    //userRoute   = require('./routes/user');

//Login routes (form + post)
app.use('/login', loginRoute);
//User Routes (create, edit, access user)
//app.use('/user', userRoute);

http.listen(port, ()=>{
  console.log("server running on port %d", port);
});
