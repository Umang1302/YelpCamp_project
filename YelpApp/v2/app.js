var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/yelp_camp', {useNewUrlParser: true, useUnifiedTopology: true});

//SCHEMA SETUP

   var campgroundSchema = new mongoose.Schema({
      name: String,
      image: String,
      discription:String
   });

   var Campground = mongoose.model("Campground", campgroundSchema);

   Campground.create(
   {
      name:"Raipur",
      image:"https://pixabay.com/get/57e1d14a4e52ae14f1dc84609620367d1c3ed9e04e5074417c2f78d39745cd_340.jpg",
      discription:"This is a huge Place.U WILL love to visit it"
   }, function(err, campground){
         if(err){
          console.log("err");
         }else{
          console.log("newly created");
          console.log(campground);
         }
   });


   // var campground =[
   //     {name:"Mumbai", image:"https://pixabay.com/get/57e1d14a4e52ae14f1dc84609620367d1c3ed9e04e5074417c2f78d39745cd_340.jpg"},
   //     {name:"Jaipur", image:"https://pixabay.com/get/57e1d14a4e52ae14f1dc84609620367d1c3ed9e04e5074417c2f78d39745cd_340.jpg"},
   //     {name:"Kashmir",image:"https://pixabay.com/get/57e1d14a4e52ae14f1dc84609620367d1c3ed9e04e5074417c2f78d39745cd_340.jpg"},
   //     {name:"Mumbai", image:"https://pixabay.com/get/57e1d14a4e52ae14f1dc84609620367d1c3ed9e04e5074417c2f78d39745cd_340.jpg"},
   //     {name:"Jaipur", image:"https://pixabay.com/get/57e1d14a4e52ae14f1dc84609620367d1c3ed9e04e5074417c2f78d39745cd_340.jpg"},
   //     {name:"Kashmir",image:"https://pixabay.com/get/57e1d14a4e52ae14f1dc84609620367d1c3ed9e04e5074417c2f78d39745cd_340.jpg"},
   //     {name:"Mumbai", image:"https://pixabay.com/get/57e1d14a4e52ae14f1dc84609620367d1c3ed9e04e5074417c2f78d39745cd_340.jpg"},
   //     {name:"Jaipur", image:"https://pixabay.com/get/57e1d14a4e52ae14f1dc84609620367d1c3ed9e04e5074417c2f78d39745cd_340.jpg"},
   //     {name:"Kashmir",image:"https://pixabay.com/get/57e1d14a4e52ae14f1dc84609620367d1c3ed9e04e5074417c2f78d39745cd_340.jpg"}  
   // ]


app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));
app.set("view engine","ejs");

app.get("/",function(req,res){
	res.render("landing");
})

app.get("/campgrounds",function(req,res){
  Campground.find({},function(err,allcampgrounds){
      if (err) {
           console.log(err);
      }else{
        res.render("index",{campground:allcampgrounds});
      }
   });
});

app.post("/campgrounds",function(req,res){
	var name = req.body.name;
	var image = req.body.image;
  var desc = req.body.discription;
	var newcampground = {name:name, image:image, discription:desc};
	  Campground.create(newcampground, function(err,newcreated){
      if (err) {
        console.log(err);
      }else{
         res.redirect("/campgrounds");
      }
    });
});

app.get("/campgrounds/new",function(req,res){
    res.render("new");
});

app.get("/campgrounds/:id",function(req,res){
    Campground.findById(req.params.id, function(err,foundCampground){
        if (err) {
          console.log(err);
        }else{
           res.render("show",{campground:foundCampground});
        }
    });
  
});

app.listen(3000,function(){
   console.log("YelpCamp Server is Live!!!!");
});