// Código creado por 🐉𝙉𝙚𝙤𝙏𝙤𝙠𝙮𝙤 𝘽𝙚𝙖𝙩𝙨🐲 para Hinata Bot & Akeno-Himejina-BOT 
// https://github.com/TOKIO5025

const handler = async (m, { conn }) => {
  if (!m.quoted) return m.reply('❌ Debes responder a una imagen, video o audio para poder copiarlo.');

  const quotedMsg = m.quoted;
  const mtype = quotedMsg.mtype || '';
  const allowedTypes = ['imageMessage', 'videoMessage', 'audioMessage'];

  if (!allowedTypes.includes(mtype)) return m.reply('⚠️ Solo puedo copiar imágenes, videos o audios.');

  try {
    const media = await quotedMsg.download();

    if (!media) return m.reply('⚠️ No pude descargar el archivo.');

    const chatPriv = m.sender;

    switch (mtype) {
      case 'imageMessage':
        await conn.sendMessage(chatPriv, {
          image: media,
          caption: '🖼️ Aquí tienes la imagen que copiaste del estado.'
        }, { quoted: m });
        break;

      case 'videoMessage':
        await conn.sendMessage(chatPriv, {
          video: media,
          caption: '🎥 Aquí tienes el video que copiaste del estado.'
        }, { quoted: m });
        break;

      case 'audioMessage':
        await conn.sendMessage(chatPriv, {
          audio: media,
          mimetype: 'audio/mpeg',
          ptt: true
        }, { quoted: m });
        break;
    }

    if (m.isGroup) {
      await conn.sendMessage(m.chat, {
        text: `✅ @${m.sender.split('@')[0]}, te envié por privado el estado que respondiste.`,
        mentions: [m.sender]
      });
    }

  } catch (e) {
    console.error(e);
    m.reply('❌ No pude obtener el estado. Asegúrate de que el mensaje sea reciente y válido.');
  }
};

handler.help = ['get', 'getstatu', 'robarestado'];
handler.tags = ['tools'];
handler.command = /^get(statu)?|robarestado$/i;

export default handler;