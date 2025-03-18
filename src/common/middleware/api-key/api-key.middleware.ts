// src/common/middleware/api-key.middleware.ts
import { Injectable, NestMiddleware, UnauthorizedException, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class ApiKeyMiddleware implements NestMiddleware {
  private readonly logger = new Logger(ApiKeyMiddleware.name);

  constructor(private readonly configService: ConfigService) { }

  use(req: Request, res: Response, next: NextFunction) {
    const apiKey = req.headers['x-api-key'];
    const validApiKey = this.configService.get<string>('API_KEY');

    if (apiKey === validApiKey) {
      next();
    } else {
      this.logger.warn(`Invalid API key attempt from IP: ${req.ip}`); // Log the invalid attempt
      throw new UnauthorizedException('Invalid API key');
    }
  }
}