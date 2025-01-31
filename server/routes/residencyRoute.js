import express from 'express';
import { createResidency, getAllResidencies, getResidency, updateResidency } from '../controllers/residencyCntrl.js';
const router = express.Router();
router.post("/create", createResidency);
router.get("/allresd",  getAllResidencies)
router.get("/:id", getResidency)

router.put("/update/:id", updateResidency)

export {router as residencyRoute};