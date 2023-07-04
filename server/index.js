import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';

import auth from './routes/auth.js';
import courts from './routes/courts.js';

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(bodyParser.json());

dotenv.config();

mongoose.connect(
    process.env.DB_CONNECT,
    {useNewUrlParser:true}
);

app.get('/', (req,res) => {
    res.status(200).send("Home Route of Server");
});

app.use('/auth',auth);
app.use('/courts',courts);

const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
server.keepAliveTimeout = 65000;
