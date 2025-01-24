// XPLOADER-BOT by Tylor

module.exports = {
  command: ['truthdetector', 'liedetector'],
  operate: async ({ m, reply }) => {
    if (!m.quoted) return reply(`Please reply to the message you want to detect!`);

    let responses = [
      "That's a blatant lie!",
      "Truth revealed!",
      "Lie alert!",
      "Hard to believe, but true!",
      "Professional liar detected!",
      "Fact-check: TRUE",
      "Busted! That's a lie!",
      "Unbelievable, but FALSE!",
      "Detecting... TRUTH!",
      "Lie detector activated: FALSE!",
      "Surprisingly, TRUE!",
      "My instincts say... LIE!",
      "That's partially true!",
      "Can't verify, try again!",
      "Most likely, TRUE!",
      "Don't believe you!",
      "Surprisingly, FALSE!",
      "Truth!",
      "Honest as a saint!",
      "Deceptive much?",
      "Absolutely true!",
      "Completely false!",
      "Seems truthful.",
      "Not buying it!",
      "You're lying through your teeth!",
      "Hard to believe, but it's true!",
      "I sense honesty.",
      "Falsehood detected!",
      "Totally legit!",
      "Lies, lies, lies!",
      "You can't fool me!",
      "Screams truth!",
      "Fabrication alert!",
      "Spot on!",
      "Fishy story, isn't it?",
      "Unquestionably true!",
      "Pure fiction!"
    ];

    let result = responses[Math.floor(Math.random() * responses.length)];
    let replyText = `*RESULT*: ${result}`;

    await reply(replyText);
  }
};