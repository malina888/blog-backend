import { NotFoundException } from '@nestjs/common';

export class ArticleNotFoundError extends NotFoundException {
  constructor() {
    super('Article with given id does not exist.');
  }
}
