const { downloadContentFromMessage } = require('@whiskeysockets/baileys');

module.exports = {
  command: ['dlvo', 'vv', 'rvo'],
  operate: async ({ Cypher, m, reply, isCreator, mess }) => {
    if (!isCreator) return reply(mess.owner);
    if (!m.quoted) return reply(`*Please reply to a view once message!*`);

    let msg = m.msg?.contextInfo?.quotedMessage
    let type = Object.keys(msg)[0];

    if (!/image|video/.test(type)) return reply(`*Only view once images and videos are supported!*`);

    try {
      let media = await downloadContentFromMessage(msg[type], type === 'imageMessage' ? 'image' : 'video');
      let buffer = Buffer.from([]);
      for await (const chunk of media) {
        buffer = Buffer.concat([buffer, chunk]);
      }

      let filename = type === 'imageMessage' ? 'media.jpg' : 'media.mp4';
      let caption = msg[type]?.caption || global.wm;

      return Cypher.sendFile(m.chat, buffer, filename, caption, m);
    } catch (error) {
      console.error(error);
      reply(`*Failed to retrieve media. The message might not be a valid view-once media.*`);
    }
  }
};