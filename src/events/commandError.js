/* eslint-disable no-unused-vars */
const Event = require("../structures/Event");
const { FriendlyError, Command } = require("discord.js-commando");

module.exports = class extends Event {
  constructor(...args) {
    super(...args, {
      once: false
    });
  }

  /**
   * @param {Command} cmd
   * @param {any} err
   * @returns
   */

  run(cmd, err) {
    if (err instanceof FriendlyError) return;
    console.error(`Error in command ${cmd.groupID}:${cmd.memberName}`, err);
  }
};
