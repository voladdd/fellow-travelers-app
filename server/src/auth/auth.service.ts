import { Injectable } from '@nestjs/common';
import { createHmac } from 'node:crypto';

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
  async validateUserData(data_check_string: string): Promise<any> {
    const data_check_string_hash = '123';
    const secret_key = createHmac('sha256', process.env.TELEGRAM_BOT_TOKEN)
      .update('WebAppData')
      .digest('hex');
    const hash = createHmac('sha256', secret_key)
      .update(data_check_string)
      .digest('hex');

    if (data_check_string_hash === hash) {
      return true;
    }
    return false;
  }
}
