import { UsersService } from '../users/users.service';
import { verifyTelegramWebAppData } from './utils/other/verifyTelegramWebAppData';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  /**
   * @param telegramInitData
   * @returns Telegram user object
   */
  async validateUserData(telegramInitData: string): Promise<any> {
    //get user object
    //check if valid telegram hash
    const res = await verifyTelegramWebAppData(telegramInitData);
    if (!res) {
      return null;
    }
    //check if user exist in db
    const user = await this.usersService.findByTgId(res.id);
    if (user) {
      return user;
    }
    return null;
  }
}
