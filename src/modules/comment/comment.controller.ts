import { validationResult } from 'express-validator';
import { NextFunction, Request, Response } from 'express';
import { ExpressValidationError } from '../../error/express.validation.error';
import { DBQueryError } from '../../error/db.error';
import { CommentModel } from './comment.model';
import { CommentCreateDto } from './comment.dto';
import { CommentMapper } from './comment.mapper';

export const create = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    next(new ExpressValidationError('While create comment validation error', errors.array()));
  }
  const commentDto = CommentCreateDto.create(req.body.data.post_id, req.body.data.text, req.user.id);
  try {
    const commentModel = await CommentModel.create(commentDto.prepareToDbSave());
    const responseDto = CommentMapper.modelToDto(commentModel);
    return res.json({ comment: responseDto.prepareToOutput() });
  } catch (e) {
    next(new DBQueryError());
  }
};

export const getAll = async (req: Request, res: Response) => {
  res.json({});
};
