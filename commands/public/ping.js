const { CommandBuilder, Message } = require('handler.djs');

module.exports = new CommandBuilder()
.setName("ping")
.setAttr("name", "hello")
.setDescription("Test bot response Time")
.setCategory("public")
.setExecution(Execute);

/**
 * @param {Message} message 
*/

async function Execute(message) {
  // message.getAttr();

  // message.getData();
  message.getData()
  console.log(message.getData("name"))
  message.reply({content: "pong"});
};