import express from 'express';
import signup from './signup';
import login from './login'

const router = express.Router();


router.use('/signup',signup);


export default router;