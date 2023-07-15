import express from "express";
import User from "../models/user.js";
import verify from "../verify.js";
import path from "path";
import fs from "fs";

const router = express.Router();

import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

router.get("/", verify, async (req, res) => {
  const id = req.id;
  const user = await User.findOne({ _id: id });
  if (user) {
    const imagePath = path.join(__dirname, "resources", user.image);
    try {
      const image = fs.readFileSync(imagePath);
      const base64Image = Buffer.from(image).toString("base64");
      const { password, ...data } = user;
      return res
        .status(200)
        .send({ ...data, imageData: base64Image, token: token });
    } catch (error) {
      console.log("Error in get user", error);
      return res.status(500).send({ message: "Failed to read the image file" });
    }
  }
  return res.status(404).send({ message: "ID not Found" });
});

router.get("/pfp", verify, async (req, res) => {
  const id = req.id;
  const user = await User.findOne({ _id: id });
  if (user) {
    const imagePath = path.join(__dirname, "resources", user.image);
    try {
      const image = fs.readFileSync(imagePath);
      const base64Image = Buffer.from(image).toString("base64");
      return res.status(200).send({ imageData: base64Image });
    } catch (error) {
      console.log("Error in get pfp", error);
      return res.status(500).send({ message: "Failed to read the image file" });
    }
  }
  return res.status(404).send({ message: "ID not Found" });
});

router.put("/pfp", verify, async (req, res) => {
  const id = req.id;

  //save image from request under user_pfp-x.png
  //Meet with nick for image handling
  //const filename = req.body.image.name ????????

  const resources = path.join(__dirname, "resources");

  const files = fs.readdirSync(resources);
  const numFiles = files.length;

  const uri = req.body.uri;
  const base64Data = uri.split(";base64,").pop(); // Extract base64 data without the prefix
  // return;

  const fileExtension = "jpg";
  const filename = `user_image-${numFiles + 1}.${fileExtension}`;
  const filePath = path.join(resources, filename);

  fs.writeFile(filePath, base64Data, { encoding: "base64" }, async (err) => {
    if (err || !User.findOne({ _id: id })) {
      return res.status(500).send({ message: "Failed to update image" });
    } else {
      const user = await User.updateOne({ _id: id }, { image: filename });
      if (user) return res.status(201).send({ message: "Image Updated" });
      return res.status(404).send({ message: "ID not Found" });
    }
  });
});

router.put("/bio", verify, async (req, res) => {
  const id = req.id;
  const user = await User.findOne({ _id: id });
  if (!user) return res.status(404).send({ message: "ID not Found" });
  const success = await User.updateOne({ _id: id }, { bio: req.body.bio });
  if (success) return res.status(200).send({ message: "Bio Updated" });
  return res.status(500).send({ message: "Internal Server Error" });
});

router.put("/friend", verify, async (req, res) => {
  const id = req.id;
  const user = await User.findOne({ _id: id });
  if (!user) return res.status(404).send({ message: "ID not Found" });
  const friend = await User.findOne({ username: req.body.username });
  if (!friend) return res.status(404).send({ message: "User not Found" });
  const success = await User.updateOne(
    { _id: id },
    { $push: { friends: req.body.username } }
  );
  if (success) return res.status(200).send({ message: "Friend Added" });
  return res.status(500).send({ message: "Internal Server Error" });
});

export default router;
