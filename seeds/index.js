const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            title: `${sample(descriptors)} ${sample(places)}`,
            image: 'https://source.unsplash.com/collection/483251',
            price: price,
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Excepturi repudiandae odit nemo, ea fuga laboriosam fugiat molestias quidem, dolor saepe pariatur. Obcaecati sint fuga, odit tenetur accusantium placeat dolores animi?'

        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})