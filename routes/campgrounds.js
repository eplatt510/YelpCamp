var express = require("express");
var router = express.Router();

var Campground = require("../models/campground");

//INDEX - show all campgrounds
router.get("/campgrounds", function(req, res){
    var time = new Date();
    console.log("=======================");
    console.log("Logged in at " + time.toLocaleString('en-US', { hour: 'numeric',minute:'numeric', hour12: true }));
    console.log(req.user);
    console.log("=======================");
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
    } else {
          res.render("campgrounds/index", {campgrounds: allCampgrounds});
    }
    });
        
       
});


router.post("/campgrounds", function(req, res){
    // get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = {name: name, image: image, description: desc};
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }
    });
});

router.get("/campgrounds/new", function(req, res){
   res.render("campgrounds/new"); 
});

//SHOW - shows more info about one campground
router.get("/campgrounds/:id", function(req, res){
    //find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            console.log(foundCampground);
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

module.exports = router;
