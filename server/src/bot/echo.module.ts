import { EchoUpdate } from './echo.update';
import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [UsersModule],
  providers: [EchoUpdate],
})
export class EchoModule {}
