module.exports.config = {
  name: "uid",
  version: "2.0.0",
  role: 0,
  credits: "hexa",
  aliases: [],
  description: "get uid from your facebook profile.",
  usages: "[]",
  cooldowns: 0,
  hasPrefix: true,
  dependencies: {}
};

module.exports.run = async ({ api, event }) => {

  const tid = event.threadID;
  const mid = event.messageID;

  const targetUserID = event.type === "message" ? Object.keys(event.mentions).length !== 0 ? Object.keys(event.mentions)[0] : event.senderID : event.messageReply.senderID;

  try {
    const targetUserInfo = await api.getUserInfo(targetUserID);
    const targetUserName = targetUserInfo[targetUserID].name || targetUserInfo[targetUserID].firstName || "Unknown User";
    const targetUserIDString = targetUserID || "Unknown UID";

    await api.sendMessage({
      body: `User Name : \n\n@${targetUserName}\n\nFacebook UID : \n\n${targetUserIDString}`,
      mentions: [{ 
        tag: "@" + targetUserName, 
        id: targetUserID 
      }]
    }, tid, mid);
  } catch (err) {
    console.error(err);
    await api.sendMessage("[ ! ] Failed to retrieve UID.", tid, mid);
  }
}
   