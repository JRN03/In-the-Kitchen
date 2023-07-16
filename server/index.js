import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";

import auth from "./routes/auth.js";
import courts from "./routes/courts.js";
import user from "./routes/user.js";

const PORT = process.env.PORT || 8080;

const app = express();

app.use(cors());
app.use(bodyParser.json({limit:'50mb'}));

dotenv.config();

mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true });

app.get("/", (req, res) => {
  res.status(200).send("Home Route of Server");
});

app.use("/auth", auth);
app.use("/courts", courts);
app.use("/user", user)

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
server.keepAliveTimeout = 65000;
