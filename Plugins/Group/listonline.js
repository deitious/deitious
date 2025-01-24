// XPLOADER-BOT by Tylor

module.exports = {
  command: ['listonline', 'onlinemembers'],
  operate: async (context) => {
    const { m, mess, args, store, botNumber, Xploader, reply } = context;
    if (!m.isGroup) return reply(mess.group);
    
    let id = args && /\d+\-\d+@g.us/.test(args[0]) ? args[0] : m.chat;
    let presences = store.presences[id];
    
    if (!presences) {
      return reply('*No online members detected in this group.*');
    }

    let online = [...Object.keys(presences), botNumber];
    let liston = 1;
    Xploader.sendText(m.chat, '*ONLINE MEMBERS IN THIS GROUP*\n\n' + online.map(v => `${liston++} . @` + v.replace(/@.+/, '')).join`\n`, m, { mentions: online });
  }
};