module.exports = {
  command: ['owner'],
  operate: async ({ m, Xploader, sender }) => {
    try {
      const ownerList = [];
      const ownerNumbers = [global.ownernumber.includes('@') ? global.ownernumber : `${global.ownernumber}@s.whatsapp.net`];

      for (const number of ownerNumbers) {
        const displayName = await Xploader.getName(number);
        ownerList.push({
          displayName: displayName || global.ownername, // Use owner's name or fallback
          vcard: `BEGIN:VCARD\nVERSION:3.0\nN:${global.ownername}\nFN:${global.ownername}\nitem1.TEL;waid=${number.split('@')[0]}:${number.split('@')[0]}\nitem1.X-ABLabel:Mobile\nEND:VCARD`,
        });
      }

      await Xploader.sendMessage(
        m.chat,
        { contacts: { displayName: `${ownerList.length} Contact`, contacts: ownerList }, mentions: [sender] },
        { quoted: m }
      );
    } catch (error) {
      console.error('Error sending owner contact:', error.message);
      await Xploader.sendMessage(
        m.chat,
        { text: `*Error:* ${error.message}` },
        { quoted: m }
      );
    }
  },
};