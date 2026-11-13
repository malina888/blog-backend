import { Controller, Get } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ListArticlesQuery } from '../../../../application/query/list-articles.query';
import { ArticleResponse } from '../../response/article.response';

@ApiTags('articles')
@Controller('api/v1/articles')
export class ListArticlesAction {
  constructor(private readonly queryBus: QueryBus) {}

  @Get()
  @ApiOperation({ summary: 'List all articles, newest first' })
  @ApiOkResponse({
    description: 'All articles, newest first (an empty list if there are none)',
    type: ArticleResponse,
    isArray: true,
  })
  async run(): Promise<ArticleResponse[]> {
    return this.queryBus.execute(new ListArticlesQuery());
  }
}
