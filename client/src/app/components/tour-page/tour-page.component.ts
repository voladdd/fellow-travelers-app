import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { StatusService } from 'src/app/services/status.service';
import { TelegramWebAppService } from 'src/app/services/telegram-webapp.service';
import { ToursSerivce } from 'src/app/services/tours.service';
import { Status } from 'src/app/services/types/status';
import { TourPopulated } from 'src/app/services/types/tours';
import { User } from 'src/app/services/types/users';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-tour-page',
  templateUrl: './tour-page.component.html',
  styleUrls: ['./tour-page.component.scss']
})
export class TourPageComponent implements OnInit {
  id: string | undefined;
  tour: TourPopulated | undefined;
  participantsCount: number = 0;
  isAuthor: boolean = false;
  isParticipating: boolean = false;
  userProfile: User | undefined;
  statusList: Status[] | undefined;

  constructor(
    private telegramWebAppService: TelegramWebAppService,
    private toursSerivce: ToursSerivce,
    private usersService: UsersService,
    private statusService: StatusService,
    private route: ActivatedRoute,
  ) {
    this.initId();
    this.usersService.userProfile.subscribe(async (v) => {
      this.userProfile = v;
    })
  }

  async ngOnInit() {
    console.log(this.id);
    await this.initTour();
    await this.initStatusList();
  }

  async initId() {
    const id = (await firstValueFrom(this.route.paramMap)).get('id');

    if (id) {
      this.id = id;
    }
  }

  async initStatusList() {
    this.statusList = await this.statusService.findAll();
  }

  async initTour() {
    if (this.id) {
      this.tour = await this.toursSerivce.findById(this.id);
      this.participantsCount = this.tour.participants.length;

      if (this.userProfile) {
        const userProfileId = this.userProfile._id;

        this.isAuthor = this.tour.author._id === userProfileId;
        this.isParticipating = this.tour.participants.some((participant) => participant._id === userProfileId);
      }
    }
  }

  // TODO: save last user router path, to open it on the next session
  openExternalTelegramChat(userName: string) {
    window.open(`https://t.me/${userName}`);
  }

  async updateStatus(statusName: string) {
    if (this.id && this.statusList) {
      try {
        const statusId = this.statusList.find((status) => status.name === statusName);

        if (!statusId) {
          throw new Error(`StatusId ${statusId} was not founded`)
        }

        // TODO: return populated status with name
        await this.toursSerivce.updateStatusByStatusId(this.id, { status: statusId._id });

        switch (statusName) {
          case 'Открыт':
            this.telegramWebAppService.alert('Внимание!', 'Вы изменили статус поездки на открытый, уже скоро к вам присоединятся ваши попутчики!');
            break;
          case 'Закрыт':
            this.telegramWebAppService.alert('Внимание!', 'Вы изменили статус поездки на закрытый, вы можете связаться с вашими попутчиками через личные сообщения мессенджера.');
            break;
          case 'Завершен':
            this.telegramWebAppService.alert('Поздравляем!', 'Вы успешно завершли поездку!');
            break;
        }
      } catch (error: any) {
        this.telegramWebAppService.alert('Внимание!', 'Ошибка при попытке сменить статус поездки.');
        throw new Error(error)
      } finally {
        await this.initTour();
      }
    }
  }

  async kick(userId: string) {
    if (this.id) {
      try {
        // TODO: getting populated already tour from server
        await this.toursSerivce.kickByUserId(this.id, userId);
        // TODO: make confirmation dialog before kicking user
        this.telegramWebAppService.alert('Внимание!', 'Вы выгнали пользователя из поездки.');
      } catch (error: any) {
        this.telegramWebAppService.alert('Ошибка при попытке выгнать пользователя', error);
        throw new Error(error)
      } finally {
        await this.initTour();
      }
    }
  }

  async join() {
    if (this.id) {
      try {
        // TODO: getting populated already tour from server
        await this.toursSerivce.join(this.id);
        this.telegramWebAppService.alert('Ура!', 'Вы успешно присоединились к туру.');
      } catch (error: any) {
        this.telegramWebAppService.alert('Ошибка при попытке присоединиться', error);
        throw new Error(error)
      } finally {
        await this.initTour();
      }
    }
  }

  async leave() {
    if (this.id) {
      try {
        // TODO: getting populated already tour from server
        await this.toursSerivce.leave(this.id);
        this.telegramWebAppService.alert('Возвращайтесь!', 'Вы покинули поездку.');
      } catch (error: any) {
        this.telegramWebAppService.alert('Ошибка при попытке выйти', error);
        throw new Error(error);
      } finally {
        await this.initTour();
      }
    }
  }
}
