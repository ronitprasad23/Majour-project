const Listing = require("../Models/listening");
const Review = require("../Models/review");

module.exports.createReview = async(req,res) => {
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    listing.reviews.push(newReview);   
    await newReview.save();
    await listing.save();
    req.flash("success", "New Review Created!");
    res.redirect(`/Listings/${listing._id}`);   
};

module.exports.deleteReview = async (req,res) => {
    let {id, reviewId} = req.params;
    await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Review has been deleted!");
    res.redirect(`/Listings/${id}`);
};