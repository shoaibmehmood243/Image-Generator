import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";

import connectDb from "./mongodb/dbConn.js";

import postRoutes from "./routes/postRoutes.js"
import dalleRoutes from "./routes/dalleRoutes.js"

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({limit: '50mb'}));

app.get('/', async (req, res) => {
    res.send("Hello DALL-E 2.0");
});

app.use('/api/v1/post', postRoutes);
app.use('/api/v1/dalle', dalleRoutes);

const startServer = async () => {
    try {
        connectDb(process.env.MONGODB_URL);
        app.listen(8080, () => console.log("Server running on port:8080"));
    } catch (error) {
        console.log(error);
    }
}

startServer();

module.exports = app;