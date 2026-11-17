import { Command, CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ArticleRepository } from '../../infra/database/article.repository';
import { ArticleNotFoundError } from '../../model/error/article.error';

export class DeleteArticleCommand extends Command<void> {
  constructor(public readonly id: string) {
    super();
  }
}

@CommandHandler(DeleteArticleCommand)
export class DeleteArticleHandler implements ICommandHandler<DeleteArticleCommand> {
  constructor(private readonly repository: ArticleRepository) {}

  async execute(command: DeleteArticleCommand): Promise<void> {
    const article = await this.repository.findById(command.id);

    if (!article) {
      throw new ArticleNotFoundError();
    }

    await this.repository.delete(command.id);
  }
}
