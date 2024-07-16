import express from 'express'
import { changeTalathiPassword, create, deleteTalathiById, forgotTalathiPassword, getAllTalathi, getTalathiById, login, updateTalathiById } from '../controller/TalathiController.js';

const talathiRoute = express.Router();

talathiRoute.post('/create', create);
talathiRoute.post('/login', login);
talathiRoute.get("/", getAllTalathi);
talathiRoute.get("/findById/:id", getTalathiById)
talathiRoute.put("/updateById/:id", updateTalathiById);
talathiRoute.delete("/deleteById/:email", deleteTalathiById);
talathiRoute.put("/changePassword/:id", changeTalathiPassword);
talathiRoute.put("/forgotPassword/:email", forgotTalathiPassword);
export default talathiRoute;