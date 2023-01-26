import { EchoUpdate } from './echo.update';
import { Module } from '@nestjs/common';

@Module({
  providers: [EchoUpdate],
})
export class EchoModule {}
