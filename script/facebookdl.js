module.exports.config = {
  name: 'facebookdl',
  version: '1.0.0',
  role: 0,
  credits: 'rickciel',
  aliases: [],
  description: 'download a video from facebook.',
  usages: '[]',
  cooldowns: 5,
  hasPrefix: true
};

const { promisify } = require('util');

const axios = require('axios');
const fs = require('fs');
    
const unlinkAsync = promisify(fs.unlink);

module.exports.run = async function ({ api, event, args }) {

  api.setMessageReaction("⏳", event.messageID, (err) => {}, true);
  api.sendTypingIndicator(event.threadID, true);

  const { threadID, messageID } = event;
 
  if (args.length === 0) {
    await api.sendMessage('[ ! ] Input link.', threadID, messageID);
    return;
  }

  const videoURL = args[0];

  try {
    const response = await axios.get(`https://scp-09.onrender.com/api/fbdl?url=${encodeURIComponent(videoURL)}`);
   const data = response.data;

    if (data.success) {
    
   api.sendMessage('Downloading...', threadID, (err, info) =>

   setTimeout(() => {
    api.unsendMessage(info.messageID) 
  }, 10000), messageID);

    const highQualityLink = data.links['Download High Quality'];

    const videoBuffer = await axios.get(highQualityLink, { responseType: 'arraybuffer' });
    const videoFileName = __dirname + `/cache/facebookdl/${Date.now()}.mp4`;

      await fs.promises.writeFile(videoFileName, videoBuffer.data);
      const videoStream = fs.createReadStream(videoFileName);

      api.setMessageReaction("✅", event.messageID, (err) => {}, true);

      await api.sendMessage({ body: `Downloaded Successfull(y).`, attachment: videoStream }, threadID);
      await unlinkAsync(videoFileName); // Delete the temporary video file

    } else {
      await api.sendMessage('Failed to retrieve the video.', threadID);
    }
  } catch (error) {
    console.error(error);
    await api.sendMessage('An error occurred while processing your request.', threadID);
  }
};
