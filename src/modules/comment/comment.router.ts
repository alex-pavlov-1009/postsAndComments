import { Router } from 'express';
import jwtAuthGuard from '../../middleware/guard/jwt-auth.guard';
import * as commentController from './comment.controller';
import * as commentValidate from './comment.validate';

const router = Router();

router.get('/list', jwtAuthGuard, commentValidate.findRules, commentController.getAll);

router.post('/create', jwtAuthGuard, commentValidate.createRules, commentController.create);

export default router;
