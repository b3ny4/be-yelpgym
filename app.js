// import dependencies
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

// import database models
import Gym from './models/Gym.js';

// set up app
const app = express();

const corsOptions = {
    origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

mongoose.connect('mongodb://localhost:27017/yelpgym');
const db = mongoose.connection;
db.on("error", console.error.bind(console, "database connection error: "));
db.on("open", () => {
    console.log("Mongo database connected");
});


app.get("/", (req, res) => {
    res.send("express app is answering.");
});

app.get("/gyms", async (req, res) => {
    const gyms = await Gym.find({});
    res.send({ gyms });
})

app.listen(3001, () => {
    console.log('listening on port 3001 ...');
});