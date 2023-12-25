import { Router } from 'express';
import jwtAuthGuard from '../../middleware/guard/jwt-auth.guard';
import * as postController from './post.controller';
import * as postValidate from './post.validate';

const router = Router();

router.get('/list', jwtAuthGuard, postValidate.findRules, postController.findAllByGroupId);

router.post('/create', jwtAuthGuard, postValidate.createRules, postController.create);

export default router;
