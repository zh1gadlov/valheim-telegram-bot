import { CronJob } from 'cron';
import { TelegramService } from '../telegram/telegram.service';
import { Telegraf } from 'telegraf';
import { ConfigService } from '../config.service';

const config = new ConfigService()


export class Cron {

  constructor (
    private readonly telegram = new TelegramService(
      new Telegraf(config.get('BOT_TOKEN'))
    )
  ) {
    telegram.observer()
    new CronJob(
      '* * * * * *', // cronTime
      async () => { await this.telegram.sendBackup() },
      null, // onComplete
      true, // start
      'America/Los_Angeles' // timeZone
    );
  }

}