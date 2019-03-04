var express = require('express');
var app = express();
var mongoose = require('mongoose');
const PORT = 3000;
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

var campgrounds = [
		{name: "mountain", image: "https://www.cityofspearfish.com/PRF/Campground/Campground%201scaled.jpg"},
		{name: "plateau", image: "https://www.cityofspearfish.com/PRF/Campground/Campground%201scaled.jpg"},
		{name: "flat", image: "https://www.cityofspearfish.com/PRF/Campground/Campground%201scaled.jpg"},
		{name: "mountain", image: "https://www.cityofspearfish.com/PRF/Campground/Campground%201scaled.jpg"},
		{name: "plateau", image: "https://www.cityofspearfish.com/PRF/Campground/Campground%201scaled.jpg"},
		{name: "flat", image: "https://www.cityofspearfish.com/PRF/Campground/Campground%201scaled.jpg"},
		{name: "mountain", image: "https://www.cityofspearfish.com/PRF/Campground/Campground%201scaled.jpg"},
		{name: "plateau", image: "https://www.cityofspearfish.com/PRF/Campground/Campground%201scaled.jpg"},
		{name: "flat", image: "https://www.cityofspearfish.com/PRF/Campground/Campground%201scaled.jpg"}


	];

mongoose.connect('mongodb://mongo:27017/v1', { useNewUrlParser: true });

app.get('/', function(req, res){
	res.render("landing");
});

app.get('/campgrounds', function(req, res){

	res.render("campgrounds", {campgrounds:campgrounds});
});

app.post("/campgrounds", function(req, res){
	//get data from form & add to campgrounds array
	var name = req.body.name;
	var image = req.body.image;
	var newCampground = {name: name, image: image}
	campgrounds.push(newCampground);
	//redirect back to campground page
	res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req, res){
	res.render("new.ejs");
});

app.listen(PORT, function(){
	console.log("The YelpCamp Server has started!!");
});
