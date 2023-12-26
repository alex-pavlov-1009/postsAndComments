import request from 'supertest';
import {
  afterAll, describe, expect, it,
} from '@jest/globals';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import db from '../../../config/database';
import app from '../../../index';

dotenv.config();

const jwtToken = jwt.sign({ id: 3 }, process.env.SECRET_KEY);
const jwtTokenWithInvalidId = jwt.sign({ id: 'test' }, process.env.SECRET_KEY);
const jwtTokenWithoutId = jwt.sign({}, process.env.SECRET_KEY);

type ValidationErrorItem = {
  location: string,
  msg: string,
  path: string,
  type: string
};

type CommentValidationErrors = {
  textRequiredError: ValidationErrorItem,
  postIdRequiredError: ValidationErrorItem,
  postIdTypeError: ValidationErrorItem,
  postIdNotExist: ValidationErrorItem,
  postIdNotPositiveNumber: ValidationErrorItem
};

const validationErrors: CommentValidationErrors = {
  textRequiredError: {
    location: 'body',
    msg: 'Required field',
    path: 'data.text',
    type: 'field',
  },
  postIdRequiredError: {
    type: 'field',
    msg: 'Required field',
    path: 'data.postId',
    location: 'body',
  },
  postIdTypeError: {
    type: 'field',
    msg: 'Field must be a number',
    path: 'data.postId',
    location: 'body',
  },
  postIdNotExist: {
    type: 'field',
    msg: 'Post with this id is not exist.',
    path: 'data.postId',
    location: 'body',
  },
  postIdNotPositiveNumber: {
    type: 'field',
    msg: 'Post id must be a positive number',
    path: 'data.postId',
    location: 'body',
  },
};

describe('Comment Endpoints', () => {
  it('should fail jwt guard', async () => {
    const response = await request(app)
      .get('/comment/list?postId=1');
    expect(response.status).toEqual(403);
    expect(response.body).toEqual({ msg: 'Your jwt token is not valid.' });
  });

  it('should fail jwt guard', async () => {
    const response = await request(app)
      .get('/comment/list?postId=1')
      .set('Authorization', `Bearer ${jwtTokenWithoutId}`);
    expect(response.status).toEqual(403);
    expect(response.body).toEqual({ msg: 'Your jwt token is not valid.' });
  });

  it('should fail jwt guard', async () => {
    const response = await request(app)
      .get('/comment/list?postId=1')
      .set('Authorization', `Bearer ${jwtTokenWithInvalidId}`);
    expect(response.status).toEqual(403);
    expect(response.body).toEqual({ msg: 'Your jwt token is not valid.' });
  });

  it('should fail jwt guard', async () => {
    const response = await request(app)
      .post('/comment/create');
    expect(response.status).toEqual(403);
    expect(response.body).toEqual({ msg: 'Your jwt token is not valid.' });
  });

  it('should return empty array', async () => {
    const response = await request(app)
      .get('/comment/list?postId=1')
      .set('Authorization', `Bearer ${jwtToken}`);
    expect(response.status).toEqual(200);
    expect(response.body).toEqual({ comments: [] });
  });

  it('should return all comment validation Errors', async () => {
    const response = await request(app)
      .post('/comment/create')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({
        data: {},
      });
    expect(response.status).toEqual(400);
    expect(response.body).toEqual({
      validationErrors: [
        validationErrors.textRequiredError,
        validationErrors.postIdRequiredError,
        validationErrors.postIdTypeError,
        validationErrors.postIdNotPositiveNumber,
      ],
    });
  });

  it('should return postId validation errors and text required', async () => {
    const response = await request(app)
      .post('/comment/create')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({
        data: {
          postId: 'test',
        },
      });
    expect(response.status).toEqual(400);
    expect(response.body).toEqual({
      validationErrors: [
        validationErrors.textRequiredError,
        { ...validationErrors.postIdTypeError, value: 'test' },
        { ...validationErrors.postIdNotPositiveNumber, value: 'test' },
      ],
    });
  });

  it('should return not exist postId errors', async () => {
    const response = await request(app)
      .post('/comment/create')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({
        data: {
          text: 'new sample text',
          postId: 1,
        },
      });
    expect(response.status).toEqual(400);
    expect(response.body).toEqual({
      validationErrors: [
        { ...validationErrors.postIdNotExist, value: 1 },
      ],
    });
  });

  it('should create Post And Comment', async () => {
    const responsePostCreate = await request(app)
      .post('/post/create')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({
        data: {
          text: 'new post text',
          groupId: 1,
        },
      });
    const responseCommentCreate = await request(app)
      .post('/comment/create')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({
        data: {
          text: 'new comment text',
          postId: 1,
        },
      });
    expect(responsePostCreate.status).toEqual(200);
    expect(responseCommentCreate.status).toEqual(200);
    expect(responseCommentCreate.body).toMatchObject({
      comment: {
        id: 1,
        postId: 1,
        createdBy: 3,
        text: 'new comment text',
      },
    });
  });

  it('should return one created comment', async () => {
    const response = await request(app)
      .get('/comment/list?postId=1')
      .set('Authorization', `Bearer ${jwtToken}`);
    expect(response.status).toEqual(200);
    expect(response.body).toMatchObject({
      comments: [
        {
          id: 1,
          postId: 1,
          createdBy: 3,
          text: 'new comment text',
        },
      ],
    });
  });

  afterAll(async () => {
    db.truncate({ cascade: true, restartIdentity: true });
  });
});
