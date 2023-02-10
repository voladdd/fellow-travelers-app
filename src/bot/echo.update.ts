import { UsersService } from './../users/users.service';
import { Update, Ctx, Start, Hears } from 'nestjs-telegraf';
import { Context as TelegrafContext } from 'telegraf';

@Update()
export class EchoUpdate {
  constructor(private usersService: UsersService) {}

  @Start()
  async start(@Ctx() ctx: TelegrafContext) {
    //get user info
    const id = ctx.message.from.id;
    const name = ctx.message.from.username;
    const firstName = ctx.message.from.first_name;

    //check if user already inited
    const res = await this.usersService.findUserById(id);
    if (!res) {
      console.log('user created' + id);
      await this.usersService.create({
        id,
        name,
        firstName,
      });
    } else {
      console.log('user alreay inited');
    }

    // console.log(userId, userName);
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
