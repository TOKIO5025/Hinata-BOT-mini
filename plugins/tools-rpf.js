const handler = async (m, { conn, text, usedPrefix, command }) => {

  let jid;

  if (m.quoted) {

    // Si respondió a un mensaje, tomamos el sender de ese mensaje

    jid = m.quoted.sender || m.quoted.key.participant || m.quoted.key.remoteJid;

  } else if (text) {

    // Si escribió texto, puede ser número o mención

    // Intentamos extraer número

    const numero = text.replace(/\D/g, '');

    if (numero.length >= 8) {

      jid = numero + '@s.whatsapp.net';

    } else {

      // Puede ser mención directa: @xxxx

      if (m.mentionedJid && m.mentionedJid.length) {

        jid = m.mentionedJid[0];

      } else {

        throw `✳️ Usa el comando así:\n${usedPrefix + command} +50248019799\nO responde a un estado o menciona a alguien.`;

      }

    }

  } else if (m.mentionedJid && m.mentionedJid.length) {

    // Si solo menciona sin texto

    jid = m.mentionedJid[0];

  } else {

    throw `✳️ Usa el comando así:\n${usedPrefix + command} +50248019799\nO responde a un estado o menciona a alguien.`;

  }

  try {

    // Obtener la foto de perfil del JID

    const url = await conn.profilePictureUrl(jid, 'image');

    // Mandar la foto y mencionar si es grupo

    await conn.sendMessage(m.chat, {

      image: { url },

      caption: `📸 Foto de perfil de @${jid.split('@')[0]}`,

      mentions: [jid]

    }, { quoted: m });

  } catch (e) {

    throw `❌ No se pudo obtener la foto de perfil. Puede que el usuario no tenga foto o tenga privacidad restringida.`;

  }

};

handler.command = ['rpf'];

handler.help = ['rpf <numero|mencion>'];

handler.tags = ['tools'];

export default handler;