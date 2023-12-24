type CommentCreateDtoDBFormat = {
  post_id: number,
  text: string,
  created_by: number
};

export class CommentCreateDto {
  private postId: number;

  private text: string;

  private createdBy: number;

  static create(postId: number, text: string, createdBy: number): CommentCreateDto {
    const commentResponseDto = new CommentCreateDto();
    commentResponseDto.postId = postId;
    commentResponseDto.text = text;
    commentResponseDto.createdBy = createdBy;
    return commentResponseDto;
  }

  prepareToDbSave(): CommentCreateDtoDBFormat {
    return {
      post_id: this.postId,
      text: this.text,
      created_by: this.createdBy,
    };
  }
}

export class CommentResponseDto {
  private id: number;

  private postId: number;

  private text: string;

  private createdBy: number;

  private createdAt: Date;

  private updatedAt: Date;

  static create(id: number, postId: number, text: string, createdBy: number, createdAt: Date, updatedAt: Date) {
    const commentResponseDto = new CommentResponseDto();
    commentResponseDto.id = id;
    commentResponseDto.postId = postId;
    commentResponseDto.text = text;
    commentResponseDto.createdBy = createdBy;
    commentResponseDto.createdAt = createdAt;
    commentResponseDto.updatedAt = updatedAt;
    return commentResponseDto;
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
