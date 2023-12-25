import { stripHtml } from 'string-strip-html';

export type PostCreateDtoDBFormat = {
  group_id: number,
  text: string,
  created_by: number
};

class PostDto {
  protected id?: number;

  protected groupId: number;

  protected text: string;

  protected createdBy: number;

  protected commentsCount?: number;

  protected createdAt?: Date;

  protected updatedAt?: Date;

  constructor(groupId: number, text: string, createdBy: number, commentsCount?: number, createdAt?: Date, updatedAt?: Date, id?: number) {
    this.groupId = groupId;
    this.text = stripHtml(text).result;
    this.createdBy = createdBy;
    if (createdAt) {
      this.createdAt = createdAt;
    }
    if (updatedAt) {
      this.updatedAt = updatedAt;
    }
    if (commentsCount !== undefined) {
      this.commentsCount = commentsCount;
    }
    if (id) {
      this.id = id;
    }
  }
}

export class PostCreateDto extends PostDto {
  static create(groupId: number, text: string, createdBy: number): PostCreateDto {
    return new PostCreateDto(groupId, text, createdBy);
  }

  prepareToDbSave(): PostCreateDtoDBFormat {
    return {
      group_id: this.groupId,
      text: this.text,
      created_by: this.createdBy,
    };
  }
}

export class PostResponseDto extends PostDto {
  static create(
    id: number,
    groupId: number,
    text: string,
    createdBy: number,
    commentsCount: number,
    createdAt: Date,
    updatedAt: Date,
  ): PostResponseDto {
    return new PostResponseDto(groupId, text, createdBy, commentsCount, createdAt, updatedAt, id);
  }

  prepareToOutput() {
    return {
      id: this.id,
      groupId: this.groupId,
      text: this.text,
      commentsCount: this.commentsCount,
      createdBy: this.createdBy,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
