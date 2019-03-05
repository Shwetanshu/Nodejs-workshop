var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var bodyParser = require('body-parser');
var User = require('./models/user');
var LocalStrategy = require('passport-local');
var passportLocalMongoose = require('passport-local-mongoose');

//mongoose.connect('mongodb://localhost:27017/auth_demo_app', { useNewUrlParser: true });

mongoose.connect('mongodb://mongo:27017/auth_demo_app', { useNewUrlParser: true });
var app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(require('express-session')({
    secret: 'This is most secret string!',
    resave: false,
    saveUninitialized: false,
  }));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//===========
// ROUTES
//===========
app.get('/', function (req, res) {
    res.render('home');
  });

app.get('/secret', isLoggedIn, function (req, res) {
    res.render('secret');
  });

//AUTH ROUTES
// show signup form
app.get('/register', function (req, res) {
  res.render('register');
});

//handeling User SIGNUP
app.post('/register', function (req, res) {
  req.body.username;
  req.body.password;
  User.register(new User({ username: req.body.username }), req.body.password, function (err, user) {
    if (err) {
      console.log(err);
      res.render('register');
    }

    passport.authenticate('local')(req, res, function () {
      res.redirect('/secret');
    });
  });
});

//LOGIN ROUTES
app.get('/login', function (req, res) {
  res.render('login');
});

//Login Logic
//middle ware
app.post('/login', passport.authenticate('local', {
  successRedirect: '/secret',
  failureRedirect: '/login',
}), function (req, res) {
  });

app.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
  res.send('THIS IS THE LOGOUT PAGE');
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect('/login');
}

app.listen(3000, function (req, res) {
    console.log('Server is listening on Port 3000!!');
  });
