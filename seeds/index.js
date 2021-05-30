// EXPRESS COMPONENTS
const Campground = require('../models/campground');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const mongoose = require('mongoose');
const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/yelp-camp';
mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected');
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});

    for (let i = 0; i < 200; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '60b41d331d919d257c5c6211',
            geometry: {
                type: 'Point',
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude 
                ]
            },
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis voluptatum atque repellat itaque temporibus voluptate eius quas ullam aliquid cum enim dolore deleniti architecto cumque odit maiores, nobis magnam culpa.',
            price,
            images:  [
                {
                  url: 'https://res.cloudinary.com/dkugclpc4/image/upload/v1622404174/YelpCamp/marzdrctjekgekenaezp.jpg',
                  filename: 'YelpCamp/marzdrctjekgekenaezp'
                },
                {
                  url: 'https://res.cloudinary.com/dkugclpc4/image/upload/v1622404176/YelpCamp/dq5xpi7ynrskil6cjibh.jpg',
                  filename: 'YelpCamp/dq5xpi7ynrskil6cjibh'
                },
                {
                  url: 'https://res.cloudinary.com/dkugclpc4/image/upload/v1622404179/YelpCamp/evgdsnhmr2olp4er9rkw.jpg',
                  filename: 'YelpCamp/evgdsnhmr2olp4er9rkw'
                },
                {
                  url: 'https://res.cloudinary.com/dkugclpc4/image/upload/v1622404182/YelpCamp/mwnnrvet1xpdlatys7od.jpg',
                  filename: 'YelpCamp/mwnnrvet1xpdlatys7od'
                }
              ]
        })
        await camp.save();
    }
};

seedDB().then(() => {
    mongoose.connection.close();
});