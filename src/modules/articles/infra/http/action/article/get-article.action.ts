import { Controller, Get } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { GenericBadRequestResponse } from '../../../../../../core/http/response/bad-request.response';
import { GenericNotFoundResponse } from '../../../../../../core/http/response/not-found.response';
import { UuidParam } from '../../../../../../core/validation/decorator/uuid-v4-param.decorator';
import { GetArticleByIdQuery } from '../../../../application/query/get-article-by-id.query';
import { ArticleResponse } from '../../response/article.response';

@ApiTags('articles')
@Controller('api/v1/articles')
export class GetArticleAction {
  constructor(private readonly queryBus: QueryBus) {}

  @Get(':id')
  @ApiOperation({ summary: 'Get one article by its ID' })
  @ApiParam({ name: 'id', description: 'Article unique identifier (UUID v4)' })
  @ApiOkResponse({ description: 'The whole article', type: ArticleResponse })
  @ApiBadRequestResponse({
    description: 'The ID is not a valid UUID v4',
    type: GenericBadRequestResponse,
  })
  @ApiNotFoundResponse({
    description: 'There is no article with this ID',
    type: GenericNotFoundResponse,
  })
  async run(@UuidParam('id') id: string): Promise<ArticleResponse> {
    return this.queryBus.execute(new GetArticleByIdQuery(id));
  }
}
