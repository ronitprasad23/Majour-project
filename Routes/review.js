const express = require("express");
const router = express.Router({mergeParams: true});
const WrapAsync = require("../Utils/WrapAsync");
const ExpressError = require("../Utils/ExpressError");
const Review = require("../Models/review");
const Listing = require("../Models/listening");
const {validateReview, isLoggedIn ,isReviewAuthor} = require("../middleware");
const reviewController = require("../Controllers/reviews");

// Review
// Post Route:
router.post("/",isLoggedIn, validateReview, WrapAsync (reviewController.createReview));

// Delete Route:
router.delete("/:reviewId",isLoggedIn,isReviewAuthor, WrapAsync(reviewController.deleteReview));

module.exports = router;