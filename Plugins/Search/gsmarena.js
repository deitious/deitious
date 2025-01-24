// XPLOADER BOT by Tylor

const fetch = require('node-fetch');

module.exports = {
  command: ['gsmarena'],
  operate: async ({ Xploader, m, reply, text }) => {
    if (!text) return reply("Please provide a phone model name.");

    try {
      let response = await fetch(`https://api.tioo.eu.org/gsmarena?text=${encodeURIComponent(text)}`);
      let data = await response.json();

      if (!data.hasil) return reply("Failed to fetch phone specifications. Please try again.");

      let phone = data.hasil;
      let specs = phone.specifications;

      let phoneMessage = `
📱 *Phone Specifications* 📱
===========================
*Name*: ${phone.name}
*URL*: [Click here](${phone.url})
*Price*: ${specs.price || 'N/A'}

*Specifications*:
- **Network**:
  - Technology: ${specs.network?.technology || 'N/A'}
  - 2G Bands: ${specs.network?.bands2g || 'N/A'}
  - 3G Bands: ${specs.network?.bands3g || 'N/A'}
  - 4G Bands: ${specs.network?.bands4g || 'N/A'}
  - Speed: ${specs.network?.speed || 'N/A'}

- **Platform**:
  - Chipset: ${specs.platform?.chipset || 'N/A'}
  - CPU: ${specs.platform?.cpu || 'N/A'}
  - GPU: ${specs.platform?.gpu || 'N/A'}
  - OS: ${specs.platform?.os || 'N/A'}

- **Body**:
  - Dimensions: ${specs.body?.dimensions || 'N/A'}
  - Weight: ${specs.body?.weight || 'N/A'}
  - Build: ${specs.body?.build || 'N/A'}
  - SIM: ${specs.body?.sim || 'N/A'}

- **Display**:
  - Type: ${specs.display?.type || 'N/A'}
  - Size: ${specs.display?.size || 'N/A'}
  - Resolution: ${specs.display?.resolution || 'N/A'}

- **Memory**:
  - Card Slot: ${specs.memory?.cardSlot || 'N/A'}
  - Internal: ${specs.memory?.internal || 'N/A'}

- **Main Camera**:
  - Single: ${specs.mainCamera?.single || 'N/A'}
  - Double: ${specs.mainCamera?.double || 'N/A'}
  - Triple: ${specs.mainCamera?.triple || 'N/A'}
  - Features: ${specs.mainCamera?.features || 'N/A'}
  - Video: ${specs.mainCamera?.video || 'N/A'}

- **Battery**:
  - Type: ${specs.battery?.type || 'N/A'}
  - Charging: ${specs.battery?.charging || 'N/A'}

- **Sound**:
  - Loudspeaker: ${specs.sound?.loudspeaker || 'N/A'}
  - Jack: ${specs.sound?.jack || 'N/A'}

- **Comms**:
  - WLAN: ${specs.comms?.wlan || 'N/A'}
  - Bluetooth: ${specs.comms?.bluetooth || 'N/A'}
  - Positioning: ${specs.comms?.positioning || 'N/A'}
  - NFC: ${specs.comms?.nfc || 'N/A'}
  - Radio: ${specs.comms?.radio || 'N/A'}
  - USB: ${specs.comms?.usb || 'N/A'}

- **Sensors**: ${specs.features?.sensors || 'N/A'}
- **Colors**: ${specs.colors?.join(", ") || 'N/A'}
- **Models**: ${specs.models || 'N/A'}

For more details, visit: [GSMArena](${phone.url})
      `;

      // Send the phone specifications with an image
      await Xploader.sendMessage(m.chat, {
        image: { url: phone.image },
        caption: phoneMessage.trim()
      }, { quoted: m });

    } catch (error) {
      console.error('Error fetching phone specifications:', error);
      reply("An error occurred while fetching phone specifications.");
    }
  }
};