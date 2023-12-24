import { validationResult } from 'express-validator';
import { NextFunction, Request, Response } from 'express';
import { DBQueryError } from '../../error/db.error';
import { ExpressValidationError } from '../../error/express.validation.error';
import { PostModel } from './post.model';

export const create = async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    next(new ExpressValidationError('While create post validation error', errors.array()));
  }
  const postDto = {
    group_id: req.body.data.group_id,
    text: req.body.data.text,
    created_by: req?.user?.id,
  };

  try {
    const result = await PostModel.create(postDto);
    return res.json({ result });
  } catch (e) {
    console.error(e);
    next(new DBQueryError());
  }
};

export const getAll = async (req, res) => res.json({});
