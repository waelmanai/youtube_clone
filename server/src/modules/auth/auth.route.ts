import { loginSchema } from './auth.schema';
import { processRequestBody } from 'zod-express-middleware';
import express from 'express';
import { loginHandler } from './auth.controller';

const router = express.Router();

router.post("/", processRequestBody(loginSchema.body), loginHandler);

export default router;