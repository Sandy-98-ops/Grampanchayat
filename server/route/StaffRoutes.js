import express from 'express'
import { changeStaffPassword, create, deleteStaffById, forgotStaffPassword, getAllStaff, getStaffById, login, updateStaffById } from '../controller/StaffController.js';

const staffRoute = express.Router();

staffRoute.post('/create', create);
staffRoute.post('/login', login);
staffRoute.get("/", getAllStaff);
staffRoute.get("/findById/:id", getStaffById)
staffRoute.put("/updateById/:id", updateStaffById);
staffRoute.delete("/deleteById/:email", deleteStaffById);
staffRoute.put("/changePassword/:id", changeStaffPassword);
staffRoute.put("/forgotPassword/:email", forgotStaffPassword);

export default staffRoute;