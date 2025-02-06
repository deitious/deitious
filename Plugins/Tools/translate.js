const fetch = require('node-fetch'); 

module.exports = {
  command: ['translate', 'trt'],
  operate: async ({ m, args, prefix, command, reply }) => {
    const defaultLang = 'en'; // Default language for translation

    const usageGuide = `
🚀 *How to Use the Translate Command:*

📌 *Example 1:* Translate text from any language to English
   - Command: ${prefix}${command} en [Your Text Here]
   - Usage: ${prefix}${command} en Hello World

📌 *Example 2:* Translate text to a specific language
   - Command: ${prefix}${command} <language_code> [Your Text Here]
   - Usage: ${prefix}${command} fr Bonjour tout le monde

🌐 *Supported Languages:*
Explore the full list of supported languages at:
   https://cloud.google.com/translate/docs/languages

🛠 *Note:*
Ensure you use the correct language code for accurate translation.
`.trim();

    let lang = args[0]; 
    let text = args.slice(1).join(' ');

    const supportedLangs = [
      'af', 'ar', 'bg', 'bn', 'ca', 'cs', 'da', 'de', 'el', 'en', 'es', 'fa',
      'fi', 'fr', 'he', 'hi', 'hu', 'id', 'it', 'ja', 'ko', 'ms', 'nl', 'no',
      'pl', 'pt', 'ro', 'ru', 'sv', 'th', 'tr', 'uk', 'vi', 'zh'
    ];

    if (!supportedLangs.includes(lang)) {
      lang = defaultLang;
      text = args.join(' ');
    }
    if (!text && m.quoted && m.quoted.text) text = m.quoted.text;
    if (!text) return reply(usageGuide);

    try {
      const apiUrl = `https://api.siputzx.my.id/api/tools/translate?text=${encodeURIComponent(text)}&source=auto&target=${lang}`;

      const response = await fetch(apiUrl);
      const result = await response.json();

      if (!result.success) throw new Error('Translation failed.');

      reply(result.translatedText);

    } catch (error) {
      console.error('Translation Error:', error);
      reply('An error occurred while translating the text.');
    }
  },
};