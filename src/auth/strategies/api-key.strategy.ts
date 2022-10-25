import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';

import { HeaderAPIKeyStrategy } from 'passport-headerapikey';

@Injectable()
export class ApiKeyStrategy extends PassportStrategy(
  HeaderAPIKeyStrategy,
  'api-key',
) {
  constructor(private readonly configService: ConfigService) {
    super({ header: 'X-Api-Key', prefix: '' }, false, async (apiKey, done) => {
      return this.validate(apiKey, done);
    });
  }

  public validate(apiKey: string, done: (error: Error, data) => {}) {
    const apiKeys = this.configService.get('API_KEYS');
    const validApiKeys = apiKeys.split('\n').filter(function (value) {
      return value !== '';
    });

    if (validApiKeys.includes(apiKey)) {
      return done(null, true);
    }
    return done(new UnauthorizedException(), null);
  }
}
