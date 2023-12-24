import { Router } from 'express';
import jwtAuthGuard from '../../middleware/guard/jwt-auth.guard';
import * as postController from './post.controller';
import * as postValidate from './post.validate';

const router = Router();

router.get('/list', jwtAuthGuard, postController.getAll);

router.post('/create', jwtAuthGuard, postValidate.rules, postController.create);

export default router;
