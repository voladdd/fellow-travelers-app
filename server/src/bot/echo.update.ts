import { UsersService } from './../users/users.service';
import { Update, Ctx, Start, Hears, On } from 'nestjs-telegraf';
import { Context as TelegrafContext } from 'telegraf';

@Update()
export class EchoUpdate {
  constructor(private usersService: UsersService) { }

  @Start()
  async start(@Ctx() ctx: TelegrafContext) {
    //get user info
    const tgId = ctx.message.from.id;
    const name = ctx.message.from.username;
    const firstName = ctx.message.from.first_name;

    //check if user already inited
    const res = await this.usersService.findByTgId(tgId);
    if (!res) {
      await this.usersService.create({
        tgId,
        name,
        firstName,
      });
    }

    //reply markup
    await ctx.replyWithMarkdownV2(
      `\*Ну что народ, погнали 🚕* \n\nЧтобы найти себе попутчиков, жми на кнопку ниже \\!`,
      {
        parse_mode: 'MarkdownV2',
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: 'Забить местечко',
                web_app: { url: process.env.WEB_APP_URL },
              },
            ],
          ],
        },
      },
    );
  }

  @Hears('Какова погода')
  async weatherForecast(@Ctx() ctx: TelegrafContext) {
    await ctx.replyWithMarkdownV2(`\*Такова погода 🌞*`, {
      parse_mode: 'MarkdownV2',
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: 'Посмотреть',
              web_app: { url: 'https://voladdd.github.io/weather-forecast/' },
            },
          ],
        ],
      },
    });
  }
}
