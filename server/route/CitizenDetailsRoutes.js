import express from "express";
import { upload } from "../utils/multer-config.js";
import { approval, circleApproval, circleRejection, create, getAllApplications, getApplicationByCitizen, rejection, staffApproval, staffRejection } from "../controller/PersonalDetailsController.js";


const detailsRouter = new express.Router();

detailsRouter.post('/upload', upload.fields([
    { name: 'rationCard' },
    { name: 'aadharCard' },
    { name: 'panCard' },
    { name: 'bankStatement' },
    { name: 'addressProof' }
]), create);

detailsRouter.get("/", getAllApplications);
detailsRouter.get("/:citizen", getApplicationByCitizen);
detailsRouter.put("/staffApproval/:id", staffApproval);
detailsRouter.put("/staffRejection/:id", staffRejection);
detailsRouter.put("/circleApproval/:id", circleApproval);
detailsRouter.put("/circleRejection/:id", circleRejection);
detailsRouter.put("/adminApproval/:id", approval);
detailsRouter.put("/adminRejection/:id", rejection);

export default detailsRouter;


