import { Module } from '@nestjs/common';
import { TelegramModule } from '../telegram/telegram.module';
import { Cron } from './cron.service';


@Module({
  imports: [TelegramModule],
  providers: [Cron],
  controllers: [],
  exports: [Cron]
})
export class CronModule { }
