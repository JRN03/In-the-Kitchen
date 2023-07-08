import express from 'express';
import court from '../models/court.js';
import Court from "../models/court.js"

const router = express.Router()

router.get("/", async (req,res) => {
    const courts = await Court.find();
    res.status(200).send(courts);
});

router.post('/', async (req,res) => {

    const location = req.body.location;
    const name = req.body.name;
    const times = req.body.times ? req.body.times:"N/A";
    const placesID = req.body.placesID;
    const lat = req.body.lat;
    const lon = req.body.lon; 


    const alreadyUploaded = await Court.findOne({placesID: placesID});
    if (alreadyUploaded) return res.status(400).send("Location Already Added");

    const court = new Court({
        location: location,
        name: name,
        times: times,
        placesID: placesID,
        lat:lat,
        lon:lon
    });

    try {
        court.save();
        return res.status(201).send("Court Uploaded");
    } catch (err) {
        return res.status(500).send(serr)
    }

});

export default router