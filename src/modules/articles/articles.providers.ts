import { CreateArticleHandler } from './application/command/create-article.command';
import { GetArticleByIdHandler } from './application/query/get-article-by-id.query';
import { ListArticlesHandler } from './application/query/list-articles.query';
import { ArticleRepository } from './infra/database/article.repository';
import { CreateArticleAction } from './infra/http/action/article/create-article.action';
import { GetArticleAction } from './infra/http/action/article/get-article.action';
import { ListArticlesAction } from './infra/http/action/article/list-articles.action';

export const ACTIONS = [
  ListArticlesAction,
  GetArticleAction,
  CreateArticleAction,
];

export const QUERY_HANDLERS = [ListArticlesHandler, GetArticleByIdHandler];

export const COMMAND_HANDLERS = [CreateArticleHandler];

export const REPOSITORIES = [ArticleRepository];
