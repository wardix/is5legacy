import { HttpException, HttpStatus } from '@nestjs/common';

// Example Exception
export class ErrorCustomExceptionHandler extends HttpException {
  constructor() {
    super(
      'Failed to load resource. Please try again later.',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
