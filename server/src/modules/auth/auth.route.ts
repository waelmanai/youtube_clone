import { User } from './../user/user.model';
import { loginSchema } from './auth.schema';
import { processRequestBody } from 'zod-express-middleware';
import express from 'express';
import { loginHandler } from './auth.controller';
import { findUserByEmail } from '../user/user.service';



const router = express.Router();

router.post("/", processRequestBody(loginSchema.body), loginHandler);

router.get('/logout',processRequestBody(loginSchema.body), function(req, res){
    console.log("logout  enter");
    
});

export default router;