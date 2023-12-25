import { PostCreateDto, PostResponseDto } from './post.dto';
import * as PostRepository from './post.repository';
import { PostMapper } from './post.mapper';

export const findAllByGroupId = async (groupId: number): Promise<PostResponseDto[]> => {
  const posts = await PostRepository.findAllByGroupId(groupId);
  return posts.map((post) => PostMapper.modelToDto(post));
};

export const create = async (groupId: number, text: string, userId: number) => {
  const postDto = PostCreateDto.create(groupId, text, userId);
  const postModel = await PostRepository.create(postDto.prepareToDbSave());
  return PostMapper.modelToDto(postModel);
};
