import { CustomAuthGuard } from './custom-auth.guard';
import { Controller, Post, Request, UseGuards } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  @UseGuards(CustomAuthGuard)
  @Post('/login')
  async login(@Request() req) {
    return req.user;
  }
}
