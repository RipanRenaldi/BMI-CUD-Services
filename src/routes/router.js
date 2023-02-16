import { Router } from "express";
import { calculateBMI, updateBMI, deleteBMI } from "../controller/BMI_Controller.js";
import auth from "../middleware/auth.js";
const router = Router();

router.post('/bmi/', auth, calculateBMI);
router.put('/bmi/:id', auth, updateBMI);
router.delete('/bmi/:id', auth, deleteBMI);
export default router;