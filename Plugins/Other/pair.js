// XPLOADER-BOT by Tylor

const fetch = require('node-fetch');

module.exports = {
    command: ['pair'],
    operate: async (context) => {
        const { m, mess, text, isCreator } = context;
        if (!isCreator) return m.reply(mess.owner);
        if (!text) return m.reply('*Please provide a phone number*\n\nExample: .pair 253855856885');

        // Remove "+" sign and spaces from the phone number
        const number = text.replace(/\+|\s/g, '').trim();
        const primaryApiUrl = `https://xploaderpair-aa3e628aceb3.herokuapp.com/code?number=${encodeURIComponent(number)}`;
        const fallbackApiUrl = `https://xploader-pair.onrender.com/code?number=${encodeURIComponent(number)}`;

        try {
            // Try the primary API first
            let response = await fetch(primaryApiUrl);
            if (!response.ok) {
                // If primary API fails, use the fallback API
                response = await fetch(fallbackApiUrl);
                if (!response.ok) {
                    throw new Error(`API request failed with status ${response.status}`);
                }
            }
            const data = await response.json();
            const pairCode = data.code || 'No code received';

            await m.reply(`*Pair Code:- \`\`\`${pairCode}\`\`\``);
            
            //Send instructions
      await m.reply(`*How to Link the Pair Code with WhatsApp:*\n1. Open WhatsApp on your phone.\n2. Go to Settings > Linked Devices.\n3. Tap on 'Link a Device' then tap link with phone.\n4. Enter the pair code sent above.\n5. Alternatively, you can tap the WhatsApp notification sent to your phone and enter the pair code.\n\n*Important:* The pair code \`${pairCode}\` is only valid for two minutes. Use the session ID sent to your WhatsApp to deploy Xploader bot.`);
        } catch (error) {
            await m.reply(`*Error fetching pair code*\n${error.message}`);
        }
    }
};