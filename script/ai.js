module.exports.config = {
  name: "ai",
  version: "1.0.0",
  role: 0,
  credits: "deku",
  aliases: [],
  description: "gogpt",
  usages: "[]",
  cooldowns: 5,
  hasPrefix: true
};

module.exports.run = async function({ api, event, args }) {
  api.setMessageReaction("⏳", event.messageID, (err) => {}, true);
  api.sendTypingIndicator(event.threadID, true);
 const wm = `\n\nThe bot is under developed by Bundas Andrian. \n\nDon't forget to follow : \n\nhttps://facebook.com/100037363620456 \n\nThank you.`;
 const { threadID, messageID } = event;
 const b = require('axios');
 let prompt = args.join(" ");
 if (!prompt){ return api.sendMessage("[ ! ] Type a message...", threadID, messageID)
}
api.sendMessage(`🔍 Searching... \n\nQuestion : \n\n${prompt}`, threadID, messageID);
  const res = await b.get(`https://openaikey.onrender.com/api?prompt=${prompt}`);
let resu = res.data.response;
  setTimeout(function() {
    api.setMessageReaction("✅", event.messageID, (err) => {}, true);
    api.sendMessage(resu + wm, threadID, messageID);
}, 20000);
  }
