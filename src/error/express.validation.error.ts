import { ValidationError } from 'express-validator';

export class ExpressValidationError extends Error {
  public readonly errorDetails: ValidationError[];

  public readonly message: string;

  constructor(message: string, errorDetails: ValidationError[]) {
    super(message);
    this.errorDetails = errorDetails;
  }
}
