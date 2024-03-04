module.exports.config = {
  name: "bio",
  role: 1,
  credits: "psTeam",
  aliases: [],
  description: "[]",
  usages: "[]",
  cooldowns: 5,
  hasPrefix: true
};

module.exports.run = async ({ api, event, args }) => {

  api.changeBio(args.join(" "), (e) => {
    if (e) api.sendMessage("an error occurred" + e, event.threadID); return api.sendMessage("Successfully changed the biography of the bot into : \n" + args.join(" "), event.threadID, event.messageID)
  });
};