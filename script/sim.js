module.exports.config = {
  name: "sim",
  version: "1,0,0",
  role: 0,
  credits: "Grey",
  aliases: [],
  description: "simsimii",
  usages: "[]",
  cooldowns: 5
};

module.exports.run = async ({ api, event, args }) => {
  api.setMessageReaction("⏳", event.messageID, (err) => {
     }, true);
api.sendTypingIndicator(event.threadID, true);
  const axios = require("axios");
	try {
		let prompt = args.join(" ");
		if (!prompt) {
			return api.sendMessage(`[ ! ] Type a message...`, event.threadID, event.messageID);
		}

		const response = await axios.get(`https://simsimi.fun/api/v2/?mode=talk&lang=en&filter=true&message=$%7BencodeURIComponent(${prompt})%7D%60`);
		const respond = response.data.success;
     setTimeout(function() {
    api.setMessageReaction("✅", event.messageID, (err) => {}, true);
		api.sendMessage(respond, event.threadID, event.messageID);
     }, 5000);
	} catch (error) {
		console.error("An error occurred:", error);
		api.sendMessage("Oops! Something went wrong.", event.threadID, event.messageID);
	}
};
