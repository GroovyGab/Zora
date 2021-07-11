/* eslint-disable no-unused-vars */
const Event = require("../structures/Event");
const { oneLine } = require("common-tags");
const { CommandoGuild } = require("discord.js-commando");

module.exports = class extends Event {
  constructor(...args) {
    super(...args, {
      once: false
    });
  }

  /**
   * @param {CommandoGuild} guild
   * @param {String} prefix
   */

  run(guild, prefix) {
    console.log(oneLine`
    Prefix ${
      prefix === "" ? "removed" : `changed to ${prefix || "the default"}`
    }
    ${guild ? `in guild ${guild.name} (${guild.id})` : "globally"}.
`);
  }
};
