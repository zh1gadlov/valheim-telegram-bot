import { CronJob } from 'cron';
import { TelegramService } from '../telegram/telegram.service';


export class Cron {

  constructor (
    private readonly telegram = new TelegramService()
  ) {
    new CronJob(
      '* * * * * *', // cronTime
      async () => { await this.telegram.sendBackup() },
      null, // onComplete
      true, // start
      'America/Los_Angeles' // timeZone
    );
  }

}