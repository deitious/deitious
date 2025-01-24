// XPLOADER-BOT by Tylor

module.exports = {
  command: ['owner'],
  operate: async ({ m, Xploader, sender }) => {
    let list = [];
    for (let i of [global.ownernumber]) {
      list.push({
        displayName: await Xploader.getName(i),
        vcard: `BEGIN:VCARD\nVERSION:3.0\nN:${global.ownername}\nFN:${global.ownername}\nitem1.TEL;waid=${i.split('@')[0]}:${i.split('@')[0]}\nitem1.X-ABLabel:Mobile\nEND:VCARD`
      });
    }
    
    await Xploader.sendMessage(m.chat, { contacts: { displayName: `${list.length} Contact`, contacts: list }, mentions: [sender] }, { quoted: m });
  }
};