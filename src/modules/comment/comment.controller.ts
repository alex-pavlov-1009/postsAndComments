import { validationResult } from 'express-validator';
import { NextFunction, Request, Response } from 'express';
import { ExpressValidationError } from '../../error/express.validation.error';
import * as CommentService from './comment.service';
import { CommentCreateError, CommentListError } from './comment.error';

export const create = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    next(new ExpressValidationError('While create comment validation error', errors.array()));
    return;
  }
  try {
    const commentResponseDto = await CommentService.create(req.body.data.postId, req.body.data.text, req.user.id);
    res.json({ comment: commentResponseDto.prepareToOutput() });
  } catch (e) {
    next(new CommentCreateError());
  }
};

export const getAll = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    next(new ExpressValidationError('While get comment validation error', errors.array()));
    return;
  }
  try {
    const commentsResponseDto = await CommentService.findAllByPostId(Number(req.query.postId));
    const result = commentsResponseDto.map((commentResponseDto) => commentResponseDto.prepareToOutput());
    res.json({ comments: result });
  } catch (e) {
    throw new CommentListError();
  }
};
