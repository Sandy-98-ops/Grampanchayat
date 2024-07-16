import dotnev from 'dotenv'
import bodyParser from 'body-parser'
import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';

import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import multer from 'multer';


import userRoute from './route/CitizenRoutes.js';
import detailsRouter from './route/CitizenDetailsRoutes.js';
import adminRoute from './route/AdminRoute.js';
import staffRoute from './route/StaffRoutes.js';
import talathiRoute from './route/TalathiRoutes.js';
import CircleOfficerRoute from './route/CircleOfficerRoute.js';
import schemeRoute from './route/SchemeRoute.js';

const app = express();
app.use(bodyParser.json());
app.use(cors());
dotnev.config();

const PORT = process.env.PORT || 8000;
const URL = process.env.MONGOURL;

app.use("/citizen", userRoute);
app.use("/personalDetails", detailsRouter);
app.use("/admin", adminRoute);
app.use("/staff", staffRoute);
app.use("/talathi", talathiRoute);
app.use("/circleOfficer", CircleOfficerRoute);
app.use("/scheme", schemeRoute);

mongoose.connect(URL).then(() => {
    console.log("DB connected successfully");
    app.listen(PORT, () => {
        console.log(`server is running on Port:${PORT}`);
    })
}).catch(error => console.log(error));

// Serve static files from the uploads directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadDirectory = path.join(__dirname, 'uploads');

console.log(uploadDirectory);

// Ensure the uploads directory exists
if (!fs.existsSync(uploadDirectory)) {
    fs.mkdirSync(uploadDirectory);
}

// Multer configuration for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDirectory); // Set destination to your uploadDirectory
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // Unique filename
    }
});

const upload = multer({ storage });

// Middleware to serve static files
app.use('/uploads', express.static(uploadDirectory, { encodeUrl: true }));


