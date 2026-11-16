import { ApiProperty } from '@nestjs/swagger';

export class GenericBadRequestResponse<RequestObj> {
  @ApiProperty({
    description: 'Detailed message what went wrong',
    example: 'Request validation failed.',
  })
  message: string;

  @ApiProperty({
    description: 'HTTP status message',
    example: 'Bad Request',
  })
  error: 'Bad Request';

  @ApiProperty({
    description:
      'If errors are related to specific fields, they will be listed here',
    example: {
      title: ['title must be longer than or equal to 3 characters'],
    },
    required: false,
  })
  violations: Record<keyof RequestObj, string[]>;

  @ApiProperty({
    description: 'HTTP status code',
    example: 400,
  })
  statusCode: 400;
}
