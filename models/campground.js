const mongoose = require('mongoose');
const Shcema = mongoose.Schema;

const CampgroundSchema = new Shcema({
    title: String,
    image: String,
    price: Number,
    description: String,
    location: String
})

module.exports = mongoose.model('Campground', CampgroundSchema);