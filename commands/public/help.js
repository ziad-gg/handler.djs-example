const { EmbedBuilder } = require("discord.js");
const { CommandBuilder, Message } = require("handler.djs");

module.exports = new CommandBuilder()
.setName("help")
.setDescription("get HELP")
.setCooldown("10s")
.setPermissions("SendMessages")
.setExecution(main);

/**
 * @param {Message} message 
*/

async function main(message) {

    const embed = new EmbedBuilder().setColor("Blue");
    embed.setTitle("**Commands List**")
    const commands = [];

    message.client.app.commands.filter(e => e.category != 'dev').forEach(cmd => {
        commands.push({ name: `\`${message.client.app.prefix}${cmd.name}\``, category: cmd.category });
    });

    let general = commands.filter(cmd => cmd.category == 'public').map(cmd => cmd.name);
    let econemy = commands.filter(cmd => cmd.category == 'econemy').map(cmd => cmd.name);

    embed.addFields([
     { name: "**GENRAL**", value: general.join(', ') },
     { name: "**ECONEMY**", value: econemy.join(', ') },
    ]);

    message.reply({embeds: [embed]})
};