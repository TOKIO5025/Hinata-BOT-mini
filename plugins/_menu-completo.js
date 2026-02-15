import fs from 'fs'

import path from 'path'

// 🔥 Contador global de audios

let menuAudioIndex = 0

const handler = async (m, ctx) => {

  const { conn, usedPrefix } = ctx

  const userJid = m.sender

  const username = userJid.split('@')[0]

  const img = 'https://files.catbox.moe/gykqzf.jpg'

  const sections = {

    downloader: [

      `• ${usedPrefix}play <texto>`,

      `• ${usedPrefix}ig <url>`,

      `• ${usedPrefix}instagram <url>`,

      `• ${usedPrefix}fb <url>`,

      `• ${usedPrefix}facebook <url>`,

      `• ${usedPrefix}soundcloud <texto>`

    ],

    owner: [

      `• ${usedPrefix}update`,

      `• ${usedPrefix}cleartmp`,

      `• ${usedPrefix}detectar`

    ],

    maker: [

      `• ${usedPrefix}s`,

      `• ${usedPrefix}sticker`

    ],

    grupo: [

      `• ${usedPrefix}kick @tag`,

      `• ${usedPrefix}link`

    ]

  }

  const menuText = `

╔═════〔 🌸 MENÚ HINATA 〕═════╗

Hola @${username} 💫

📥 *Descargas*

${sections.downloader.join('\n')}

⚙️ *Owner*

${sections.owner.join('\n')}

🎭 *Stickers*

${sections.maker.join('\n')}

👥 *Grupo*

${sections.grupo.join('\n')}

╚════════════════════════════╝

`.trim()

  const msgContent = {

    product: {

      productImage: { url: img },

      productId: String(Date.now()),

      title: '🌸 Hinata Bot',

      description: 'Centro de comandos',

      currencyCode: 'USD',

      priceAmount1000: '0',

      retailerId: 'HB-MENU',

      url: 'https://wa.me/0',

      productImageCount: 1

    },

    businessOwnerJid: userJid,

    caption: menuText,

    footer: 'Hinata Bot • Menú Dinámico',

    interactiveButtons: [

      {

        name: 'cta_url',

        buttonParamsJson: JSON.stringify({

          display_text: '🌐 Canal',

          url: 'https://whatsapp.com/channel/0029Vaqe1Iv65yDAKBYr6z0A'

        })

      }

    ],

    mentions: [userJid]

  }

  // 🔹 Enviar menú

  await conn.sendMessage(m.chat, msgContent, { quoted: m })

  await new Promise(resolve => setTimeout(resolve, 1200))

  // 🔥 Lista de audios en la carpeta /menu

  const audios = [

    'menu.mp3',

    'menu2.mp3',
    
    'menu5.mp3',

    'menu7.mp3'
  ]

  // 🔹 Seleccionar audio actual

  const audioName = audios[menuAudioIndex]

  // 🔹 Avanzar índice

  menuAudioIndex++

  if (menuAudioIndex >= audios.length) {

    menuAudioIndex = 0

  }

  const audioPath = path.join(process.cwd(), 'menu', audioName)

  if (fs.existsSync(audioPath)) {

    await conn.sendMessage(m.chat, {

      audio: fs.readFileSync(audioPath),

      mimetype: 'audio/mpeg',

      ptt: true

    }, { quoted: m })

  }

}

handler.command = ['menu', 'help', 'allmenu']

export default handler