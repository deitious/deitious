// XPLOADER BOT by Tylor

const axios = require('axios');

module.exports = {
  command: ['vcc'],
  operate: async ({ m, args }) => {
    const type = args[0] || 'MasterCard';
    const count = args[1] || 1;
    const apiUrl = `https://api.awan-attack.my.id/vcc-generator?type=${type}&count=${count}`;

    try {
      const response = await axios.get(apiUrl);

      if (response.data && response.data.data && response.data.data.length > 0) {
        let vccList = response.data.data.map((vcc, index) => {
          return `VCC ${index + 1}:\nCardholder Name: ${vcc.cardholderName}\nNumber: ${vcc.cardNumber}\nCVC: ${vcc.cvv}\nExpiration Date: ${vcc.expirationDate}`;
        }).join('\n\n');

        m.reply(`Here are the VCC(s) you requested:\n\n${vccList}\n\nExample of how to create a VCC:\n1. Visit the official website of the bank or VCC service provider.\n2. Choose the desired VCC type (e.g., MasterCard, Visa).\n3. Fill out the registration form with correct information.\n4. Wait for the VCC verification and activation process.\n\nAfter successfully activating the VCC, make sure to:\n- Store VCC data securely.\n- Use the VCC only for legitimate transactions.\n- Check the VCC balance regularly.`);
      } else {
        m.reply('Sorry, failed to retrieve VCC data or no data found.');
      }
    } catch (error) {
      console.error('Error fetching VCC data:', error);
      m.reply('Sorry, an error occurred while retrieving VCC data.');
    }
  }
};