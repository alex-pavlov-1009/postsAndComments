import request from 'supertest';
import {
  afterAll, describe, expect, it,
} from '@jest/globals';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import db from '../../../config/database';
import app from '../../../index';

dotenv.config();

const jwtToken = jwt.sign({ id: 1 }, process.env.SECRET_KEY);

type ValidationErrorItem = {
  location: string,
  msg: string,
  path: string,
  type: string
};

type CommentValidationErrors = {
  textRequiredError: ValidationErrorItem,
  groupIdRequiredError: ValidationErrorItem,
  groupIdTypeError: ValidationErrorItem,
};

const validationErrors: CommentValidationErrors = {
  textRequiredError: {
    location: 'body',
    msg: 'Required field',
    path: 'data.text',
    type: 'field',
  },
  groupIdRequiredError: {
    type: 'field',
    msg: 'Required field',
    path: 'data.groupId',
    location: 'body',
  },
  groupIdTypeError: {
    type: 'field',
    msg: 'Field must be a number',
    path: 'data.groupId',
    location: 'body',
  },
};

describe('Comment Endpoints', () => {
  it('should fail jwt guard', async () => {
    const response = await request(app)
      .get('/post/list?groupId=1');
    expect(response.status).toEqual(403);
    expect(response.body).toEqual({ msg: 'Your jwt token is not valid.' });
  });

  it('should fail jwt guard', async () => {
    const response = await request(app)
      .post('/post/create');
    expect(response.status).toEqual(403);
    expect(response.body).toEqual({ msg: 'Your jwt token is not valid.' });
  });

  it('should return empty array', async () => {
    const response = await request(app)
      .get('/post/list?groupId=1')
      .set('Authorization', `Bearer ${jwtToken}`);
    expect(response.status).toEqual(200);
    expect(response.body).toEqual({ posts: [] });
  });

  it('should return all post validation Errors', async () => {
    const response = await request(app)
      .post('/post/create')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({
        data: {},
      });
    expect(response.status).toEqual(400);
    expect(response.body).toEqual({
      validationErrors: [
        validationErrors.textRequiredError,
        validationErrors.groupIdRequiredError,
        validationErrors.groupIdTypeError,
      ],
    });
  });

  it('should return groupId type validation error and text required', async () => {
    const response = await request(app)
      .post('/post/create')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({
        data: {
          groupId: 'test',
        },
      });
    expect(response.status).toEqual(400);
    expect(response.body).toEqual({
      validationErrors: [

        validationErrors.textRequiredError,
        { ...validationErrors.groupIdTypeError, value: 'test' },
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
    expect(responsePostCreate.body).toMatchObject({
      post: {
        id: 1,
        groupId: 1,
        text: 'new post text',
        commentsCount: 0,
      },
    });
    expect(responseCommentCreate.status).toEqual(200);
  });

  it('should return created post with two comments count', async () => {
    const response = await request(app)
      .get('/post/list?groupId=1')
      .set('Authorization', `Bearer ${jwtToken}`);
    expect(response.status).toEqual(200);
    expect(response.body).toMatchObject({
      posts: [
        {
          id: 1,
          groupId: 1,
          text: 'new post text',
          commentsCount: 1,
        },
      ],
    });
  });

  afterAll(async () => {
    db.truncate({ cascade: true, restartIdentity: true });
  });
});
