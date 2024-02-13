import { ConfigService } from '../config.service'
import { CronJob } from 'cron';
import { Telegraf } from 'telegraf'
import { message } from 'telegraf/filters'
import { create } from 'tar'


const config = new ConfigService()

export class TelegramService {
  constructor(
    private bot = new Telegraf(config.get('BOT_TOKEN'))
  ) {
    this.observer()
    
    new CronJob(
      '* * * * * *', // cronTime
      async () => { await this.sendBackup() },
      null, // onComplete
      true, // start
      'America/Los_Angeles' // timeZone
    );
    // this.sendBackup()

  }

  async sendBackup(){
    create(
      {
        file: 'backup/backup.tgz',
        cwd: process.cwd()+'/../.config/unity3d/IronGate/Valheim/worlds_local',
        z: true
      },
      ['12312331321.db', '12312331321.fwl']
    ).then(() => {
      this.bot.telegram.sendDocument(
        config.get('CHAT_ID'),
        {
          source: 'backup/backup.tgz',
          filename: "backup.tgz"
        }
      )
    })
  }

  async observer(){


    this.bot.on(message('text'), async (ctx) => {
      console.log(ctx.message)
      if (ctx.message.text == 'backup')
        await this.sendBackup()

    })
    this.bot.launch()
  }

} 