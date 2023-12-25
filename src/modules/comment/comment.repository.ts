import { DBQueryError } from '../../error/db.error';
import { ICommentModel, CommentModel } from './comment.model';
import { CommentCreateDtoDBFormat } from './comment.dto';

export const findAllByPostId = async (postId: number): Promise<ICommentModel[]> => {
  try {
    return await CommentModel.findAll({
      where: { post_id: postId },
    });
  } catch (e) {
    console.error(e);
    throw new DBQueryError();
  }
};

export const create = async (commentCreateDtoDBFormat: CommentCreateDtoDBFormat): Promise<ICommentModel> => {
  try {
    return await CommentModel.create(commentCreateDtoDBFormat);
  } catch (e) {
    console.error(e);
    throw new DBQueryError();
  }
};
