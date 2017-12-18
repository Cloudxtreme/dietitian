"use strict";

const debug = require("debug")("bot-express:skill");

module.exports = class SkillRobotReply {
    constructor(){
        this.clear_context_on_finish = true;
    }

    finish(bot, event, context, resolve, reject){
        debug(`Going to reply "${context.intent.text_response}".`);
        let message = {
            text: context.intent.text_response
        };
        return bot.reply(message).then(
            (response) => {
                return resolve();
            }
        );
    }
}
