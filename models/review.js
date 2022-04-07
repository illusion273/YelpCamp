const mongoose = require('mongoose');
const Shcema = mongoose.Schema;

const reviewSchema = new Shcema({
    body: String,
    rating: Number
})

module.exports = mongoose.model('Review', reviewSchema);