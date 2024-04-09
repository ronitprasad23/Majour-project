const Listing = require("../Models/listening");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

module.exports.index = async (req,res) => {
    const allListings =  await Listing.find({});
    res.render("listings/index", {allListings});  
};

module.exports.renderNewForm = (req,res) => {
    res.render("listings/new");
};

module.exports.showListing = async (req,res) => {
    let {id} = req.params;
    const listings = await Listing.findById(id).populate({path: "reviews", populate: {path: "author"}}).populate("owner");
    if(!listings) {
        req.flash("error", "Listing you request does not exists!");
        res.redirect("/Listings");
    }
    res.render("listings/show", {listings});
};

module.exports.createListing = async (req,res,next) => {
    let response = await geocodingClient.forwardGeocode({
        query: req.body.listing.location,
        limit: 1,
      })
    .send()  


    let url = req.file.path;
    let filename = req.file.filename;
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = {url, filename};
    newListing.geometry = response.body.features[0].geometry;
    let savelisting = await newListing.save();
    console.log(savelisting);
    req.flash("success", "New Listing Created!");
    res.redirect("/Listings");
};

module.exports.editListing = async (req,res) => {
    let {id} = req.params;
    const listings = await Listing.findById(id);
    if(!listings) {
        req.flash("error", "Listing you request does not exists!");
        res.redirect("/Listings");
    }

    let originalImageurl = listings.image.url;
    originalImageurl = originalImageurl.replace("/upload", "/upload/w_250");
    res.render("listings/edit", {listings, originalImageurl});
};

module.exports.updateListing = async (req, res) => {
    let {id} = req.params;
    let data={...req.body.listing}
    let listing = await Listing.findByIdAndUpdate(id, data);
    if(typeof req.file !== "undefined") {
        let url = req.file.path;
        let filename = req.file.filename; 
        listing.image = {url , filename};
        await listing.save();
    }
    req.flash("success", "listing has been updated!");
    res.redirect(`/Listings/${id}`);
};

module.exports.deleteListing = async (req,res) => {
    let {id} = req.params;
    let deletelisting = await Listing.findByIdAndDelete(id);
    console.log(deletelisting);
    req.flash("success", "Listing has been deleted!");
    res.redirect("/Listings");
};
