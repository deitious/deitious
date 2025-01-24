// XPLOADER-BOT 

const { downloadContentFromMessage } = require('@whiskeysockets/baileys'); // Import the function

module.exports = {
  command: ['dlvo', 'vv', 'rvo'],
  operate: async ({ Xploader, m, reply, isCreator, mess }) => {
    if (!isCreator) return reply(mess.owner);
    if (!m.quoted) return reply(`*Please reply to a view once message!*`);
    if (m.quoted.mtype !== 'viewOnceMessageV2') return reply(`*Is that a view once message?*`);

    let msg = m.quoted.message;
    let type = Object.keys(msg)[0];
    let media = await downloadContentFromMessage(msg[type], type === 'imageMessage' ? 'image' : 'video');
    let buffer = Buffer.from([]);
    for await (const chunk of media) {
      buffer = Buffer.concat([buffer, chunk]);
    }
    if (/video/.test(type)) {
      return Xploader.sendFile(m.chat, buffer, 'media.mp4', msg[type].caption || `*@᙭ᑭᒪOᗩᗪᗴᖇ ᗷOT*`, m);
    } else if (/image/.test(type)) {
      return Xploader.sendFile(m.chat, buffer, 'media.jpg', msg[type].caption || '*@᙭ᑭᒪOᗩᗪᗴᖇ ᗷOT*', m);
    }
  }
};