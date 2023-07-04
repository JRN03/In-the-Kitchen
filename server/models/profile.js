import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    profileImage: {     // profile image will default to a default style pfp. for now, leave as is
        type: String,
        // default: 'default photo',
    },
    bio: {              // bio will be required so that user has to put something about themselves
        type: String,
        required: true,
    }

});

export default mongoose.model('User',userSchema);