const mongoose = require("mongoose");
const Schema =  mongoose.Schema;

const listingSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    image: {
        url: {
            type: String,
            required: true, // Making url optional
        },
        filename: {
            type: String,
            required: true, // Making filename optional
        },
    },
    price: Number,
    location: String,
    country: String
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;