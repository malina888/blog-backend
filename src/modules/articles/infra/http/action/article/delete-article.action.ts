import {
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AdminGuard } from '../../../../../../core/http/auth/admin.guard';
import { ForbiddenResponse } from '../../../../../../core/http/response/forbidden.response';
import { InvalidUuidResponse } from '../../../../../../core/http/response/invalid-uuid.response';
import { GenericNotFoundResponse } from '../../../../../../core/http/response/not-found.response';
import { UnauthorizedResponse } from '../../../../../../core/http/response/unauthorized.response';
import { UuidParam } from '../../../../../../core/validation/decorator/uuid-v4-param.decorator';
import { DeleteArticleCommand } from '../../../../application/command/delete-article.command';

@ApiTags('articles')
@Controller('api/v1/articles')
export class DeleteArticleAction {
  constructor(private readonly commandBus: CommandBus) {}

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AdminGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Delete an article (admin token required)' })
  @ApiParam({ name: 'id', description: 'Article unique identifier (UUID v4)' })
  @ApiNoContentResponse({ description: 'The article was deleted' })
  @ApiBadRequestResponse({
    description: 'The ID is not a valid UUID v4',
    type: InvalidUuidResponse,
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
  async run(@UuidParam('id') id: string): Promise<void> {
    await this.commandBus.execute(new DeleteArticleCommand(id));
  }
}
