const { getBuffer } = require('../../lib/myfunc');

module.exports = {
  command: ["truth"],
  operate: async ({ Xploader, m, from }) => {
    const truths = [
      "What's your biggest fear?",
      "Have you ever lied to your best friend?",
      "What's your deepest secret?",
      "Who's your secret crush?",
      "What's the biggest mistake you've ever made?",
      "Have you ever cheated on a test?",
      "What's the most embarrassing thing that's ever happened to you?",
      "Do you have a hidden talent?",
      "What's the biggest lie you've ever told?",
      "Have you ever been in love?",
      "What's the most spontaneous thing you've ever done?",
      "Who's the person you trust most?",
      "What's the biggest risk you've ever taken?",
      "Have you ever regretted something?",
      "What's the most memorable gift you've received?",
      "Have you ever had a crush on someone older?",
      "What's the biggest lesson you've learned?",
      "Have you ever broken someone's heart?",
      "What's the most exciting thing you've done?",
      "Do you believe in soulmates?",
      "What's the biggest challenge you've faced?",
      "Have you ever kept a secret from your parents?",
      "What's the most creative thing you've done?",
      "Have you ever felt betrayed?",
      "What's the biggest adventure you've been on?",
      "Have you ever had a rival?",
      "What's the most thoughtful thing someone's done for you?",
      "Have you ever forgiven someone?",
      "What's the biggest obstacle you've overcome?",
      "Do you believe in karma?",
      "What's the most romantic thing someone's done for you?",
      "Have you ever taken a risk for love?",
      "What's the biggest surprise you've ever received?",
      "Have you ever had a paranormal experience?",
      "What's the most inspiring story you've heard?",
      "Have you ever helped someone in need?",
      "What's the biggest accomplishment you're proud of?",
    ];

    const truthMessage = truths[Math.floor(Math.random() * truths.length)];
    const buffer = await getBuffer('https://i.ibb.co/305yt26/bf84f20635dedd5dde31e7e5b6983ae9.jpg');

    await Xploader.sendMessage(
      from,
      {
        image: buffer,
        caption: `*TRUTH*\n${truthMessage}`,
      },
      { quoted: m }
    );
  },
};