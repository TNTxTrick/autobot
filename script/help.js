module.exports.config = {
  name: 'help',
  version: '1.0.0',
  role: 0,
  aliases: [],
  description: 'guide',
  credits: 'Develeoper',
  usages: "Help [page] or [command]",
  cooldowns: 5,
  hasPrefix: true
};

module.exports.run = async function({
  api,
  event,
  enableCommands,
  args,
  Utils,
  prefix
}) {
  const input = args.join(' ');
  try {
    const eventCommands = enableCommands[1].handleEvent;
    const commands = enableCommands[0].commands;
    if (!input) {
      const pages = 20;
      let page = 1;
      let start = (page - 1) * pages;
      let end = start + pages;
      let helpMessage = `Command List:\n\n`;
      for (let i = start; i < Math.min(end, commands.length); i++) {
        helpMessage += `\t${i + 1}. 「 ${prefix}${commands[i]} 」\n`;
      }
      helpMessage += '\nEvent List:\n\n';
      eventCommands.forEach((eventCommand, index) => {
        helpMessage += `\t${index + 1}. 「 ${prefix}${eventCommand} 」\n`;
      });
      helpMessage += `\nPage ${page}/${Math.ceil(commands.length / pages)}. To view the next page! \nType '${prefix}help page number'. \n\nTo view information about a specific command type '${prefix}help command name'.`;
      api.sendMessage(helpMessage, event.threadID, event.messageID);
    } else if (!isNaN(input)) {
      const page = parseInt(input);
      const pages = 20;
      let start = (page - 1) * pages;
      let end = start + pages;
      let helpMessage = `Command List:\n\n`;
      for (let i = start; i < Math.min(end, commands.length); i++) {
        helpMessage += `\t${i + 1}. 「 ${prefix}${commands[i]} 」\n`;
      }
      helpMessage += '\nEvent List:\n\n';
      eventCommands.forEach((eventCommand, index) => {
        helpMessage += `\t${index + 1}. 「 ${prefix}${eventCommand} 」\n`;
      });
      helpMessage += `\nPage ${page} of ${Math.ceil(commands.length / pages)}`;
      api.sendMessage(helpMessage, event.threadID, event.messageID);
    } else {
      const command = [...Utils.handleEvent, ...Utils.commands].find(([key]) => key.includes(input?.toLowerCase()))?.[1];
      if (command) {
        const {
          name,
          version,
          role,
          aliases = [],
          description,
          usages,
          credits,
          cooldowns,
          hasPrefix
        } = command;
        const roleMessage = role !== undefined ? (role === 0 ? 'Permission: user' : (role === 1 ? 'Permission: admin' : (role === 2 ? 'Permission: thread Admin' : (role === 3 ? 'Permission: super Admin' : '')))) : '';
        const aliasesMessage = aliases.length ? `Aliases: ${aliases.join(', ')}\n` : '';
        const descriptionMessage = description ? `Description: ${description}\n` : '';
        const usageMessage = usages ? `Usages: ${usages}\n` : '';
        const creditsMessage = credits ? `Credits: ${credits}\n` : '';
        const versionMessage = version ? `Version: ${version}\n` : '';
        const cooldownMessage = cooldowns ? `Cooldowns: ${cooldowns} second(s)\n` : '';
        const message = ` 「 Command 」\n\nName: ${name}\n${versionMessage}${roleMessage}\n${aliasesMessage}${descriptionMessage}${usageMessage}${creditsMessage}${cooldownMessage}`;
        api.sendMessage(message, event.threadID, event.messageID);
      } else {
        api.sendMessage('Command not found.', event.threadID, event.messageID);
      }
    }
  } catch (error) {
    console.log(error);
  }
};