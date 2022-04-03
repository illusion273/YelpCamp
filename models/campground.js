const mongoose = require('mongoose');
const Shcema = mongoose.Schema;

const CampgroundSchema = new Shcema({
    title: String,
    price: String,
    description: String,
    location: String
})

module.exports = mongoose.model('Campground', CampgroundSchema);