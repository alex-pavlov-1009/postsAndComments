import { body, query } from 'express-validator';
import { REQUIRED_ERROR_TEXT, REQUIRED_NUMBER_TYPE } from '../../definitions/validation.message.error';
import { PostModel } from '../post/post.model';

const postIdExistCheck = async (value: number, erroeMsg: string) => {
  let id = value;
  if (!id) {
    throw new Error(erroeMsg);
  }
  if (typeof id === 'string') {
    id = Number(id);
    if (id <= 0 || Number.isNaN(id)) {
      throw new Error('Post id must be a positive number');
    }
  }
  const clientWithSameValue = await PostModel.findOne({ where: { id } });
  if (!clientWithSameValue) {
    throw new Error(erroeMsg);
  }
  return true;
};

export const createRules = [
  body('data.text').not().isEmpty().withMessage(REQUIRED_ERROR_TEXT),
  body('data.postId').not().isEmpty().withMessage(REQUIRED_ERROR_TEXT),
  body('data.postId').isNumeric().withMessage(REQUIRED_NUMBER_TYPE),
  body('data.postId').custom((value) => postIdExistCheck(value, 'Post with this id is not exist.')),
];

export const findRules = [
  query('postId').not().isEmpty().withMessage(REQUIRED_ERROR_TEXT),
  query('postId').isNumeric().withMessage(REQUIRED_NUMBER_TYPE),
];
