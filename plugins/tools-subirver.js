const handler = async (m, { conn, command }) => {

  if (!m.quoted) {

    await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } });

    return m.reply('✏️ *Responde a una imagen, video o audio* para enviarlo como *ver una vez*.');

  }

  const type = m.quoted.mtype || '';

  const media = await m.quoted.download().catch(() => null);

  if (!media) {

    await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } });

    return m.reply('❌ No se pudo descargar el archivo. Asegúrate de que sea un mensaje válido.');

  }

  // Reacción de carga

  await conn.sendMessage(m.chat, { react: { text: '📤', key: m.key } });

  const options = { quoted: m };

  try {

    if (type === 'imageMessage') {

      await conn.sendMessage(m.chat, {

        image: media,

        viewOnce: true,

        caption: `📸 Imagen enviada como *ver una vez*`

      }, options);

    } else if (type === 'videoMessage') {

      await conn.sendMessage(m.chat, {

        video: media,

        viewOnce: true,

        caption: `🎥 Video enviado como *ver una vez*`

      }, options);

    } else if (type === 'audioMessage') {

      await conn.sendMessage(m.chat, {

        audio: media,

        mimetype: 'audio/mp4',

        ptt: true,

        viewOnce: true

      }, options);

    } else {

      return m.reply('⚠️ Solo puedes reenviar imágenes, videos o audios como *ver una vez*.');

    }

    // Reacción final con estilo Tokio

    await conn.sendMessage(m.chat, { react: { text: '🌸', key: m.key } });

  } catch (e) {

    console.error(e);

    m.reply('❌ Ocurrió un error al reenviar el contenido como *ver una vez*.');

  }

};

handler.help = ['subirver', 'tokio subir'];

handler.tags = ['tools'];

handler.command = /^(subirver|tokio subir)$/i;

export default handler;