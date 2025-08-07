import express from "express"
const router = express.Router();

import {getNgosByCity} from "../controllers/ngoController.js"

router.get("/", getNgosByCity); // API: /api/ngos?city=CityName

export default router;

