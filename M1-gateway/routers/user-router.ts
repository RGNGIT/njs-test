import { Router } from "express";
import UserController from "../controllers/user-controller";

const router = Router();

router.get('/users/get/:username', UserController.get);
router.patch('/users/edit/:username', UserController.edit);
router.delete('/users/delete/:username', UserController.delete);
router.post('/users/register', UserController.register);

export default router;