import { ApiProperty } from '@nestjs/swagger';

export class InvalidUuidResponse {
  @ApiProperty({
    description: 'Detailed message what went wrong',
    example: 'Validation failed (uuid v 4 is expected)',
  })
  message: string;

  @ApiProperty({
    description: 'HTTP status message',
    example: 'Bad Request',
  })
  error: 'Bad Request';

  @ApiProperty({
    description: 'HTTP status code',
    example: 400,
  })
  statusCode: 400;
}
