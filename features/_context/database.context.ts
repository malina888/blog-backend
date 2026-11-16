import { Given } from '@cucumber/cucumber';
import { execSync } from 'child_process';
import { PrismaService } from '../../src/core/prisma/prisma.service';

Given('there are no articles', async () => {
  const prisma = new PrismaService();
  await prisma.article.deleteMany();
  await prisma.$disconnect();
});

Given('the app has been restarted {int} times', (times: number) => {
  for (let i = 0; i < times; i++) {
    execSync('npm run database:migrate > /dev/null');
    execSync('npm run database:seed > /dev/null');
  }
});
