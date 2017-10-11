"use strict";

// Entry point for discord.io based bot, danny debotto
const Discord = require('discord.io');
const assets = require('./assets');

const bot = new Discord.Client({
	autorun: process.env.AUTORUN || false,
	token: process.env.TOKEN,
	messageCacheLimit: process.env.MESSAGE_CACHE_LIMIT || 5
});
bot.connect();

// Event fires when bot is connected and ready to receive commands
bot.on('ready', function (event) {
	console.log('Logged in as %s - %s\n', bot.username, bot.id);
	bot.setPresence({game: {name: "!dongsupport, beta"}});
});

// Automatic reconnect so it maybe fixes the crashing by just reconnecting??
bot.on('disconnect', function (errMsg, code) {
	console.error("Error Code: " + code);
	console.error("Message: " + errMsg);
	console.log('Disconnected...\nReconnecting...');
	bot.connect();
});

// Event fires when bot detects a new message he is able to read
bot.on('message', function (user, userID, channelID, message, event) {
	if (message[0] === '!' && userID !== bot.id) {
		message = message.split(' ');
		let msg = '',
            serverID = null,
            voiceChannelID = null;

		if (message.length === 1) {
			// No parameter commands
			// --------------------------------------------------------------------------------------------
			switch (message[0]) {
				// !DONGSUPPORT
				case "!dongsupport":
					const cmds = assets.support.commands;
					msg = "The name's deBotto, and I am an expert at delivering the following great commands: \n";
					for (let i in cmds) {
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
					msg = assets.dongs[Math.floor(Math.random() * assets.dongs.length)];
					bot.sendMessage({
						to: channelID,
						message: msg
					});
					break;
					// END !DONG
					// --------------------------------------------------------------------------------------------
					// !RANDONG
				case "!randong":
					// Prevents bot from crashing if command is called in dm chat
					if (!bot.channels[channelID]) {
						break;
					}

					serverID = bot.channels[channelID].guild_id;
					voiceChannelID = bot.servers[serverID].members[userID].voice_channel_id;

                    if (!voiceChannelID) {
						bot.sendMessage({
							to: channelID,
							message: "You're not in any voice chat ya dingus!"
						});
						break;
					}

					const sound = assets.sounds[Math.floor(Math.random() * assets.sounds.length)];
					bot.joinVoiceChannel(voiceChannelID, function (error, events) {
						if (error)
							return console.error(error);

						bot.getAudioContext(voiceChannelID, function (error, stream) {
							if (error)
								return console.error(error);
							fs.createReadStream('assets/sounds/' + sound).pipe(stream, {end: false});

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
					// Prevents bot from crashing if command is called in dm chat
					if (!bot.channels[channelID]) {
					    bot.sendMessage({
                            to: userID,
                            message: 'Not in a DM ya dingus!',
                            typing: true
                        });
						break;
					}

                    serverID = bot.channels[channelID].guild_id;
                    voiceChannelID = bot.servers[serverID].members[userID].voice_channel_id;

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
		} else {
			// Multi parameter commands
			// --------------------------------------------------------------------------------------------
			switch (message[0]) {
				case "!doogle":
					let q = "http://lmgtfy.com/?q=";
					for (let i = 1; i < message.length; i++) {
						q += i < message.length - 1 ? message[i] + '+' : message[i];
					}

					bot.sendMessage({
						to: channelID,
						message: q
					});
					break;
			}
		}
	} // KEKERINO
	else if (message.toLowerCase().indexOf('kek') !== -1 && userID !== bot.id) {
		const msg = assets.keks[Math.floor(Math.random() * assets.keks.length)];
		bot.sendMessage({
			to: channelID,
			message: msg
		});
	}
});
