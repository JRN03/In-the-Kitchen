import express from 'express';
import User from "../models/user.js"
import bcrypt from 'bcryptjs'

const router = express.Router()

router.post('/register', async (req,res) => {
    
    //validation
    /*
    const {error} = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    */

    //check user in database
    const userExists = await User.find({email:req.body.username});
    if(userExists) return res.status(404).send("Username is Taken");

    //Password Hashing
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        username: req.body.username,
        fName: req.body.fName,
        lName: req.body.lName,
        password: hashPassword
    });

    try {
        user.save(); //saves to database
        return res.status(200).send({user: user._id});
    }catch(err) {
        return res.status(500).send(err);
    }

});

router.post('/login',async (req,res) => {

    const user = await User.findOne({"username":req.body.username});
    if(!user) return res.status(404).send("Username Not Found");
    
    const validPassword = await bcrypt.compare(req.body.password,user.password);
    if(!validPassword) return res.status(404).send("Invalid Password");

    res.status(200).send("Login Successful");

});
export default router