import { ApiKeyMiddleware } from './api-key.middleware';
import { ConfigService } from '@nestjs/config';

describe('ApiKeyMiddleware', () => {
  it('should be defined', () => {
    expect(new ApiKeyMiddleware(new ConfigService())).toBeDefined();
  });
});
