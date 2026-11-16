import { Command, CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ArticleRepository } from '../../infra/database/article.repository';
import { ArticleRequest } from '../../infra/http/request/article.request';
import { ArticleNotFoundError } from '../../model/error/article.error';

export class UpdateArticleCommand extends Command<void> {
  constructor(
    public readonly id: string,
    public readonly data: ArticleRequest,
  ) {
    super();
  }
}

@CommandHandler(UpdateArticleCommand)
export class UpdateArticleHandler implements ICommandHandler<UpdateArticleCommand> {
  constructor(private readonly repository: ArticleRepository) {}

  async execute(command: UpdateArticleCommand): Promise<void> {
    const article = await this.repository.findById(command.id);

    if (!article) {
      throw new ArticleNotFoundError();
    }

    await this.repository.update(command.id, command.data);
  }
}
