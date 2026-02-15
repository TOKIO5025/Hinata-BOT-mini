export async function before(m, { conn, usedPrefix }) {
  if (!m.isGroup) return
  if (!m.messageStubType) return

  const who = m.messageStubParameters?.[0]
  if (!who) return

  const user = `@${who.split('@')[0]}`
  const botname = global.author || 'Nazuna Bot'

  const meta = await conn.groupMetadata(m.chat)
  const members = meta.participants.length

  const now = new Date()
  const time = now.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
  const date = now.toLocaleDateString('es-ES')

  const fkontak = {
    key: {
      participants: '0@s.whatsapp.net',
      remoteJid: 'status@broadcast',
      fromMe: false,
      id: 'Nazuna'
    },
    message: {
      contactMessage: {
        displayName: botname,
        vcard: `BEGIN:VCARD
VERSION:3.0
FN:${botname}
ORG:${botname};
TEL;type=CELL;type=VOICE;waid=0:+0
END:VCARD`
      }
    }
  }

  let profile
  try {
    profile = await conn.profilePictureUrl(who, 'image')
  } catch {
    profile = 'https://i.imgur.com/JP52fdP.png'
  }

  // Cambia estos fondos si quieres
  const bgWelcome = 'https://i.imgur.com/4yq5m7U.jpeg'
  const bgBye = 'https://i.imgur.com/2o9nM8j.jpeg'

  const makeCard = (title, desc, bg) =>
    `https://api.ryuu-dev.offc.my.id/tools/WelcomeLeave?` +
    `title=${encodeURIComponent(title)}` +
    `&desc=${encodeURIComponent(desc)}` +
    `&profile=${encodeURIComponent(profile)}` +
    `&background=${encodeURIComponent(bg)}`

  // ✅ WELCOME
  if (m.messageStubType === 27) {
    const img = makeCard(
      'PROTOCOL: INTEGRACION',
      'ya te e registrada. No falles.',
      bgWelcome
    )

    await conn.sendMessage(m.chat, {
      image: { url: img },
      caption: `
╭━━〔 🌙 UMBRAL NOCTURNO🐉 〕━━╮
┃ ✦ Nuevo rastro detectadO
┃
┃ 🪪 Identidad: ${user}
┃ 👥 Comunidad: ${members} señales activas
┃ 🕒 Momento: ${time}
┃ 📅 Registro: ${date}
┃
┃ ⛓️ *Advertencia suave:*
┃ aqui se respeta se convive y se fluye.
┃ Si vienes a romper el ambiente…
┃ yo misma te saco del grupo 🙃 🐉
╰━━━━━━━━━━━━━━━━━━━━━━╯

✦ Toca un botón y no te hagas el perdido:
`.trim(),
      footer: `© ${botname} • vigilancia elegante`,
      mentions: [who],
      buttons: [
        { buttonId: `${usedPrefix}reg`, buttonText: { displayText: '🧷 Activar perfil' }, type: 1 },
        { buttonId: `${usedPrefix}menu`, buttonText: { displayText: '🕸️ Ver comandos' }, type: 1 }
      ],
      headerType: 4
    }, { quoted: fkontak })
  }

  // ✅ DESPEDIDA
  if (m.messageStubType === 28 || m.messageStubType === 32) {
    const img = makeCard(
      'PROTOCOL: DESCONEXION',
      'La red pierde un rastro. Fin de transmisión.',
      bgBye
    )

    await conn.sendMessage(m.chat, {
      image: { url: img },
      caption: `
╭━━〔 🕳️ Despedida  Neowa.x〕━━╮
┃ ✦ se salió por nub 
┃
┃ 🪪 Usuario: ${user}
┃ 🕒 Hora: ${time}
┃ 📅 Fecha: ${date}
┃
┃ No pregunto razones.
┃ Solo registro lo inevitable.
┃
┃ *Si regresas…*
┃ ya veré si te abro la puerta 😼
╰━━━━━━━━━━━━━━━━━━━━━━╯
`.trim(),
      footer: `© ${botname} • silencio en línea`,
      mentions: [who],
      buttons: [
        { buttonId: `${usedPrefix}menu`, buttonText: { displayText: '📟 Panel' }, type: 1 }
      ],
      headerType: 4
    }, { quoted: fkontak })
  }
                           }
