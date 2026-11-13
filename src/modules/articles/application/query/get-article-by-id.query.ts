import { IQueryHandler, Query, QueryHandler } from '@nestjs/cqrs';
import { ArticleRepository } from '../../infra/database/article.repository';
import { Article } from '../../model/article.model';
import { ArticleNotFoundError } from '../../model/error/article.error';

export class GetArticleByIdQuery extends Query<Article> {
  constructor(public readonly id: string) {
    super();
  }
}

@QueryHandler(GetArticleByIdQuery)
export class GetArticleByIdHandler implements IQueryHandler<GetArticleByIdQuery> {
  constructor(private readonly repository: ArticleRepository) {}

  async execute(query: GetArticleByIdQuery): Promise<Article> {
    const article = await this.repository.findById(query.id);

    if (!article) {
      throw new ArticleNotFoundError();
    }

    return article;
  }
}
