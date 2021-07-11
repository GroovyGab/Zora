/* eslint-disable no-unused-vars */
const Event = require("../structures/Event");
const { oneLine } = require("common-tags");
const { CommandoGuild, Command } = require("discord.js-commando");

module.exports = class extends Event {
  constructor(...args) {
    super(...args, {
      once: false
    });
  }

  /**
   * @param {CommandoGuild} guild
   * @param {Command} command
   * @param {boolean} enabled
   */
  
  run(guild, command, enabled) {
    console.log(oneLine`
    Command ${command.groupID}:${command.memberName}
    ${enabled ? "enabled" : "disabled"}
    ${guild ? `in guild ${guild.name} (${guild.id})` : "globally"}.
  `);
  }
};
