express      = require('express'),
router       = express.Router(),
colors       = require('colors'),
app          = express(),
http         = require('http').Server(app),
bodyParser   = require('body-parser'),
cookieParser = require('cookie-parser'),
MongoClient  = require("mongodb").MongoClient,
crypto       = require('crypto'),
xss          = require('xss');

var port         = process.env.PORT || 3030,
    middleware   = require(__dirname + "/functions/middleware.js");

app.use(cookieParser('your secret here'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.set("view engine", "ejs");

MongoClient.connect("mongodb://localhost/matcha", function(error, db) {
    if (error) console.log("\x1b[41m%s\x1b[0m", error)
    else
    {
      app.db = db;
      console.log("Connected to matcha Db".bgGreen.black);
    }
});

app.get('/', (req, res)=>{
    // res.clearCookie("user")
    res.redirect('/home');
});

app.get('/home', middleware.loggedIn(), (req, res)=>{
    res.send('index');
});

///////////////////////EXPRESS ROUTER//////////////////////////////////////
var loginRoute  = require(process.env.PWD + '/routes/login');
    userRoute   = require('./routes/user');

//Login routes (form + post)
app.use('/login', loginRoute);
//User Routes (create, edit, access user)
app.use('/user', userRoute);
///////////////////////EXPRESS ROUTER//////////////////////////////////////

app.get('*', (req, res)=>{
  res.render('404', {title: '404'});
});

http.listen(port, ()=>{
  console.log("server running on port %d".zebra, port);
});
