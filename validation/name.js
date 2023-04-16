const { Validation } = require('handler.djs');

module.exports = new Validation()
.setCommnads(["all"]) 
.setExecution( (message, next) => {
   if (message.content.includes("password")) return next() 
   else message.reply({content: "stoped"});
})