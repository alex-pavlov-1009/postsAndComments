import { validationResult } from 'express-validator';
import { NextFunction, Request, Response } from 'express';
import { ExpressValidationError } from '../../error/express.validation.error';
import { DBQueryError } from '../../error/db.error';
import { CommentModel } from './comment.model';

export const create = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    next(new ExpressValidationError('While create comment validation error', errors.array()));
  }
  const commentDto = {
    post_id: req.body.data.post_id,
    text: req.body.data.text,
    created_by: req?.user?.id,
  };

  try {
    const result = await CommentModel.create(commentDto);

    return res.json({ result });
  } catch (e) {
    next(new DBQueryError());
  }
};

export const getAll = async (req: Request, res: Response) => {
  res.json({});
};
