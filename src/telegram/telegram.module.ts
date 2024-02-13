import { Module } from '@nestjs/common';
import { TelegramService } from './telegram.service';


@Module({
  imports: [],
  providers: [
    TelegramService
  ],
  controllers: [

  ]
})
export class TelegramModule { }
