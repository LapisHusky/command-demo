const config = require('../config.js');
const commandList = require('./list.js');

async function handleCommand(msg) {
    var isCommand = false;
    var commandPrefix;
    config.prefixes.forEach(prefix => {
        if (msg.sentText.startsWith(prefix)) {
            isCommand = true;
            commandPrefix = prefix;
        }
    });
    if (!isCommand) return;
    msg.prefix = commandPrefix;
    var noprefix = msg.sentText.substring(commandPrefix.length);
    msg.noprefix = noprefix;
    var permission = config.admins.includes(msg.senderName) ? 'botdev' : 'default';
    var cmdbase;
    var args;
    if (noprefix.includes(' ')) {
        cmdbase = noprefix.substring(0, noprefix.indexOf(' '));
        args = noprefix.substring(noprefix.indexOf(' ') + 1);
    } else {
        cmdbase = noprefix;
        args = '';
    }
    msg.cmdbase = cmdbase;
    msg.args = args;
    msg.argsSplit = msg.args.split(' ');
    var command = commandList.find(command => {
        if (command.name.toLowerCase() === cmdbase.toLowerCase()) return true;
        if (command.aliases && command.aliases.includes(cmdbase.toLowerCase())) return true;
        return false;
    });
    if (!command) return;
    var commandPermissionLevel = config.permissionLevels.indexOf(command.permission);
    var userPermissionLevel = config.permissionLevels.indexOf(permission);
    if (commandPermissionLevel > userPermissionLevel) return;
    try {
        return await command.eval(msg);
    } catch (err) {
        console.log(err);
        return 'There was an internal error while performing this command.';
    }
}

module.exports = handleCommand;