"use strict";

// Entry point for discord.io based bot, danny debotto
var Discord = require('discord.io');
var bot = new Discord.Client({
    autorun: true,
    token: "MjMzNTE0OTg0OTYzODMzODU2.CtfMpw.wzclANocmDTHS_j07lbQAAHSy6M",
    messageCacheLimit: 5
});

// Load dongsupport json
var fs = require('fs');
var support = null;
fs.readFile('app/support.json', 'utf8', function (err, data) {
    if (err) throw err;
    support = JSON.parse(data);
    console.log('json parsed');
});

// Load sound filenames
var sounds = null;
fs.readdir('app/sounds/', function (err, files) {
    if (err) throw err;
    sounds = files;
    console.log('sounds loaded');
});

// Event fires when bot is connected and ready to receive commands
bot.on('ready', function(event) {
    console.log('Logged in as %s - %s\n', bot.username, bot.id);
    bot.setPresence({game: { name: "!dongsupport, beta" }});
});

// Event fires when bot detects a new message he is able to read
bot.on('message', function(user, userID, channelID, message, event) {
    if (message[0] === '!' && userID !== bot.id) {
	switch(message) {
	// !DONGSUPPORT
	    case "!dongsupport":
		var cmds = support.commands;
		var msg = "The name's deBott, and I am an expert at delivering the following great commands: \n";
		for(var i in cmds) {
		    msg += "**" + cmds[i].command + "**: " + cmds[i].desc + "\n";
		}
		bot.sendMessage({
		    to: channelID,
		    message: msg
		});
		break;
	// END !DONGSUPPORT
	// --------------------------------------------------------------------------------------------
	// !DONG
	    case "!dong":
		bot.sendMessage({
		    to: channelID,
		    message: "Oops I dropped my monster condoms, which I use for my MAGNUM DONG!"
		});
		break;
	// END !DONG
	// --------------------------------------------------------------------------------------------
	// !RANDONG
	    case "!randong":
		var sound = sounds[Math.floor(Math.random() * sounds.length)];
		var serverID = bot.channels[channelID].guild_id;
		var voiceChannelID = bot.servers[serverID].members[userID].voice_channel_id;
		bot.joinVoiceChannel(voiceChannelID, function(error, events) {
		    if (error) return console.error(error);

		    bot.getAudioContext(voiceChannelID, function (error, stream) {
			if (error) return console.error(error);
			fs.createReadStream('app/sounds/' + sound).pipe(stream, {end: false});

			//The stream fires `done` when it's got nothing else to send to Discord.
			stream.on('done', function () {
			    bot.leaveVoiceChannel(voiceChannelID);
			});
		    });
		});
		break;
	// END !RANDONG
	// --------------------------------------------------------------------------------------------
	// !LEAVE
	    case "!leave":
		var serverID = bot.channels[channelID].guild_id;
		var voiceChannelID = bot.servers[serverID].members[userID].voice_channel_id;
		bot.leaveVoiceChannel(voiceChannelID);
		break;
	// END !LEAVE
	// --------------------------------------------------------------------------------------------
	// !GOHOME
	    case "!gohome":
		bot.sendMessage({
		    to: channelID,
		    message: "See yeah losers!"
		});
		bot.disconnect();
		break;
	// END !GOHOME
	}
    }
});