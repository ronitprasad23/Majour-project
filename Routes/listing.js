const express = require("express");
const router = express.Router();
const WrapAsync = require("../Utils/WrapAsync");
const Listing = require("../Models/listening");
const {isLoggedIn, isOwner, validateListing} = require("../middleware");
const listingController = require("../Controllers/listings");
const multer  = require('multer');
const {storage} = require("../cloudConfig");
const upload = multer({ storage });

router.route("/").get(WrapAsync(listingController.index)).post(isLoggedIn,upload.single('listing[image]'),validateListing, WrapAsync(listingController.createListing));


//New Route:
router.get("/new",isLoggedIn, listingController.renderNewForm);


router.route("/:id").get(WrapAsync(listingController.showListing)).put(isLoggedIn, isOwner,upload.single('listing[image]'),validateListing, WrapAsync(listingController.updateListing)).delete(isLoggedIn, isOwner, WrapAsync(listingController.deleteListing));




//Edit Route:
router.get("/:id/edit",isLoggedIn, isOwner, WrapAsync(listingController.editListing));


module.exports = router;
