const { CommandBuilder, Message } = require('handler.djs');

module.exports = new CommandBuilder()
.setName("ping")
.setAttr("name", "hello")
.setDescription("Test bot response Time")
.setExecution(Execute);

/**
 * @param {Message} message 
*/

async function Execute(message) {
  console.log(message.command)
  message.command.getAttr()
  console.log(message.command.getAttr("name"))
  message.reply({content: "pong"});
};