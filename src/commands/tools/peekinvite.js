/* eslint-disable no-unused-vars */
const { MessageEmbed } = require("discord.js");
const { Command, CommandoMessage } = require("discord.js-commando");

module.exports = class PeekInviteCommand extends Command {
  constructor(client) {
    super(client, {
      name: "peekinvite",
      memberName: "peekinvite",
      group: "tools",
      description: "test",
      clientPermissions: [],
      argsType: "multiple"
    });
  }

  /**
   * @param {CommandoMessage} message
   * @param {String} args
   */

  async run(message, args) {
    this.client.statcord.postCommand(this.name, message.author.id, this.client);
    if (!args.length) return;
    const InviteGuild = await this.client.fetchInvite(args[0]);

    const GuildInfoEmbed = new MessageEmbed()
      .setTitle(InviteGuild.guild.name)
      .setThumbnail(InviteGuild.guild.iconURL());
    console.log(InviteGuild);

    message.channel.send(GuildInfoEmbed);
  }
};
