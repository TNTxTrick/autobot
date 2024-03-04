module.exports.config = {
  name: "tiktokdlv2",
  version: "1.0.0",
  role: 0,
  credits: "libyzxy0",
  aliases: [],
  description: "download a video from tiktok.",
  usages: "[]",
  cooldowns: 0,
  hasPrefix: true,
  dependencies: {}
};

module.exports.run = async function({ api, event, args }) {

  api.setMessageReaction("⏳", event.messageID, (err) => {
     }, true);
  api.sendTypingIndicator(event.threadID, true);

  const { messageID, threadID } = event;
  const fs = require("fs");
  const axios = require("axios");
  const request = require("request");

  const prompt = args.join(" ");
  if (!prompt[0]) {
    api.sendMessage("[ ! ] Input link.", threadID, messageID);
    return;
  }
  
   api.sendMessage("Downloading...", threadID, messageID);

 try {

  const { data } = await axios.get(`https://api.tikdown.click/api?url=${prompt}`);

   const path = __dirname + `/cache/tkdl/tiktokdl.mp4`;
  const file = fs.createWriteStream(path);   
  const url = data.play;

   const userName = data.author.unique_id;
  const userNickname = data.author.nickname;
  const userID = data.author.id;
  const duration = data.duration
  const rqs = request(encodeURI(url));

  rqs.pipe(file);  
  file.on('finish', () => {

    setTimeout(function() {

      api.setMessageReaction("✅", event.messageID, (err) => {
         }, true);

      return api.sendMessage({
        body: `Downloaded Successfull(y). \n\nuserName : \n\n@${userName} \n\nuserNickname : \n\n${userNickname} \n\nuserID : \n\n${userID} \n\nDuration : \n\n${duration}`,
        attachment: fs.createReadStream(path)
      }, threadID);
        }, 5000);
          });
            } catch (err) {
  return api.sendMessage(`error: ${err}`, threadID, messageID);  
  };
};