import { CommentResponseDto } from './comment.dto';
import { ICommentModel } from './comment.model';

export class CommentMapper {
  static modelToDto(commentModel: ICommentModel): CommentResponseDto {
    return CommentResponseDto.create(
      commentModel.id,
      commentModel.post_id,
      commentModel.text,
      commentModel.created_by,
      commentModel.createdAt,
      commentModel.updatedAt,
    );
  }
}
