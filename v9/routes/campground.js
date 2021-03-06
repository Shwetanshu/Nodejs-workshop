var express = require('express');
var router = express.Router();
var Campground = require('../models/campground');

//INDEX - show all campgrounds
router.get('/', function (req, res) {
  // Get all campgrounds from DB
  Campground.find({}, function (err, allCampgrounds) {
    if (err) {
      console.log(err);
    }else {
      res.render('campgrounds/index', { campgrounds: allCampgrounds });
    }
  });
});

// Create - Route for posting campgrounds
router.post('/', isLoggedIn, function (req, res) {
  //get data from form & add to campgrounds array
  var name = req.body.name;
  var image = req.body.image;
  var desc = req.body.description;
  var author = {
      id: req.user._id,
      username: req.user.username
  };
  var newCampground = { name: name, image: image, description: desc, author: author };
  Campground.create(newCampground, function (err, newlyCreated) {
    if (err) {
      console.log(err);
    } else {
        res.redirect('/campgrounds');
    }
  });
});

// NEW - Route for forms to add new campgrounds
router.get('/new', isLoggedIn, function (req, res) {
  res.render('campgrounds/new');
});

// SHOW - Route shows more info about one campground.
router.get('/:id', function (req, res) {
  // find campground with provided id
  Campground.findById(req.params.id).populate('comments').exec(function (err, foundCampground) {
    if (err) {
      console.log(err);
    } else {
      // render show template with that campground
      res.render('campgrounds/show', { campground: foundCampground });
    }
  });
});

//middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}

module.exports = router;
