import { body, query } from 'express-validator';
import { REQUIRED_ERROR_TEXT, REQUIRED_NUMBER_TYPE } from '../../definitions/validation.message.error';

export const createRules = [
  body('data.text').not().isEmpty().withMessage(REQUIRED_ERROR_TEXT),
  body('data.groupId').not().isEmpty().withMessage(REQUIRED_ERROR_TEXT),
  body('data.groupId').isNumeric().withMessage(REQUIRED_NUMBER_TYPE),
];

export const findRules = [
  query('groupId').not().isEmpty().withMessage(REQUIRED_ERROR_TEXT),
  query('groupId').isNumeric().withMessage(REQUIRED_NUMBER_TYPE),
];
