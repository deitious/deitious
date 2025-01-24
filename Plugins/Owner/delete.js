// XPLOADER-BOT 

module.exports = {
  command: ['delete', 'del'],
  operate: async ({ Xploader, m, reply, isCreator, mess }) => {
    if (!isCreator) return reply(mess.owner);

    let key = {};
    try {
      key.remoteJid = m.quoted
          ? m.quoted.fakeObj.key.remoteJid
          : m.key.remoteJid;
      key.fromMe = m.quoted ? m.quoted.fakeObj.key.fromMe : m.key.fromMe;
      key.id = m.quoted ? m.quoted.fakeObj.key.id : m.key.id;
      key.participant = m.quoted
          ? m.quoted.fakeObj.participant
          : m.key.participant;
    } catch (e) {
      console.error(e);
    }
    Xploader.sendMessage(m.chat, { delete: key });
  }
};