// XPLOADER BOT by Tylor

const { getDevice } = require('@whiskeysockets/baileys'); // Import getDevice from baileys

module.exports = {
  command: ['device', 'getdevice'],
  operate: async ({ Xploader, m, reply }) => {
    if (!m.quoted) {
      return reply('*Please quote a message to use this command!*');
    }
    
    console.log('Quoted Message:', m.quoted);
console.log('Quoted Key:', m.quoted?.key);

    try {
      // Get the quoted message
      const quotedMsg = await m.getQuotedMessage();

      if (!quotedMsg) {
        return reply('*Could not detect, please try with newly sent message!*');
      }

      const messageId = quotedMsg.key.id;

      // Determine the device using the getDevice function from Baileys
      const device = getDevice(messageId) || 'Unknown';

      reply(`The message is sent from *${device}* device.`);
    } catch (err) {
      console.error('Error determining device:', err);
      reply('Error determining device: ' + err.message);
    }
  }
};