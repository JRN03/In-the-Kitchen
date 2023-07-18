import express from 'express';
import Post from "../models/post.js"

const router = express.Router()

router.post("/",(req,res)=>{
    const user_id = req.body.id;
    const body = req.body.content;
    Post.create({body:body, u_id: user_id}).then((post)=>{
        res.status(200).json(post);
    })
})

export default router;