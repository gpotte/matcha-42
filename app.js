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
xss             = require('xss'),
io              = require('socket.io')(http);
port            = process.env.PORT || 3030,
where           = require('node-where'),
middleware      = require(__dirname + "/functions/middleware.js");

app.use(cookieParser('your secret here'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.set("view engine", "ejs");

///GEOLOCATIN MIDDLEWARE///
app.use(function(req, res, next) {
  where.is((req.headers['x-forwarded-for'] || '').split(',')[0], function(err, result) {
    req.geoip = result;
    next();
  });
});
///GEOLOCATIN MIDDLEWARE///

MongoClient.connect("mongodb://localhost/matcha", function(error, db) {
    if (error) console.log("\x1b[41m%s\x1b[0m", error)
    else
    {
      app.db = db;
      console.log("Connected to matcha Db".bgGreen.black);
    }
});

app.get('/', (req, res)=>{
    console.log(req.geoip);
    console.log((req.headers['x-forwarded-for'] || '').split(',')[0]);
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
    msgRoute    = require(process.env.PWD + '/routes/messages');

//LOGIN ROUTES (form + post + lost password)
app.use('/', loginRoute);
//USER ROUTES (create, edit, access user)
app.use('/', userRoute);
//MESSAGE ROUTES
app.use('/', msgRoute);
///////////////////////EXPRESS ROUTER//////////////////////////////////////

app.get('*', (req, res)=>{
  res.render('404', {title: '404'});
});

io.on('connection', (socket)=>{
  socket.on('user', (name)=>{
    socket.pseudo = name;
  });
  socket.on('chat message', (msg)=>{
      io.emit('chat message', {pseudo: socket.pseudo, msg: msg})
  });
});

http.listen(port, ()=>{
  console.log("server running on port %d".zebra, port);
});
