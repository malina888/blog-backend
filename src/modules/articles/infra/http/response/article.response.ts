import { ApiProperty } from '@nestjs/swagger';

export class ArticleResponse {
  @ApiProperty({
    description: 'Article unique identifier (UUID v4)',
    example: '5e1f0a2b-0001-4000-8000-000000000001',
  })
  id: string;

  @ApiProperty({ example: 'Hello, world' })
  title: string;

  @ApiProperty({ example: 'This is the first article on my blog.' })
  content: string;

  @ApiProperty({
    description: 'When the article was published',
    example: '2026-09-01T08:00:00.000Z',
  })
  publishedAt: Date;

  @ApiProperty({ example: '2026-09-01T08:00:00.000Z' })
  createdAt: Date;

  @ApiProperty({ example: '2026-09-01T08:00:00.000Z' })
  updatedAt: Date;
}
