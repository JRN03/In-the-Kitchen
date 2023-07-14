import express from 'express';
import Court from "../models/court.js"

const router = express.Router()

router.get("/", async (req,res) => {
    const courts = await Court.find();
    console.log(courts);
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
        return res.status(500).send(err)
    }

});

router.put('/:places_id/rating/:score', (req,res)=>{
    var place_id = req.params.places_id;
    var score = req.params.score
    Court.updateOne(
        {placesID:place_id},
        { $push: { rating: score } }
    ).then((court)=>{
        if(court){
            console.log("new",court)
            res.status(201).json(court);
        }
    }).catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
    
})

export default router