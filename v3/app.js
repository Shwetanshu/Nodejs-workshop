var express 		= require('express'),
		app 				= express(),
		bodyParser 	= require('body-parser'),
		mongoose 		= require('mongoose'),
		Campground 	= require('./models/campground'),
		seedDB			= require('./seeds');
const PORT = 3000;


mongoose.connect('mongodb://mongo:27017/yelp_camp', { useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
seedDB();

app.get('/', function(req, res){
	res.render("landing");
});

// GET Route for showing campgrounds
app.get('/campgrounds', function(req, res){
	// Get all campgrounds from DB
	Campground.find({}, function(err, allCampgrounds){
		if(err){
			console.log(err);
		} else{
			res.render("index",{campgrounds:allCampgrounds});
		}
	});
	// res.render("campgrounds", {campgrounds:campgrounds});
});

// POST - Route for posting campgrounds

app.post("/campgrounds", function(req, res){
	//get data from form & add to campgrounds array
	var name = req.body.name;
	var image = req.body.image;
	var desc = req.body.description;
	var newCampground = {name: name, image: image, description: desc}
	Campground.create(newCampground, function(err, newlyCreted){
			if(err){
				console.log(err);
			}else{
				res.redirect("/campgrounds");
			}
	});
	//redirect back to campground page
	// res.redirect("/campgrounds");
});

// NEW - Route for forms to add new campgrounds
app.get("/campgrounds/new", function(req, res){
	res.render("new.ejs");
});

// SHOW - Route shows more info about one campground.
app.get("/campgrounds/:id", function(req, res){
	// find campground with provided id
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
		if(err){
			console.log(err);
		}else{
			// render show template with that campground
			res.render("show", {campground: foundCampground});
		}
	});
});

app.listen(PORT, function(){
	console.log("The YelpCamp Server has started!!");
});
