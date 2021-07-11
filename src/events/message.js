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
  async run(message) {
    // if (message.author.id === "850158276247158816") {
    //   await message.react("🇬");
    //   await message.react("🇦");
    //   await message.react("🇾");
    // }
  }
};
