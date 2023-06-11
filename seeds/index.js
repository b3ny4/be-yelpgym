import mongoose from 'mongoose';

import cities from './cities.js';
import { descriptors, names } from './seedHelpers.js';

import Gym from '../models/Gym.js';

mongoose.connect('mongodb://localhost:27017/yelpgym');
const db = mongoose.connection;
db.on("error", console.error.bind(console, "database connection error: "));
db.on("open", () => {
    console.log("Mongo database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Gym.deleteMany({});
    for (let i = 0; i < 30; i++) {
        const city = sample(cities);
        const price = Math.floor(Math.random() * 10_000) / 100 + 10;
        const gym = new Gym({
            location: `${city.city}, ${city.state}`,
            title: `${sample(descriptors)} ${sample(names)}`,
            image: "https://source.unsplash.com/collection/10552289",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero harum ipsam odio cupiditate exercitationem explicabo tempora ea inventore earum velit nobis ut rerum numquam nulla quam facere sequi, cum architecto.",
            price
        });
        await gym.save();
    }
};

seedDB()
    .then(() => {
        mongoose.connection.close();
    });