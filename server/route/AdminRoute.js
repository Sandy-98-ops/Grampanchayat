import express from 'express'
import { changeAdminPassword, create, deleteAdminById, forgotAdminPassword, getAdminById, getAllAdmin, login, updateAdminById } from '../controller/AdminController.js';

const adminRoute = express.Router();

adminRoute.post('/create', create);
adminRoute.post('/login', login);
adminRoute.get("/", getAllAdmin);
adminRoute.get("/findById/:id", getAdminById)
adminRoute.put("/updateById/:id", updateAdminById);
adminRoute.delete("/deleteById/:email", deleteAdminById);
adminRoute.put("/changePassword/:id", changeAdminPassword);
adminRoute.put("/forgotPassword/:email", forgotAdminPassword);

export default adminRoute;