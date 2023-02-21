import { UsersService } from './../users/users.service';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './../users/schemas/user.schema';

describe('AuthService', () => {
  let service: AuthService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
        MongooseModule.forRoot(process.env.MONGO_URI, { dbName: 'taxi_db' }),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
      ],
      providers: [AuthService, UsersService],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should accept valid telegram hash', async () => {
    const hash = process.env.WEB_APP_HASH_SAMPLE;
    expect(await service.validateUserData(hash)).toBeTruthy();
  });

  it('should not accept invalid telegram hash', async () => {
    expect(await service.validateUserData('invalidHash')).toBeFalsy();
  });
});
