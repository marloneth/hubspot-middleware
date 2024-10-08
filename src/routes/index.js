import { Router } from 'express';
import contactRouter from './contact';

const router = Router();

router.use('/contacts', contactRouter);

export default router;
