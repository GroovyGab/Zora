/* eslint-disable no-unused-vars */
const Event = require("../structures/Event");
const { oneLine } = require("common-tags");
const { CommandGroup, CommandoGuild } = require("discord.js-commando");

module.exports = class extends Event {
  constructor(...args) {
    super(...args, {
      once: false
    });
  }

  /**
   * @param {CommandoGuild} guild
   * @param {CommandGroup} group
   * @param {boolean} enabled
   */

  run(guild, group, enabled) {
    console.log(oneLine`
			Group ${group.id}
			${enabled ? "enabled" : "disabled"}
			${guild ? `in guild ${guild.name} (${guild.id})` : "globally"}.
		`);
  }
};
