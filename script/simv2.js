module.exports.config = {
  name: "simv2",
  version: "1.0.0",
  role: 0,
  credits: "Yan",
  aliases: [],
  description: "Engage in conversation with simv2! Experience some similarities with Simsimii",
  usages: "[]",
  cooldowns: 5
};

module.exports.run = async ({ api, event, args, Utils }) => {
  api.setMessageReaction("⏳", event.messageID, (err) => {}, true);
  api.sendTypingIndicator(event.threadID, true);
    
  const fs = require("fs");
  const { messageID, threadID, senderID } = event;
  const content = args.join(" ");
  if (!args[0]) return api.sendMessage("[ ! ] Type a message...", threadID, messageID);

  try {
    const jsonFile = fs.readFileSync(__dirname + "/cache/itsunknown/itsunknown.json", "utf-8");
    const responses = JSON.parse(jsonFile);
    let respond = responses[content.toLowerCase()];

    if (content.startsWith("=> ")) {
      const switchCase = content.substring(6).toLowerCase();
      if (!Utils.config.admin.includes(senderID)) {
        respond = "You are not authorized to use the add function.";
      } else {
        if (switchCase === "on") {
          respond = "Add function activated.";
          if (typeof Utils.config.ADD_FUNCTION !== "undefined")
            Utils.config.ADD_FUNCTION = true;
          else
            console.log("Having some error on getting JSON");
        } else if (switchCase === "off") {
          respond = "Add function deactivated.";
          if (typeof Utils.config.ADD_FUNCTION !== "undefined")
            Utils.config.ADD_FUNCTION = false;
          else
            console.log("Having some error on getting JSON");
        }
      }
    } else if (content.startsWith("<= ")) {
      const switchCase = content.substring(6).toLowerCase();
      if (!Utils.config.admin.includes(senderID)) {
        respond = "You are not authorized to use the delete function.";
      } else {
        if (switchCase === "on") {
          respond = "Delete function activated. You can now delete words and responses";
          if (typeof Utils.config.DEL_FUNCTION !== "undefined")
            Utils.config.DEL_FUNCTION = true;
          else
            console.log("Having some error on getting JSON");
        } else if (switchCase === "off") {
          respond = "Delete function deactivated.";
          if (typeof Utils.config.DEL_FUNCTION !== "undefined")
            Utils.config.DEL_FUNCTION = false;
          else
            console.log("Having some error on getting JSON");
        }
      }
    } else if (content.includes("<=")) {
      const [word, response] = content.split("<=").map((item) => item.trim());
      const lowercaseWord = word.toLowerCase();
      if (!Utils.config[0].DEL_FUNCTION) {
        respond = "Delete function is currently deactivated.";
      } else {
        if (responses[lowercaseWord]) {
          if (response) {
            const index = responses[lowercaseWord].indexOf(response);
            if (index !== -1) {
              responses[lowercaseWord].splice(index, 1);
              if (responses[lowercaseWord].length === 0) {
                delete responses[lowercaseWord];
              }
              fs.writeFileSync(__dirname + "/cache/itsunknown/itsunknown.json", JSON.stringify(responses, null, 4), "utf-8");
              respond = `Successfully deleted the response "${response}" from the word "${word}"`;
            } else {
              respond = `The response "${response}" does not exist in the word "${word}"`;
            }
          } else {
            delete responses[lowercaseWord];
            fs.writeFileSync(__dirname + "/cache/itsunknown/itsunknown.json", JSON.stringify(responses, null, 4), "utf-8");
            respond = `Successfully deleted the entire responses inside the word "${word}"`;
          }
        } else {
          respond = `The word "${word}" does not exist in the responses`;
        }
      }
    } else if (content.includes("=>")) {
      const [word, ...responseArray] = content.split("=>").map((item) => item.trim());

      const response = responseArray.join("=>").trim();
      if (!Utils.config.ADD_FUNCTION) {
        respond = "Add function is currently deactivated.";
      } else {
        if (word && response) {
          const lowercaseWord = word.toLowerCase();
          if (responses[lowercaseWord]) {
            if (!responses[lowercaseWord].includes(response)) {
              responses[lowercaseWord].push(response);
            }
          } else {
            responses[lowercaseWord] = [response];
          }
          fs.writeFileSync(__dirname + "/cache/itsunknown/itsunknown.json", JSON.stringify(responses, null, 4), "utf-8");
          respond = `Successfully added "${word}" as a new word with the response: "${response}"`;
        }
      }
    }

    if (Array.isArray(respond)) {
      const randomIndex = Math.floor(Math.random() * respond.length);
      respond = respond[randomIndex];
    } else if (!respond) {
      respond = "I don't have a response for that yet, but I'd really appreciate it if you could teach me.";
    }

      setTimeout(function() {
    api.sendMessage(respond, threadID, (error, info) => {
      if (error) {
        console.error(error);
      }
    }, messageID);
  }, 5000);
 } catch (error) {
    console.error(error);
    api.sendMessage("An error occurred while processing the request.", threadID, messageID);
  }
};

