import { Router } from 'express';
import jwtAuthGuard from '../../middleware/guard/jwt-auth.guard';
import * as commentController from './comment.controller';
import * as commentValidate from './comment.validate';

const router = Router();

router.get('/list', jwtAuthGuard, commentController.getAll);

router.post('/create', jwtAuthGuard, commentValidate.rules, commentController.create);

export default router;
