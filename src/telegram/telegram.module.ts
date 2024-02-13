import { Module } from '@nestjs/common';
import { TelegramService } from './telegram.service';
import { Telegraf } from 'telegraf';


@Module({
  imports: [Telegraf],
  providers: [
    TelegramService
  ],
  controllers: [],
  exports: [TelegramService]
})
export class TelegramModule { }
