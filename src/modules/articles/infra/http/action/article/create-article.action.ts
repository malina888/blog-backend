import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { v4 } from 'uuid';
import { AdminGuard } from '../../../../../../core/http/auth/admin.guard';
import { GenericBadRequestResponse } from '../../../../../../core/http/response/bad-request.response';
import { ForbiddenResponse } from '../../../../../../core/http/response/forbidden.response';
import { UnauthorizedResponse } from '../../../../../../core/http/response/unauthorized.response';
import { CreateArticleCommand } from '../../../../application/command/create-article.command';
import { GetArticleByIdQuery } from '../../../../application/query/get-article-by-id.query';
import { ArticleRequest } from '../../request/article.request';
import { ArticleResponse } from '../../response/article.response';

@ApiTags('articles')
@Controller('api/v1/articles')
export class CreateArticleAction {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @UseGuards(AdminGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Create an article (admin token required)' })
  @ApiCreatedResponse({ description: 'The new article', type: ArticleResponse })
  @ApiBadRequestResponse({
    description:
      'The data breaks a rule, or has a field the server owns or does not know',
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
  async run(@Body() body: ArticleRequest): Promise<ArticleResponse> {
    const id = v4();
    await this.commandBus.execute(new CreateArticleCommand(id, body));

    return this.queryBus.execute(new GetArticleByIdQuery(id));
  }
}
