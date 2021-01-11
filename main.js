// Library constants
const discord = require('discord.js');
const axios = require('axios').default;
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

