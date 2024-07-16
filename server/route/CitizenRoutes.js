import express from 'express'
import { changeCitizenPassword, createUser, deleteCitizenById, forgotCitizenPassword, getAllCitizen, getCitizenById, login, updateCitizenById } from '../controller/CitizenController.js';

const userRoute = express.Router();

userRoute.post('/create', createUser);
userRoute.post('/login', login);
userRoute.get("/", getAllCitizen);
userRoute.get("/findById/:id", getCitizenById)
userRoute.put("/updateById/:id", updateCitizenById);
userRoute.delete("/deleteById/:email", deleteCitizenById);
userRoute.put("/changePassword/:id", changeCitizenPassword);
userRoute.put("/forgotPassword/:email", forgotCitizenPassword);
export default userRoute;