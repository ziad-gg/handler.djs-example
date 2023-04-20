const { CommandBuilder } = require('handler.djs');

module.exports = new CommandBuilder()
.setName("profile")
.setDescription("See user Profile")
.setCooldown("10s")
.setExecution(async function() {

    const { message, client, args } = this;
    const name = message.data.get("name");
    const age = message.data.get("age");
    const money = message.data.get("money");
    
    message.channel.send(`Name is ${name} age is ${age} money ${money}`)
})