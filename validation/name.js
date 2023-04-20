const { Validation } = require('handler.djs');

module.exports = new Validation()
.setCommnads(["ping", "profile"]) 
.setExecution( (message, next) => {
    return next() 
   // else message.reply({content: "stoped"});
})