import mongoose from 'mongoose'

const courtsSchema = new mongoose.Schema({
    name: {     // name of location -- type string & required
        type: String,
        required: true,
    },
    location: { // location for google -- type string & required
        type: String,
        required: true,
    },
    rating: {   // ratings -- type number & will default to 0/5 stars if 0 ratings
        type: Number,
        default: 0
    },
    times: {    // meeting times for events -- type string & will just default to "N/A"
        type: String
    },
    placesID: {
        type: String,
        required: true
    }

});

export default mongoose.model('Court',courtsSchema);