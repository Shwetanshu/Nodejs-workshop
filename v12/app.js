var express = require('express');
var app = express();
var	bodyParser = require('body-parser');
var	mongoose = require('mongoose');
var flash = require('connect-flash');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var methodOverride = require('method-override');
var Campground = require('./models/campground');
var Comment = require('./models/comment');
var User = require('./models/user');

// var seedDB		= require('./seeds');

//requiring ROUTES
var commentRoutes = require('./routes/comments');
var campgroundRoutes = require('./routes/campground');
var indexRoutes = require('./routes/index');
const PORT = 3000;

mongoose.connect('mongodb://mongo:27017/yelp_camp', { useNewUrlParser: true });

// mongoose.connect('mongodb://localhost:27017/yelp_camp');
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(methodOverride('_method'));
app.use(flash());

// seedDB();

//PASSPORT Configuration
app.use(require('express-session')({
  secret: 'Once again Rusty wins cuteset dog!!',
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    next();
  });

app.use('/', indexRoutes);
app.use('/campgrounds/:id/comments', commentRoutes);
app.use('/campgrounds', campgroundRoutes);
app.listen(PORT, function () {
  console.log('The YelpCamp Server has started!!');
});
