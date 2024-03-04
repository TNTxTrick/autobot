module.exports.config = {
    name: "kick",
    version: "1.0.1", 
    role: 1,
    credits: "Mirai Team",
    aliases: [],
    description: "automatically kick out user from the group.",
    usages: "[]",
    cooldowns: 5,
    hasPrefix: true
};

module.exports.run = async function({ api, event }) {
    try {
        const mention = Object.keys(event.mentions);
        if (event.type === 'message_reply') {
            const uid = event.messageReply.senderID;
            setTimeout(() => {
                api.removeUserFromGroup(uid, event.threadID);
            }, 1000);
            return uid;
        }
        let dataThread = (await api.getThreadInfo(event.threadID)).adminIDs;
        if (!dataThread.some(item => item.id == api.getCurrentUserID())) {
            return api.sendMessage("You don't have permission to use this command.", event.threadID, event.messageID);
        }
          
        if (!mention[0]) {
            return api.sendMessage("Tag/reply someone to kick out of this group.", event.threadID, event.messageID);
        }
        if (dataThread.some(item => item.id == event.senderID)) {
            for (const o in mention) {
                setTimeout(() => {
                    api.removeUserFromGroup(mention[o], event.threadID);
                }, 1000);
            }
        }
    } catch (error) {
        console.error(error);
        return api.sendMessage("Error occurred while executing the command.", event.threadID);
    }
}