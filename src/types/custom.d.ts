interface UserDataDto {
  id: number
}

declare namespace Express {
  export interface Request {
    user?: UserDataDto
  }
}
