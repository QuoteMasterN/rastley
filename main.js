// Library constants
const discord = require('discord.js');
const scraper = require('./scraper.js')
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
    // check if there's a link in the message
    if (message.content.includes('https://')) {
        var content = message.content.toString();
        var startIndex = content.indexOf('https://');
        // Find a better way to do this later
        var endIndex = content.indexOf(' ', startIndex);
        // change endIndex to end of content if there is no ' '
        if (endIndex == -1) {
            endIndex = content.length - 1;
        }
        // search for rickrolls in the link
        if (scraper.searchForRick(content.substring(startIndex, endIndex)) || scraper.searchForRick(content)) {
            // mention the user who posted the rick roll
            message.channel.send("<@"+ message.author.id + '>' + ' https://youtu.be/Ux0YNqhaw0I');
        }
    }
});