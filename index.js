const { Client, GatewayIntentBits, Events } = require('discord.js');
const { Application } = require('handler.djs');
const path = require('node:path')

const client = new Client({ intents: [
    GatewayIntentBits.Guilds, 
    GatewayIntentBits.MessageContent, 
    GatewayIntentBits.GuildMessages
    ] 
});

client.app = new Application({
    client: client,
    commandsPath: path.join(__dirname, "./commands"),
    validationPath: path.join(__dirname, "./validation"),
    owners: ["ownerId"],
});
  
client.app.setPrefix("!");

client.app.setCooldown({
    message: "**{Username}**, Cool down (**{counter}** left)",
    reference: true, 
    long: true, 
    Mdelete: "3s"
});


client.on(Events.ClientReady, () => {
    client.app.build();
    client.app.setData({
        name: "ziad",
        age: 10,
        money: "1000$"
    })
    console.log(`${client.user.tag} is Ready in ${client.guilds.cache.size} Guilds`);
});


client.login(YourToken)