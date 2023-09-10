import { Router } from "express";

import {getAll,getSingleUser, registerUser, userLogin} from "../controllers/userController"
const router = Router();

router.get('/all', getAll)
router.get('/single/:id', getSingleUser)
router.post('/register', registerUser)
router.post('/login', userLogin)


export default router;