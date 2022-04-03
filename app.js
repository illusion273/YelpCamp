const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const Campground = require('./models/campground');
const methodOverride = require('method-override');

dbConnect()
async function dbConnect() {
    try {
        await mongoose.connect('mongodb://localhost:27017/yelp-camp');
        console.log("Mongo Connection Open")
    } catch (e) {
        console.log("Mongo Connection Error")
    }
}

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.get('/', (req, res) => {
    res.render('home');
})

app.get('/campgrounds', async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', { campgrounds });
})

app.get('/campgrounds/new', async (req, res) => {
    res.render('campgrounds/new');
});

app.get('/campgrounds/:id', async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    res.render('campgrounds/show', { campground });
});

app.get('/campgrounds/:id/edit', async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    res.render('C:\\Users\\Kostas\\Desktop\\YelpCamp\\views\\campgrounds\\edit.ejs', { campground });
});

app.post('/campgrounds', async (req, res) => {
    const campground = new Campground(req.body.params);
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`);
});

app.listen(3000, () => {
    console.log('Listening on port 3000')
});