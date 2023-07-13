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
  res.status(200).send(user);
});

router.get("/pfp", async (req, res) => {
  const id = req.body.id;
  const user = await User.findOne({ _id: id });
  res.status(200).sendFile(__dirname + `/resources/${user.image}`);
});

router.put("/bio", verify, async (req, res) => {
  const id = req.id;
  const user = await User.findOne({ _id: id });
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
  console.log(req.body);
  console.log(id);
  // return;

  const fileExtension = "jpg"
  const filename = `user_image-${numFiles + 1}.${fileExtension}`;
  const filePath = path.join(resources, filename);

  fs.writeFile(filePath, uri, async (err) => {
    if (err || !User.findOne({ _id: id })) {
      return res.status(500).send({ message: "Failed to update image" });
    } else {
      await User.updateOne({ _id: id }, { image: filename });
      console.log(id);
      return res.status(201).send({ message: "Image Updated" });
    }
  });
});

router.put("/friend", verify, async (req, res) => {
  const id = req.id;
  const user = await User.findOne({ _id: id });
});

export default router;
