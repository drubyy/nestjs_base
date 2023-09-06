import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { mappingException } from './mapping.exception';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  constructor() {}

  catch(exception, host: ArgumentsHost) {
    const res = host.switchToHttp();
    const response = res.getResponse();
    let statusCode;

    switch (exception.code) {
      case 'P2025':
        statusCode = 404;
        break;
      default:
        statusCode = exception.status;
        break;
    }
    response.status(statusCode).json(mappingException[statusCode]);
  }
}