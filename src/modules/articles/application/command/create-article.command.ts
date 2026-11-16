import { Command, CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ArticleRepository } from '../../infra/database/article.repository';
import { ArticleRequest } from '../../infra/http/request/article.request';

export class CreateArticleCommand extends Command<void> {
  constructor(
    public readonly id: string,
    public readonly data: ArticleRequest,
  ) {
    super();
  }
}

@CommandHandler(CreateArticleCommand)
export class CreateArticleHandler implements ICommandHandler<CreateArticleCommand> {
  constructor(private readonly repository: ArticleRepository) {}

  async execute(command: CreateArticleCommand): Promise<void> {
    const publishedAt = new Date();

    await this.repository.create(command.id, publishedAt, command.data);
  }
}
