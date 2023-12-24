import { body } from 'express-validator';
import { REQUIRED_ERROR_TEXT } from '../../definitions/validation.message.error';

export const rules = [
  body('data.text').not().isEmpty().withMessage(REQUIRED_ERROR_TEXT),
  body('data.group_id').not().isEmpty().withMessage(REQUIRED_ERROR_TEXT),
];
