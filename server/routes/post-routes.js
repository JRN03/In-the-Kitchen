import express from 'express';
import Post from "../models/post.js";
import User from "../models/user.js";
import verify from "../verify.js";

const router = express.Router()

router.post("/", verify, async (req,res)=>{

    const id = req.id;
    const body = req.body.body;
    const user = await User.findOne({_id: id});
    if (!user) return res.status(400).send({message: "Failed to upload post"});
    const date = req.body.date;
    const username = user.username;
    const images = req.body.images;
    //for each in req.body.images save image with new name 
    const imageNames = []

    const resources = path.join(__dirname, "resources");

    const files = fs.readdirSync(resources);
    const numFiles = files.length;
    
    const writeFilePromises = images.map(async (image, index) => {
        
        const base64Data = image.data;
        const fileExtension = "jpg";
        const filename = `posts_image-${numFiles + index + 1}.${fileExtension}`;
        const filePath = path.join(resources, filename);
    
        await fs.promises.writeFile(filePath, base64Data, { encoding: "base64" });
        imageNames.push(filename);

    });
    
    try {
      await Promise.all(writeFilePromises);

      const post = new Post({
        body: body,
        date: date,
        u_id: username,
        images: imageNames,
      });

      await post.save();
      return res.status(201).send({ message: "Post Uploaded" });

    } catch (err) {
      return res.status(500).send({ message: "An error occured while posting." });
    }
})

router.get("/",verify, async(req,res) => {
    const user = await User.findOne({_id:req.id});
    const posts = await Post.find();
    const filteredPosts = posts.filter(post => user.friends.includes(post.u_id));
    res.status(200).send({message:"Success",posts: filteredPosts});
});

export default router;