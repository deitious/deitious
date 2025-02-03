const fs = require('fs');
const axios = require('axios');
const FormData = require('form-data');
const { fromBuffer } = require('file-type');
const path = require('path');

const SESSION_FILE = path.join(__dirname, '../../src/gemini.json');

// Function to load session data
const loadSession = () => {
    if (!fs.existsSync(SESSION_FILE)) {
        fs.writeFileSync(SESSION_FILE, JSON.stringify({}), 'utf-8'); // Create file if it doesn't exist
    }
    return JSON.parse(fs.readFileSync(SESSION_FILE, 'utf-8'));
};

// Function to save session data
const saveSession = (data) => {
    fs.writeFileSync(SESSION_FILE, JSON.stringify(data, null, 2));
};

module.exports = {
    command: ['gemini'],
    operate: async ({ m, text, mime }) => {
        if (!text) return m.reply('Please ask a question');
        
        try {
            // Load session data
            const geminiData = loadSession();
            const userId = m.sender;

            // Initialize user session if not present
            if (!geminiData[userId]) {
                geminiData[userId] = [];
            }

            // Append "Reply in English" to the query
            text += ' (Reply in English)';

            const formData = new FormData();

            if (m.quoted && m.quoted.mimetype && /image|video|audio|application\/pdf/.test(m.quoted.mimetype)) {
                let media = await m.quoted.download();
                const { ext } = await fromBuffer(media);
                const filename = `./tmp/file_${Date.now()}.${ext}`;
                fs.writeFileSync(filename, media);

                formData.append('content', text);
                formData.append('model', 'gemini-1.5-flash');
                formData.append('userId', userId);
                formData.append('file', fs.createReadStream(filename));

                const { data } = await axios.post('https://hydrooo.web.id/', formData, {
                    headers: { ...formData.getHeaders() }
                });

                fs.unlinkSync(filename);
                m.reply(data.result);
            } else {
                formData.append('content', text);
                formData.append('model', 'gemini-1.5-flash');
                formData.append('userId', userId);

                const { data } = await axios.post('https://hydrooo.web.id/', formData, {
                    headers: { ...formData.getHeaders() }
                });

                // Save query and response in session data
                geminiData[userId].push({ query: text, response: data.result });
                saveSession(geminiData);

                m.reply(data.result);
            }
        } catch (err) {
            console.error(err);
            m.reply('An error occurred!');
        }
    }
};