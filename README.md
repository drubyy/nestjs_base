<p align="center">
  <a href="http://nestjs.com/" target="blank">
    <img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" />
  </a>

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

### Without using docker
make sure app can connect to database and run
```bash
$ npm install
$ npx prisma init
$ npx prisma migrate dev --name init
```

### With using docker
```bash
$ make build
$ make bash

// run in bash
$ npx prisma init
$ npx prisma migrate dev --name init
```

## Running the app

### Without using docker
```bash
# development
$ npm run dev:start
```

### With using docker
```bash
# development
$ make dev
```

