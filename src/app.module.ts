import { Module, Global } from '@nestjs/common';
import { ConfigService } from './config.service';
import { AuthRequestService } from './authentication/auth.request.service';
import { TelegramModule } from './telegram/telegram.module';
import { CronModule } from './cron/cron.module';


@Global()
@Module({
  imports: [
    TelegramModule,
    CronModule
  ],
  controllers: [],
  providers: [
    AuthRequestService,
    ConfigService,
  ],
  exports: [
    AuthRequestService,
    ConfigService
  ]
})
export class AppModule { }
