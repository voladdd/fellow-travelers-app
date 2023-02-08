import { UsersService } from './../users/users.service';
import { Injectable } from '@nestjs/common';
import { Update, Ctx, Start, Help, On, Hears } from 'nestjs-telegraf';
import { Context as TelegrafContext } from 'telegraf';

@Injectable()
@Update()
export class EchoUpdate {
  constructor(private usersService: UsersService) {}

  @Start()
  async start(@Ctx() ctx: TelegrafContext) {
    // await ctx.reply(
    //   'Hello ' + (await ctx.telegram.getUserProfilePhotos(ctx.message.from.id)),
    // );
    //save userid, username
    const userId = ctx.message.from.id;
    const userName = ctx.message.from.username;

    await this.usersService.create({ id: userId, name: userName });

    console.log(userId, userName);
  }

  // @Help()
  // async help(@Ctx() ctx: TelegrafContext) {
  //   await ctx.reply('Send me a sticker');
  // }

  // @On('sticker')
  // async on(@Ctx() ctx: TelegrafContext) {
  //   await ctx.reply('👍');
  // }

  @Hears('weather')
  async weatherForecast(@Ctx() ctx: TelegrafContext) {
    await ctx.replyWithMarkdownV2('InlineKeyboardMarkup', {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: 'open',
              web_app: { url: 'https://voladdd.github.io/weather-forecast/' },
            },
          ],
        ],
      },
    });
  }
}
