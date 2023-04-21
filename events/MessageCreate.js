const { Events, Message, EmbedBuilder } = require('discord.js')
const { EventBuilder } = require('handler.djs');

module.exports = new EventBuilder()
.setEvent(Events.MessageCreate)
.setExecution(Execute)

/** 
 * @param {Message} message 
*/

async function Execute(message) {

 if (message.channel.id !== "1098778433846255647") return;
 if (message.author.bot) return;
 
 const Embed = new EmbedBuilder()
 .setColor("Random")
 .setTitle(message.content)

 await message.delete().catch(e => 404);
 message.channel.send({embeds: [Embed]}).then(m => {
    m.react("✅");
    m.react("❌");
 })
}