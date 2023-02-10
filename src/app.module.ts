import { EchoModule } from './bot/echo.module';
import { Module } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { ToursModule } from './tours/tours.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI, { dbName: 'taxi_db' }),
    TelegrafModule.forRoot({
      botName: process.env.TELEGRAM_BOT_NAME,
      token: process.env.TELEGRAM_BOT_TOKEN,
      include: [EchoModule],
    }),
    UsersModule,
    ToursModule,
    EchoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
