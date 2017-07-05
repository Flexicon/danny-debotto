"use strict";

// Entry point for discord.io based bot, danny debotto
var Discord = require('discord.io');
var bot = new Discord.Client({
	autorun: false,
	token: "MjMzNTE0OTg0OTYzODMzODU2.CtfMpw.wzclANocmDTHS_j07lbQAAHSy6M",
	messageCacheLimit: 5
});
bot.connect();

// Load dongsupport json
var fs = require('fs');
var support = null;
fs.readFile('assets/support.json', 'utf8', function (err, data) {
	if (err)
		throw err;
	support = JSON.parse(data);
	console.log('json parsed');
});

// Load sound filenames
var sounds = null;
fs.readdir('assets/sounds/', function (err, files) {
	if (err)
		throw err;
	sounds = files;
	console.log('sounds loaded');
});

// Dong responses
var dongs = [
	"Ohh whoops ooh... I dropped my monster condom, that I use for my MAGNUM DONG!",
	"http://i.imgur.com/ueLDY8u.jpg",
	"http://s2.quickmeme.com/img/01/01bce94521ab10aef394ed4521271b9b868f2c310997d3b7928d15267095eb10.jpg",
	"https://i.imgflip.com/18iruo.jpg",
	"https://img.ifcdn.com/images/5435413eb358630b61129821ba9a35c98eb1b81c7cd415eaf9d8dd689515feb2_3.jpg",
	"http://66.media.tumblr.com/6e50ed9a00131c7e8e73a50ce7198840/tumblr_o5c8quk2of1uy57v5o1_1280.jpg",
	"https://i.ytimg.com/vi/B6AZryW6Vlk/maxresdefault.jpg",
	"https://66.media.tumblr.com/cd0a5db038f684087200b476e6292d08/tumblr_o5qyhkbQNv1vqutcko1_500.jpg"
];

// Many Keks
var keks = [
	"http://i2.kym-cdn.com/photos/images/newsfeed/001/111/422/7a9.jpg",
	"http://i3.kym-cdn.com/photos/images/original/001/023/759/257.jpg",
	"http://i0.kym-cdn.com/photos/images/masonry/001/023/762/343.jpg",
	"http://i.imgur.com/o50ZXMb.png",
	"http://i.imgur.com/54Zofhc.png",
	"http://i.imgur.com/j8qqccK.png",
	"http://i.imgur.com/iUIaETV.png"
];

// Event fires when bot is connected and ready to receive commands
bot.on('ready', function (event) {
	console.log('Logged in as %s - %s\n', bot.username, bot.id);
	bot.setPresence({game: {name: "!dongsupport, beta"}});
});

// Automatic reconnect so it maybe fixes the crashing by just reconnecting??
bot.on('disconnect', function (errMsg, code) {
	console.log("Error Code: " + code);
	console.log('Disconnected...\nReconnecting...');
	bot.connect();
});

// Event fires when bot detects a new message he is able to read
bot.on('message', function (user, userID, channelID, message, event) {
	if (message[0] === '!' && userID !== bot.id) {
		var message = message.split(' ');

		if (message.length === 1) {
			// No parameter commands
			// --------------------------------------------------------------------------------------------
			switch (message[0]) {
				// !DONGSUPPORT
				case "!dongsupport":
					var cmds = support.commands;
					var msg = "The name's deBotto, and I am an expert at delivering the following great commands: \n";
					for (var i in cmds) {
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
					var msg = dongs[Math.floor(Math.random() * dongs.length)];
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
					var serverID = bot.channels[channelID].guild_id;
					var voiceChannelID = bot.servers[serverID].members[userID].voice_channel_id;
					if (!voiceChannelID) {
						bot.sendMessage({
							to: channelID,
							message: "You're not in any voice chat ya dingus!"
						});
						break;
					}
					var sound = sounds[Math.floor(Math.random() * sounds.length)];
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
						break;
					}
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
		} else {
			// Multi parameter commands
			// --------------------------------------------------------------------------------------------
			switch (message[0]) {
				case "!doogle":
					var q = "http://lmgtfy.com/?q=";
					for (var i = 1; i < message.length; i++) {
						q += i < message.length - 1 ? message[i] + '+' : message[i];
					}

					bot.sendMessage({
						to: channelID,
						message: q
					});
					break;
			}
		}
	}
	// KEKERINO
	else if (message.toLowerCase().indexOf('kek') !== -1 && userID !== bot.id) {
		var msg = keks[Math.floor(Math.random() * keks.length)];
		bot.sendMessage({
			to: channelID,
			message: msg
		});
	}
});
