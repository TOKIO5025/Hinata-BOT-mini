const handler = async (m, { conn }) => {
const start = performance.now();
let { key } = await conn.sendMessage(m.chat, { text: '⏱️ ping...' }, { quoted: m });
const end = performance.now();
const ping = (end - start).toFixed(0);
await conn.sendMessage(m.chat, { text: `🏓 *Pong!* ${ping}ms`, edit: key }, { quoted: m });
};
handler.help = ['ping'];
handler.tags = ['main'];
handler.command = /^(ping|p)$/i
handler.owner = false;

export default handler;
