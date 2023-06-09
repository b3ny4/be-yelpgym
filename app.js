// import dependencies
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';

// import database models
import Gym from './models/Gym.js';

// set up app
const app = express();

const corsOptions = {
    origin: "http://localhost:3000"
};

app.use(cors(corsOptions));
app.use(bodyParser.json())

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
});

app.post("/gyms", async (req, res) => {
    const gym = new Gym(req.body);
    await gym.save();
    res.send(gym._id);
});

app.get("/gyms/:id", async (req, res) => {
    const gym = await Gym.findById(req.params.id);
    res.send(gym);
});

app.put("/gyms/:id", async (req, res) => {
    const gym = await Gym.findByIdAndUpdate(req.params.id, req.body);
    res.send(gym._id);
});

app.delete("/gyms/:id", async (req, res) => {
    const gym = await Gym.findByIdAndDelete(req.params.id);
    res.send("ok");
});

app.listen(3001, () => {
    console.log('listening on port 3001 ...');
});