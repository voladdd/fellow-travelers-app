import { Update, Ctx, Start, Help, On, Hears } from 'nestjs-telegraf';
import { Context as TelegrafContext } from 'telegraf';

@Update()
export class EchoUpdate {
  @Start()
  async start(@Ctx() ctx: TelegrafContext) {
    await ctx.reply('Hello ' + ctx.message.from.first_name);
  }

  @Help()
  async help(@Ctx() ctx: TelegrafContext) {
    await ctx.reply('Send me a sticker');
  }

  @On('sticker')
  async on(@Ctx() ctx: TelegrafContext) {
    await ctx.reply('👍');
  }

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
