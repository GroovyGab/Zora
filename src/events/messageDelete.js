/* eslint-disable no-unused-vars */
const Event = require("../structures/Event");
const { CommandoMessage } = require("discord.js-commando");

module.exports = class extends Event {
  constructor(...args) {
    super(...args, {
      once: false
    });
  }

  /**
   *
   * @param {CommandoMessage} message
   */
  run(message) {
    if (!message.guild) return;
  }
};
