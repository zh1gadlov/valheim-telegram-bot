import { ConfigService } from '../config.service'
import { Telegraf } from 'telegraf'
import { message } from 'telegraf/filters'
import { create } from 'tar'


const config = new ConfigService()

export class TelegramService {
  constructor(
    private bot: Telegraf
  ) {
    // this.observer()
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