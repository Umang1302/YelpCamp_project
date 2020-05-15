var express = require("express");
var app = express();
var bodyParser = require("body-parser");
   var campground =[
       {name:"Mumbai", image:"https://pixabay.com/get/57e1d14a4e52ae14f1dc84609620367d1c3ed9e04e5074417c2f78d39745cd_340.jpg"},
       {name:"Jaipur", image:"https://pixabay.com/get/57e1d14a4e52ae14f1dc84609620367d1c3ed9e04e5074417c2f78d39745cd_340.jpg"},
       {name:"Kashmir",image:"https://pixabay.com/get/57e1d14a4e52ae14f1dc84609620367d1c3ed9e04e5074417c2f78d39745cd_340.jpg"},
       {name:"Mumbai", image:"https://pixabay.com/get/57e1d14a4e52ae14f1dc84609620367d1c3ed9e04e5074417c2f78d39745cd_340.jpg"},
       {name:"Jaipur", image:"https://pixabay.com/get/57e1d14a4e52ae14f1dc84609620367d1c3ed9e04e5074417c2f78d39745cd_340.jpg"},
       {name:"Kashmir",image:"https://pixabay.com/get/57e1d14a4e52ae14f1dc84609620367d1c3ed9e04e5074417c2f78d39745cd_340.jpg"},
       {name:"Mumbai", image:"https://pixabay.com/get/57e1d14a4e52ae14f1dc84609620367d1c3ed9e04e5074417c2f78d39745cd_340.jpg"},
       {name:"Jaipur", image:"https://pixabay.com/get/57e1d14a4e52ae14f1dc84609620367d1c3ed9e04e5074417c2f78d39745cd_340.jpg"},
       {name:"Kashmir",image:"https://pixabay.com/get/57e1d14a4e52ae14f1dc84609620367d1c3ed9e04e5074417c2f78d39745cd_340.jpg"}  
   ]
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));
app.set("view engine","ejs");

app.get("/",function(req,res){
	res.render("landing");
})

app.get("/campgrounds",function(req,res){

   res.render("campground",{campground:campground});
});

app.post("/campgrounds",function(req,res){
	var name = req.body.name;
	var image = req.body.image;
	var newcampground = {name:name, image:image};
	campground.push(newcampground);
   res.redirect("/campgrounds");
});

app.get("/campgrounds/new",function(req,res){
    res.render("new");
});

app.listen(3000,function(){
   console.log("YelpCamp Server is Live!!!!");
});