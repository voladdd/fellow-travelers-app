import { EchoUpdate } from './bot/echo.update';
import { EchoModule } from './bot/echo.module';
import { Module } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TelegrafModule.forRoot({
      botName: process.env.TELEGRAM_BOT_NAME,
      token: process.env.TELEGRAM_BOT_TOKEN,
      include: [EchoModule],
    }),
    EchoModule,
  ],
  controllers: [],
  providers: [EchoUpdate],
})
export class AppModule {}
