import { Strategy } from 'passport-custom';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class CustomStrategy extends PassportStrategy(Strategy, 'custom') {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(req: Request): Promise<any> {
    const data = req.headers['user-data'];
    if (!data) {
      throw new UnauthorizedException();
    }
    const user = await this.authService.validateUserData(data);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
