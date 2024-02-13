import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from './config.service';
import { AuthRequestService } from './authentication/auth.request.service';
import { TelegramModule } from './telegram/telegram.module';


@Global()
@Module({
  imports: [
    TelegramModule,
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
