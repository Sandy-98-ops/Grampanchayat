import express from 'express'
import { create, deleteSchemeById, getAllScheme, getSchemeById, updateSchemeById } from '../controller/SchemeController.js';

const schemeRoute = express.Router();

schemeRoute.post('/create', create);
schemeRoute.get("/", getAllScheme);
schemeRoute.get("/findById/:id", getSchemeById)
schemeRoute.put("/updateById/:id", updateSchemeById);
schemeRoute.delete("/deleteById/:id", deleteSchemeById);

export default schemeRoute;