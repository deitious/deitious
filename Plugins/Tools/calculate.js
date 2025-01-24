// XPLOADER-BOT by Tylor

module.exports = {
  command: ['calculate', 'calculator'],
  operate: async ({ m, text, prefix, command, reply }) => {
    try {
      let result;

      if (text.includes("+")) {
        const [value_one, value_two] = text.split("+").map(Number);
        result = value_one + value_two;
      } else if (text.includes("-")) {
        const [value_one, value_two] = text.split("-").map(Number);
        result = value_one - value_two;
      } else if (text.includes("×")) {
        const [value_one, value_two] = text.split("×").map(Number);
        result = value_one * value_two;
      } else if (text.includes("÷")) {
        const [value_one, value_two] = text.split("÷").map(Number);
        result = value_one / value_two;
      } else {
        return reply(`*Enter a maths question, Example: ${prefix + command} 1 + 1\n\nAvailable options: +, -, ÷, ×*`);
      }

      reply(`${result}`);
    } catch (error) {
      console.error(error);
      reply('*An error occurred during the calculation.*');
    }
  }
};