import { Body, Controller, Put, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AdminGuard } from '../../../../../../core/http/auth/admin.guard';
import { GenericBadRequestResponse } from '../../../../../../core/http/response/bad-request.response';
import { ForbiddenResponse } from '../../../../../../core/http/response/forbidden.response';
import { GenericNotFoundResponse } from '../../../../../../core/http/response/not-found.response';
import { UnauthorizedResponse } from '../../../../../../core/http/response/unauthorized.response';
import { UuidParam } from '../../../../../../core/validation/decorator/uuid-v4-param.decorator';
import { UpdateArticleCommand } from '../../../../application/command/update-article.command';
import { GetArticleByIdQuery } from '../../../../application/query/get-article-by-id.query';
import { ArticleRequest } from '../../request/article.request';
import { ArticleResponse } from '../../response/article.response';

@ApiTags('articles')
@Controller('api/v1/articles')
export class UpdateArticleAction {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Put(':id')
  @UseGuards(AdminGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: 'Edit the title and content of an article (admin token required)',
  })
  @ApiParam({ name: 'id', description: 'Article unique identifier (UUID v4)' })
  @ApiOkResponse({ description: 'The saved article', type: ArticleResponse })
  @ApiBadRequestResponse({
    description:
      'The ID is not a valid UUID v4, or the data breaks a rule, or has a field the server owns or does not know',
    type: GenericBadRequestResponse,
  })
  @ApiUnauthorizedResponse({
    description: 'No admin token was sent',
    type: UnauthorizedResponse,
  })
  @ApiForbiddenResponse({
    description: 'The admin token is wrong',
    type: ForbiddenResponse,
  })
  @ApiNotFoundResponse({
    description: 'There is no article with this ID',
    type: GenericNotFoundResponse,
  })
  async run(
    @UuidParam('id') id: string,
    @Body() body: ArticleRequest,
  ): Promise<ArticleResponse> {
    await this.commandBus.execute(new UpdateArticleCommand(id, body));

    return this.queryBus.execute(new GetArticleByIdQuery(id));
  }
}
