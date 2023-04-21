const { CommandBuilder, Message } = require("handler.djs");
const { EmbedBuilder } = require("discord.js");
const database = require('../../sql');

module.exports = new CommandBuilder()
.setName("coins")
.setCooldown("10s")
.setDescription("Know you Current Balance")
.setExecution(Execute)

/**
 * 
 * @param {Message} message 
 */

async function Execute(message) {
  const User = await database.getUser(message.author.id, message.guild.id) ?? 
               await database.addUser(message.author.id, message.guild.id, message.author.tag, 0);
  const Embed = new EmbedBuilder().setColor('DarkButNotBlack').setTitle(`Your Current Balance is ${User.Coins}$`);
  message.reply({embeds: [Embed]});
};