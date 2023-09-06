import { Controller, Get } from '@nestjs/common';

@Controller('healthcheck')
export class AppController {
  constructor() {}

  @Get()
  ping(): string {
    return 'pong';
  }
}
