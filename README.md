# Blog Backend

Back end of my personal blog, built with Nest.js, Prisma and PostgreSQL.

## Tech stack

- Node.js 24
- Nest.js 11
- Prisma 7
- PostgreSQL 16

## Setting the project up

The app runs in Docker containers. Copy the environment file and fill it with your data:

```shell
cp .env.dist .env
```

Then build and start the containers:

```shell
docker compose up -d --build
```

On every start the container installs packages, runs the database migrations and loads the seed data. When it is
ready, the API documentation (Swagger UI) is at http://localhost/api.

## Running commands

Run every `npm` and `npx` command inside the app container, not on your machine:

```shell
docker compose exec app npm run lint
```

To stop the containers:

```shell
docker compose down
```

## Testing

```shell
# code formatting and static analysis
docker compose exec app npm run format
docker compose exec app npm run lint

# functional tests (Cucumber)
docker compose exec app npm run test:functional
```

Functional tests live in the `features/` directory.

## Release

Before merging a pull request into `main`, bump the version in `package.json` and run `npm install` in the container
to refresh `package-lock.json`. CI fails if the version is not unique.
