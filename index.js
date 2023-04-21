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
    // EventsPath: path.join(__dirname, "./events"),
    owners: ["ownerId"],
})
  
client.app.setPrefix("!");

client.app.setCooldown({
    message: "**{Username}**, Cool down (**{counter}** left)",
    reference: true, 
    long: true, 
    Mdelete: "3s"
});

client.on(Events.ClientReady, async () => {
    await client.app.build();
    console.log(`${client.user.tag} is Ready in ${client.guilds.cache.size} Guilds`);
});

client.login("");