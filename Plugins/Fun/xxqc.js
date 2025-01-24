// XPLOADER BOT by Tylor

const axios = require('axios');

module.exports = {
  command: ['xxqc'],
  operate: async ({ Xploader, m, reply, prefix, command, text }) => {
    if (!text) {
      return reply(`📌Example: ${prefix + command} pink hello\n\n꒰ 🖌️ Color List ꒱ ೄྀ࿐ ˊˎ-\n━━━━━━⊱⋆⊰━━━━━━\npink\nblue\nred\ngreen\nyellow\npurple\ndarkblue\nlightblue\nash\norange\nblack\nwhite\nteal\nlightpink\nchocolate\nsalmon\nmagenta\ntan\nwheat\ndeeppink\nfire\nskyblue\nbrightskyblue\nhotpink\nlightskyblue\nseagreen\ndarkred\norangered\ncyan\nviolet\nmossgreen\ndarkgreen\nnavyblue\ndarkorange\ndarkpurple\nfuchsia\ndarkmagenta\ndarkgray\npeachpuff\nblackishgreen\ndarkishred\ngoldenrod\ndarkishgray\ndarkishpurple\ngold\nsilver`);
    }
    
    if (text.length > 100) return reply(`Max 100 characters.`);

    let [color, ...message] = text.split(" ");
    message = message.join(" ");
    
    const colorMap = {
      "pink": "#f68ac9",
      "blue": "#6cace4",
      "red": "#f44336",
      "green": "#4caf50",
      "yellow": "#ffeb3b",
      "purple": "#9c27b0",
      "darkblue": "#0d47a1",
      "lightblue": "#03a9f4",
      "ash": "#9e9e9e",
      "orange": "#ff9800",
      "black": "#000000",
      "white": "#ffffff",
      "teal": "#008080",
      "lightpink": "#FFC0CB",
      "chocolate": "#A52A2A",
      "salmon": "#FFA07A",
      "magenta": "#FF00FF",
      "tan": "#D2B48C",
      "wheat": "#F5DEB3",
      "deeppink": "#FF1493",
      "fire": "#B22222",
      "skyblue": "#00BFFF",
      "brightskyblue": "#1E90FF",
      "hotpink": "#FF69B4",
      "lightskyblue": "#87CEEB",
      "seagreen": "#20B2AA",
      "darkred": "#8B0000",
      "orangered": "#FF4500",
      "cyan": "#48D1CC",
      "violet": "#BA55D3",
      "mossgreen": "#00FF7F",
      "darkgreen": "#008000",
      "navyblue": "#191970",
      "darkorange": "#FF8C00",
      "darkpurple": "#9400D3",
      "fuchsia": "#FF00FF",
      "darkmagenta": "#8B008B",
      "darkgray": "#2F4F4F",
      "peachpuff": "#FFDAB9",
      "darkishgreen": "#BDB76B",
      "darkishred": "#DC143C",
      "goldenrod": "#DAA520",
      "darkishgray": "#696969",
      "darkishpurple": "#483D8B",
      "gold": "#FFD700",
      "silver": "#C0C0C0"
    };

    const backgroundColor = colorMap[color.toLowerCase()];

    if (!backgroundColor) return reply("The selected color is not available.");

    const pushname = await Xploader.getName(m.sender);
    const profilePic = await Xploader.profilePictureUrl(m.sender, "image").catch(() => "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60");

    let obj = {
      type: "quote",
      format: "png",
      backgroundColor,
      width: 512,
      height: 768,
      scale: 2,
      messages: [
        {
          entities: [],
          avatar: true,
          from: {
            id: 1,
            name: pushname,
            photo: { url: profilePic }
          },
          text: message,
          replyMessage: {}
        }
      ]
    };
    
    try {
      let response = await axios.post("https://bot.lyo.su/quote/generate", obj, { headers: { "Content-Type": "application/json" } });
      let buffer = Buffer.from(response.data.result.image, "base64");
      
      Xploader.sendImageAsSticker(m.chat, buffer, m, {
        packname: `${global.packname}`,
        author: `${global.author}`,
      });
    } catch (error) {
      console.error('Error generating quote:', error);
      reply("An error occurred while generating the quote.");
    }
  }
};