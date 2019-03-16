import express from 'express';
import signupController from '../controllers/signup';
const router = express.Router();
router.post('/', signupController.signup);
export default router;