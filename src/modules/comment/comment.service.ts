import { CommentCreateDto, CommentResponseDto } from './comment.dto';
import * as CommentRepository from './comment.repository';
import { CommentMapper } from './comment.mapper';

export const findAllByPostId = async (postId: number): Promise<CommentResponseDto[]> => {
  const comments = await CommentRepository.findAllByPostId(postId);
  return comments.map((comment) => CommentMapper.modelToDto(comment));
};

export const create = async (postId: number, text: string, userId: number): Promise<CommentResponseDto> => {
  const commentDto = CommentCreateDto.create(postId, text, userId);
  const commentModel = await CommentRepository.create(commentDto.prepareToDbSave());
  return CommentMapper.modelToDto(commentModel);
};
