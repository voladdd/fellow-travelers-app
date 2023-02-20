import { verifyTelegramWebAppData } from './utils/other/verifyTelegramWebAppData';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  //   constructor(private usersService: UsersService) {}
  //   async validateUser(username: string, pass: string): Promise<any> {
  //     const user = await this.usersService.findOne(username);
  //     if (user && user.password === pass) {
  //       const { password, ...result } = user;
  //       return result;
  //     }
  //     return null;
  //   }
  async validateUserData(telegramInitData: string): Promise<any> {
    return await verifyTelegramWebAppData(telegramInitData);
  }
}
