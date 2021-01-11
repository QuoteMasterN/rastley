import searchForRick from "scraper.js"

// Library constants
const discord = require('discord.js');
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

// discord client for the bot
const client = new discord.Client();

// bot token
var token;

// get bot token
readline.question('Enter bot token:', input => {
    token = input;
    readline.close();
    // login to discord
    client.login(token);
});

client.once('ready', () => {
    console.log('Rastley is online!');
});

client.on('message', message => {
    // return if message 
    if (message.author.bot) return;
    // check if message includes a rick roll in it
    if (message.attachments.size > 0) {
        for (attachment in message.attachments.array) {
            if (searchForRick(attachment.url)) {
                message.channel.send('https://youtu.be/Ux0YNqhaw0I')
            }
        }
    }
})