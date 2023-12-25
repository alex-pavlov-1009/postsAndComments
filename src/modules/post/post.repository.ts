import { Sequelize } from 'sequelize';
import { DBQueryError } from '../../error/db.error';
import { IPostModel, PostModel } from './post.model';
import { CommentModel } from '../comment/comment.model';
import { PostCreateDtoDBFormat } from './post.dto';

export const findAllByGroupId = async (groupId: number): Promise<IPostModel[]> => {
  try {
    return await PostModel.findAll({
      where: { group_id: groupId },
      attributes: {
        include: [[Sequelize.fn('COUNT', Sequelize.col('Comments.id')), 'commentsCount']],
      },
      include: [{
        model: CommentModel, attributes: [],
      }],
      group: ['Post.id'],
    });
  } catch (e) {
    console.error(e);
    throw new DBQueryError();
  }
};

export const findById = async (id: number): Promise<IPostModel> => {
  try {
    return await PostModel.findOne({
      where: { id },
      attributes: {
        include: [[Sequelize.fn('COUNT', Sequelize.col('Comments.id')), 'commentsCount']],
      },
      include: [{
        model: CommentModel, attributes: [],
      }],
      group: ['Post.id'],
    });
  } catch (e) {
    console.error(e);
    throw new DBQueryError();
  }
};

export const create = async (postCreateDtoDBFormat: PostCreateDtoDBFormat): Promise<IPostModel> => {
  try {
    const createdPostModel = await PostModel.create(postCreateDtoDBFormat);
    return await findById(createdPostModel.id);
  } catch (e) {
    console.error(e);
    throw new DBQueryError();
  }
};
