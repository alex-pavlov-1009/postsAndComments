import express, {
  Express, NextFunction, Request, Response,
} from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import { StatusCodes } from 'http-status-codes';
import commentRouter from './modules/comment/comment.router';
import postRouter from './modules/post/post.router';
import { JwtAuthError } from './error/jwt.error';
import db from './config/database';
import { ExpressValidationError } from './error/express.validation.error';

dotenv.config();

const app: Express = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use('/comment', commentRouter);
app.use('/post', postRouter);

app.use((req: Request, res: Response) => {
  res.status(StatusCodes.NOT_FOUND).json({ msg: 'Route not found' });
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof JwtAuthError) {
    res
      .status(StatusCodes.FORBIDDEN)
      .json({ msg: 'Your jwt token is not valid.' });
    return;
  }
  if (err instanceof ExpressValidationError) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: err.message, validationErrors: err.errorDetails });
    return;
  }
  res
    .status(StatusCodes.BAD_REQUEST)
    .json({ msg: 'Something went wrong. Please stand by.' });
});

let appServer;

const initApp = async () => {
  try {
    await db.authenticate();
    if (process.env.NODE_ENV !== 'test') {
      appServer = app.listen(process.env.PORT);
    }
  } catch (error) {
    console.error('Unable to connect to the database:', error.original);
  }
};

initApp();

const errorHandler = () => {
  db.close();
  if (appServer) {
    appServer.close(() => {
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

process.on('uncaughtException', errorHandler);
process.on('unhandledRejection', errorHandler);

process.on('SIGTERM', () => {
  if (appServer) {
    appServer.close();
  }
});

export default app;
