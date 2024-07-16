import express from 'express'
import { changeCircleOfficerPassword, create, deleteCircleOfficerById, forgotCircleOfficerPassword, getAllCircleOfficer, getCircleOfficerById, login, updateCircleOfficerById } from '../controller/CircleOfficerController.js';

const CircleOfficerRoute = express.Router();

CircleOfficerRoute.post('/create', create);
CircleOfficerRoute.post('/login', login);
CircleOfficerRoute.get("/", getAllCircleOfficer);
CircleOfficerRoute.get("/findById/:id", getCircleOfficerById)
CircleOfficerRoute.put("/updateById/:id", updateCircleOfficerById);
CircleOfficerRoute.delete("/deleteById/:email", deleteCircleOfficerById);
CircleOfficerRoute.put("/changePassword/:id", changeCircleOfficerPassword);
CircleOfficerRoute.put("/forgotPassword/:email", forgotCircleOfficerPassword);

export default CircleOfficerRoute;