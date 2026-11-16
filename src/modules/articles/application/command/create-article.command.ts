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
    await this.repository.create({
      id: command.id,
      title: command.data.title,
      content: command.data.content,
      publishedAt: new Date(),
    });
  }
}
