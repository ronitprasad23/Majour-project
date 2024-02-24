const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./Models/listening");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

const MONGO_DB = "mongodb://127.0.0.1:27017/VacationVilla";

main().then(() =>{
    console.log("connected to Database");
}).catch((err) => {
    console.log(err);
});

async function main() {
    await mongoose.connect(MONGO_DB);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname,"views"));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname,"/Public")));

app.get("/", (req,res)=> {
    res.send("Hii i am root");
})

//Index Route:
app.get("/Listings", async (req,res) => {
    const allListings =  await Listing.find({});
    res.render("listings/index", {allListings});  
});

//New Route:
app.get("/Listings/new", (req,res) => {
    res.render("listings/new");
})


//Show Route:
app.get("/Listings/:id", async (req,res) => {
    let {id} = req.params;
    const listings = await Listing.findById(id);
    res.render("listings/show", {listings});
});

//Create Route:
app.post("/Listings", async (req,res) => {
    const newlisting = new Listing(req.body.listing);
    await newlisting.save();
    res.redirect("/Listings");
})

//Edit Route:
app.get("/Listings/:id/edit", async (req,res) => {
    let {id} = req.params;
    const listings = await Listing.findById(id);
    res.render("listings/edit", {listings});
})

//update Route:
app.put("/Listings/:id", async (req,res) => {
    let {id} = req.params;
    let url = req.body.listing.image;
    let filename = "random";
    req.body.listing.image = {url,filename};
    await Listing.findByIdAndUpdate(id, {...req.body.listing});
    res.redirect(`/Listings/${id}`);
});

//delete Route:
app.delete("/Listings/:id", async (req,res) => {
    let {id} = req.params;
    let deletelisting = await Listing.findByIdAndDelete(id);
    console.log(deletelisting);
    res.redirect("/Listings");
})


// app.get("/testlisting", async (req,res) => {
//     let sampleListing = new Listing({
//         title: "Hill view villa",
//         description: "Buy this amazing villa for your fun",
//         price: 2000,
//         location: "Mount Abu, Rajasthan",
//         country: "India"
//     }); 

//     await sampleListing.save();
//     console.log("Sample has been saved");
//     res.send("Successfully Done");
// })

app.listen(8080,() => {
    console.log("Server is listening to port 8080");
})
