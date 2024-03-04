module.exports.config = {
  name: "bes",
  role: 0,
  credits: "hexa",
  aliases: [],
  description: "bes-ai",
  usages: "[]",
  cooldowns: 5,
  hasPrefix: true,
  dependencies: {}
};

module.exports.run = async function({ api, event, args }) {

  api.setMessageReaction("⏳", event.messageID, (err) => { }, true);
  api.sendTypingIndicator(event.threadID, true);

  const axios = require("axios");
  const input = args.join(" ");
  const botID = api.getCurrentUserID();
  const botData = await api.getUserInfo(botID);
  const sender = event.type === "message_reply" ? event.messageReply.senderID : event.senderID;
  const userInfo = await api.getUserInfo(sender);
  const userName = userInfo[sender].name;
  const botName = botData[botID].name;
  const replyMessage = (event.type === "message_reply" && event.messageReply) ? event.messageReply.body : "No reply message available";
  const userMessages = event.type === "message" ? input : `${userName}: ${replyMessage}\n${input}`;   

  if (input.length < 2) {
    const responses = [
      "uy bes bakit miss munanaman ako? 😏",
      "nandito lang ako para sa'yo, bes. 😊",
      "may kailangan ka ba, bes? 😁",
      "kumusta araw mo, bes? 😄",
      "miss mo ba ako, bes? 😅",
      "bakit bes liligawan mona ako? 😨"
    ];
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    api.sendMessage({ body: muiFont(randomResponse) }, event.threadID, event.messageID);
  } else {

    api.sendMessage({ body: muiFont('🔎 Searching...') }, event.threadID, event.messageID);

    try {
      const prompt = `I want you to engage in a conversation with me using colloquial Filipino language, with occasional grammatical errors to make it feel more authentic and adopt the persona of my best friend. Your name is ${botName}.`;

      const response = await axios.get(`https://hercai.onrender.com/v3/hercai?question=${prompt}${input}`);
      const message = response.data.reply;
      setTimeout(function() {
        api.setMessageReaction("✅", event.messageID, (err) => { }, true)
        api.sendMessage({ body: muiFont(message) }, event.threadID, event.messageID);
      }, 20000);
    } catch (error) {
      if (error.response) {
        console.log(error.response.status);
        console.log(error.response.data);
        if (error.response.status == 401 && error.response.data.error.message.startsWith("You didn't provide an API")) {
          api.sendMessage({ body: muiFont("API is missing.") }, event.threadID, event.messageID);
        }
      } else {
        console.log(error.message);
        api.sendMessage({ body: muiFont(error.message) }, event.threadID);
      }
    }
  }
};

function muiFont(text) {
  const fontMui = {
    a: "𝘢",
    b: "𝘣",
    c: "𝘤",
    d: "𝘥",
    e: "𝘦",
    f: "𝘧",
    g: "𝘨",
    h: "𝘩",
    i: "𝘪",
    j: "𝘫",
    k: "𝘬",
    l: "𝘭",
    m: "𝘮",
    n: "𝘯",
    o: "𝘰",
    p: "𝘱",
    q: "𝘲",
    r: "𝘳",
    s: "𝘴",
    t: "𝘵",
    u: "𝘶",
    v: "𝘷",
    w: "𝘸",
    x: "𝘹",
    y: "𝘺",
    z: "𝘻",
    A: "𝘈",
    B: "𝘉",
    C: "𝘊",
    D: "𝘋",
    E: "𝘌",
    F: "𝘍",
    G: "𝘎",
    H: "𝘏",
    I: "𝘐",
    J: "𝘑",
    K: "𝘒",
    L: "𝘓",
    M: "𝘔",
    N: "𝘕",
    O: "𝘖",
    P: "𝘗",
    Q: "𝘘",
    R: "𝘙",
    S: "𝘚",
    T: "𝘛",
    U: "𝘜",
    V: "𝘝",
    W: "𝘞",
    X: "𝘟",
    Y: "𝘠",
    Z: "𝘡"
  }

  let formattedFont = "";
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    formattedFont += fontMui[char] || char;
  }
  return formattedFont;
}