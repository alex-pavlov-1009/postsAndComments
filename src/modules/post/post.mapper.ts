import { PostResponseDto } from './post.dto';
import { IPostModel } from './post.model';

export class PostMapper {
  static modelToDto(postModel: IPostModel): PostResponseDto {
    const commentsCount = Number(postModel.dataValues.commentsCount);
    return PostResponseDto.create(
      postModel.id,
      postModel.group_id,
      postModel.text,
      postModel.created_by,
      commentsCount,
      postModel.createdAt,
      postModel.updatedAt,
    );
  }
}
