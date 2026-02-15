// ytmp3 (nombre o link) usando sylphy.xyz
// Requiere Node 18+ (fetch global)

async function ytSearchToUrl(query) {
  // Busca en YouTube y agarra el primer videoId del HTML
  const q = encodeURIComponent(query.trim())
  const res = await fetch(`https://www.youtube.com/results?search_query=${q}`, {
    headers: {
      // ayuda a que YouTube devuelva HTML normal
      'user-agent': 'Mozilla/5.0 (Linux; Android 11) AppleWebKit/537.36 Chrome/120 Safari/537.36'
    }
  })
  const html = await res.text()

  // primer videoId del resultado
  const match = html.match(/"videoId":"([a-zA-Z0-9_-]{11})"/)
  if (!match) return null

  return `https://www.youtube.com/watch?v=${match[1]}`
}

let handler = async (m, { conn, text, usedPrefix, command }) => {
  try {
    if (!text) {
      return conn.reply(
        m.chat,
        `◈━━━━━━━━━━━━━━━━◈
│❒ Uso:
│❒ ${usedPrefix + command} <nombre o link>
│❒ Ejemplos:
│❒ ${usedPrefix + command} hasta la piel
│❒ ${usedPrefix + command} https://youtu.be/dQw4w9WgXcQ
┗━━━━━━━━━━━━━━━┛`,
        m
      )
    }

    await conn.sendMessage(m.chat, { react: { text: '⌛', key: m.key } })

    let input = text.trim()
    let ytUrl = null

    // Si es link, usarlo directo
    if (/^https?:\/\/\S+/i.test(input)) {
      ytUrl = input
    } else {
      // Si es nombre, buscar en YouTube
      ytUrl = await ytSearchToUrl(input)
      if (!ytUrl) throw 'No encontré resultados en YouTube con ese nombre.'
    }

    const apiKey = 'sylphy-toxSS2i'
    const apiUrl = `https://sylphy.xyz/download/ytmp3?url=${encodeURIComponent(ytUrl)}&api_key=${encodeURIComponent(apiKey)}`

    const res = await fetch(apiUrl)
    const data = await res.json().catch(() => null)

    if (!res.ok || !data) throw `API error (${res.status})`
    if (data.status === false || data.success === false) throw (data.message || 'No se pudo convertir a mp3.')

    const result = data.result || data.data || data

    const dl =
      result?.download ||
      result?.download_url ||
      result?.url ||
      result?.link ||
      result?.mp3 ||
      result?.audio

    const title = result?.title || result?.judul || result?.name || 'YTMP3'
    const size = result?.size || result?.filesize || result?.file_size || null

    if (!dl || typeof dl !== 'string') throw 'No encontré el link de descarga en la respuesta.'

    await conn.sendMessage(
      m.chat,
      {
        audio: { url: dl },
        mimetype: 'audio/mpeg',
        fileName: `${title}.mp3`
      },
      { quoted: m }
    )

    await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })

    await conn.reply(
      m.chat,
      `🎵 *YTMP3 listo*
📌 *Título:* ${title}${size ? `\n📦 *Tamaño:* ${size}` : ''}`,
      m
    )
  } catch (e) {
    console.error('ytmp3 error:', e)
    await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
    conn.reply(m.chat, `❌ Error: ${String(e?.message || e)}`, m)
  }
}

handler.help = ['ytmp3 <nombre|url>']
handler.tags = ['download']
handler.command = ['ytmp3', 'ytaudio', 'yta']

export default handler
