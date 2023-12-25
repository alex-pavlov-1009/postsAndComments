import { validationResult } from 'express-validator';
import { NextFunction, Request, Response } from 'express';
import { ExpressValidationError } from '../../error/express.validation.error';
import * as PostService from './post.service';
import { PostCreateError, PostListError } from './post.error';

export const create = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    next(new ExpressValidationError('While create post validation error', errors.array()));
    return;
  }
  try {
    const responseDto = await PostService.create(req.body.data.groupId, req.body.data.text, req.user.id);
    res.json({ post: responseDto.prepareToOutput() });
  } catch (e) {
    console.error(e);
    next(new PostCreateError());
  }
};

export const findAllByGroupId = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    next(new ExpressValidationError('While find post validation error', errors.array()));
    return;
  }
  try {
    const groupId = Number(req.query.groupId);
    const postsResponseDto = await PostService.findAllByGroupId(groupId);
    const result = postsResponseDto.map((postResponseDto) => postResponseDto.prepareToOutput());
    res.json({ posts: result });
  } catch (e) {
    next(new PostListError());
  }
};
