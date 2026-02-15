import { watchFile, unwatchFile } from 'fs'

import chalk from 'chalk'

import { fileURLToPath } from 'url'

import fs from 'fs'

import moment from 'moment-timezone'

global.botNumber = '' 

global.owner = [

  ['50248019799', 'Neowa.x', true],

  ['', '', true],

  ['','',true]

  ['51927196120','elmer',true]

]

global.mods = []

global.prems = []

global.suittag = ['50']

global.botname = ' Hinata-BOT-Mini'

global.author = 'Neowa.x'

global.sticker = 'sticker created by Hinata-BOT-Mini By Neowa.x'

global.sessions = 'Sessions'

global.jadi = 'JadiBots'

global.moneda = 'dolares'

global.multiplier = 60

global.prefix = /^[./!#?]/

global.channel = 'https://whatsapp.com/channel/0029Vaqe1Iv65yDAKBYr6z0A'

global.md = 'https://github.com/TOKIO5025/Hinata-BOT-mini'

global.ch = { id: '120363341523880410@newsletter' }

let file = fileURLToPath(import.meta.url)

watchFile(file, () => {

  unwatchFile(file)

  console.log(chalk.cyanBright(`✨ [CONFIG] Se han actualizado los ajustes del bot`))

  import(`${file}?update=${Date.now()}`)

})