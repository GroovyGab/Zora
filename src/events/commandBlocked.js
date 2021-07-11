/* eslint-disable no-unused-vars */
const Event = require("../structures/Event");
const { oneLine } = require("common-tags");
const { CommandoMessage } = require("discord.js-commando");

module.exports = class extends Event {
  constructor(...args) {
    super(...args, {
      once: false
    });
  }

  /**
   * @param {CommandoMessage} msg
   * @param {String} reason
   */

  run(msg, reason) {
    console.log(oneLine`
			Command ${msg.command ? `${msg.command.groupID}:${msg.command.memberName}` : ""}
			blocked; ${reason}
		`);
  }
};
