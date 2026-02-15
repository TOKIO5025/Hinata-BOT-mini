const handler = async (m, { conn }) => {

  if (!m.quoted) return conn.reply(m.chat, '👁️‍🗨️ Responde a una imagen, video o audio enviado como "ver una vez".', m);

  let mensaje = m.quoted;

  let viewOnce = mensaje?.msg?.viewOnce === true;

  let tipo = mensaje.mtype;

  // Intenta forzar la vista interna del mensaje

  if (viewOnce && mensaje.msg?.[tipo]?.contextInfo?.quotedMessage) {

    mensaje.msg = mensaje.msg[tipo]; // Reasigna el contenido real

    tipo = Object.keys(mensaje.msg)[0]; // imageMessage, videoMessage...

  }

  try {

    const media = await mensaje.download();

    if (tipo === 'imageMessage') {

      await conn.sendMessage(m.chat, {

        image: media,

        caption: '🖼️ Imagen revelada... el ojo de Kira todo lo ve.',

      }, { quoted: m });

    } else if (tipo === 'videoMessage') {

      await conn.sendMessage(m.chat, {

        video: media,

        caption: '🎥 Video desbloqueado... ahora es parte del juicio de Kira.',

      }, { quoted: m });

    } else if (tipo === 'audioMessage') {

      await conn.sendMessage(m.chat, {

        audio: media,

        mimetype: 'audio/mp4',

        ptt: true

      }, { quoted: m });

    } else {

      conn.reply(m.chat, '❌ Ese mensaje no es una imagen, video o audio válido.', m);

    }

  } catch (e) {

    conn.reply(m.chat, '⚠️ No se pudo recuperar el archivo. Tal vez ya no está disponible.', m);

  }

};

handler.command = /^ver$/i;

export default handler;