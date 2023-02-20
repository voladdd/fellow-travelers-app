import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { ConfigModule } from '@nestjs/config';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot()],
      providers: [AuthService],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should accept Valid Telegram Hash', async () => {
    const hash = process.env.WEB_APP_HASH_SAMPLE;
    expect(await service.validateUserData(hash)).toBeTruthy();
  });

  it('should not accept InValid Telegram Hash', async () => {
    expect(await service.validateUserData('invalidHash')).toBeFalsy();
  });
});
