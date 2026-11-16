import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class ArticleRequest {
  @ApiProperty({
    description: 'Article title',
    example: 'Hello, world',
    minLength: 3,
    maxLength: 120,
  })
  @IsString()
  @MinLength(3)
  @MaxLength(120)
  title: string;

  @ApiProperty({
    description: 'Article content',
    example: 'This is the first article on my blog.',
    minLength: 10,
    maxLength: 50000,
  })
  @IsString()
  @MinLength(10)
  @MaxLength(50000)
  content: string;
}
