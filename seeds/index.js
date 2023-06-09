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
            title: `${sample(descriptors)} ${sample(names)}`
        });
        await gym.save();
    }
};

seedDB()
    .then(() => {
        mongoose.connection.close();
    });