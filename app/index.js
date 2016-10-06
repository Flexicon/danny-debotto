// Entry point for discord.io based bot, danny debotto
var Discord = require('discord.io');
var bot = new Discord.Client({
    autorun: true,
    token: "MjMzNTE0OTg0OTYzODMzODU2.CtfMpw.wzclANocmDTHS_j07lbQAAHSy6M"
});

bot.on('ready', function(event) {
    console.log('Logged in as %s - %s\n', bot.username, bot.id);
});

bot.on('message', function(user, userID, channelID, message, event) {
    console.log('message received: '+ message);
    if (message === "!dong") {
        bot.sendMessage({
            to: channelID,
            message: "Oops I dropped my massive condoms, which I use for my MAGNUM DONG!"
        });
    }
});