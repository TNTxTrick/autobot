module.exports.config = {
  name: "prefix",
  version: "1.0.0",
  role: 0,
  credits: "@itsunknown",
  aliases: [],
  description: "",
  usages: "[]",
  cooldowns: 5,
  hasPrefix: true
};

module.exports.handleEvent = async function({ api, event, prefix }) {
  
  const { threadID, messageID } = event;
  
  const aa = event.body ? event.body.toLowerCase() : "";

  if (aa.indexOf("prefix") === 0) {
    const message = `This is my prefix: [ ${prefix} ]`
    api.sendMessage(message, threadID, messageID);
  }
}

module.exports.run = async({ event, api }) => {};
