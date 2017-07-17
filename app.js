methodOverride  = require('method-override'),
express         = require('express'),
router          = express.Router(),
colors          = require('colors'),
app             = express(),
http            = require('http').Server(app),
bodyParser      = require('body-parser'),
cookieParser    = require('cookie-parser'),
MongoClient     = require("mongodb").MongoClient,
crypto          = require('crypto'),
xss             = require('xss')
port         = process.env.PORT || 3030,
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
    res.render('index', {title: "home", user: req.cookies.user});
});

app.get('/logout', (req, res)=>{
  res.clearCookie("user");
  res.redirect("/");
});

///////////////////////EXPRESS ROUTER//////////////////////////////////////
var loginRoute  = require(process.env.PWD + '/routes/login'),
    userRoute   = require(process.env.PWD + '/routes/user'),
    msgRoute    = require('./routes/messages');

//LOGIN ROUTES (form + post + lost password)
app.use('/login', loginRoute);
//USER ROUTES (create, edit, access user)
app.use('/user', userRoute);
//MESSAGE ROUTES
app.use('/msg', msgRoute);
///////////////////////EXPRESS ROUTER//////////////////////////////////////

app.get('*', (req, res)=>{
  res.render('404', {title: '404'});
});

http.listen(port, ()=>{
  console.log("server running on port %d".zebra, port);
});