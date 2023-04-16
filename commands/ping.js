const { Command } = require('handler.djs');

module.exports = new Command()
.setName("ping")
.setDescription("Test bot response Time")
.setCategory("auto")
.setExecution(async function() {
    const { message, client, args } = this;
    message.reply({content: "pong"});
})