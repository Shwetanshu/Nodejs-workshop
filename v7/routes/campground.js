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
router.post('/', function (req, res) {
  //get data from form & add to campgrounds array
  var name = req.body.name;
  var image = req.body.image;
  var desc = req.body.description;
  var newCampground = { name: name, image: image, description: desc };
  Campground.create(newCampground, function (err, newlyCreted) {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/campgrounds');
    }
  });
});

// NEW - Route for forms to add new campgrounds
router.get('/new', function (req, res) {
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

module.exports = router;
