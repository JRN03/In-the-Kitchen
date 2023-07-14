import express from 'express';
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
        return res.status(500).send(err)
    }

});

router.put('/:places_id', (req,res)=>{
    var place_id = req.params.places_id;
    console.log(place_id);
    res.status(201).json({'message':"success"});
    // Court.findOneAndUpdate(
    //     {placesID:place_id},
    //     { $addToSet: { rating: req.body.rating } }
    // ).then((court)=>{
    //     if(court){
    //         res.status(201).json(court);
    //     }
    // }).catch((err) => {
    //     console.log(err);
    //     res.status(500).json(err);
    // });
    
})

export default router