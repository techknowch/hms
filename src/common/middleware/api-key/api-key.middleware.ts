import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ApiKeyMiddleware implements NestMiddleware {
  constructor(private readonly configService: ConfigService) { }

  use(req: Request, res: Response, next: NextFunction) {
    const apiKey = req.headers['x-api-key'];
    const validApiKey = this.configService.get<string>('API_KEY'); // Get API key from environment

    if (apiKey === validApiKey) {
      next();
    } else {
      throw new UnauthorizedException('Invalid API key');
    }
  }
}