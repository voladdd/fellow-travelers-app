import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Validate Tg Hash', () => {
    const hash =
      'query_id=AAGnlDI2AgAAAKeUMjb01HiS&user=%7B%22id%22%3A5204251815%2C%22first_name%22%3A%22voladdd%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22voladddselivanov%22%2C%22language_code%22%3A%22en%22%7D&auth_date=1676913699&hash=a19f57154430157a046836ca6a8fe7d1fa228178553a68d23d8a40df3f887e5a';

    expect(service.validateUserData(hash)).toBeTruthy();
  });
});
