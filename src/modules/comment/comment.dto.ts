import { stripHtml } from 'string-strip-html';
import { MAX_TEXT_LENGTH } from '../../definitions/const';

export type CommentCreateDtoDBFormat = {
  post_id: number,
  text: string,
  created_by: number
};

class CommentDto {
  protected id?: number;

  protected postId: number;

  protected text: string;

  protected createdBy: number;

  protected createdAt?: Date;

  protected updatedAt?: Date;

  constructor(postId: number, text: string, createdBy: number, createdAt?: Date, updatedAt?: Date, id?: number) {
    this.postId = postId;
    this.text = stripHtml(text).result.substring(0, MAX_TEXT_LENGTH);
    this.createdBy = createdBy;
    if (createdAt) {
      this.createdAt = createdAt;
    }
    if (updatedAt) {
      this.updatedAt = updatedAt;
    }
    if (id) {
      this.id = id;
    }
  }
}

export class CommentCreateDto extends CommentDto {
  static create(postId: number, text: string, createdBy: number): CommentCreateDto {
    return new CommentCreateDto(postId, text, createdBy);
  }

  prepareToDbSave(): CommentCreateDtoDBFormat {
    return {
      post_id: this.postId,
      text: this.text,
      created_by: this.createdBy,
    };
  }
}

export class CommentResponseDto extends CommentDto {
  static create(id: number, postId: number, text: string, createdBy: number, createdAt: Date, updatedAt: Date): CommentResponseDto {
    return new CommentResponseDto(postId, text, createdBy, createdAt, updatedAt, id);
  }

  prepareToOutput() {
    return {
      id: this.id,
      postId: this.postId,
      text: this.text,
      createdBy: this.createdBy,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
