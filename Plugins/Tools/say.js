const googleTTS = require("google-tts-api"); 

module.exports = {
  command: ['say', 'tts'],
  operate: async ({ m, args, reply, Xploader }) => {
    // Join arguments to form the text
    let text = args.join(" ");

    if (!text) {
      return reply("*Text needed!*"); // Notify the user if no text is provided
    }

    // Limit text to a maximum of 500 characters
    const textTTS = text.substring(0, 500);

    try {
      // Generate the Google TTS audio URL
      const ttsUrl = googleTTS.getAudioUrl(textTTS, {
        lang: "en", // Default language is English
        slow: false, // Fast speech
        host: "https://translate.google.com",
      });

      // Send the audio message
      await Xploader.sendMessage(
        m.chat,
        {
          audio: { url: ttsUrl },
          mimetype: "audio/mp4",
          ptt: true, // Set true for Push-To-Talk format
          fileName: `${textTTS}.mp3`,
        },
        { quoted: m }
      );
    } catch (error) {
      console.error("Error in TTS Command:", error);
      reply("*An error occurred while processing the TTS request.*");
    }
  },
};