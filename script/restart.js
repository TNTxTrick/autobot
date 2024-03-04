module.exports.config = {
  name: "restart",
  version: "1.0.0",
  role: 1,
  credits: "manhIT",
  aliases: [],
  description: "Restart the system",
  usages: "[]",
  cooldowns: 5,
  hasPrefix: true
};

module.exports.run = async ({ api, event, args }) => {
  const { threadID, messageID } = event;
  return api.sendMessage(`[ OK ] • The bot are now restarting...`, threadID, () => process.exit(1), messageID);
 };