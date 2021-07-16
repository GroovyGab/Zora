/* eslint-disable no-unused-vars */
const { Command, CommandoMessage } = require("discord.js-commando");
const { MessageEmbed } = require("discord.js");
const { oneLine } = require("common-tags");

module.exports = class RestartCommand extends Command {
  constructor(client) {
    super(client, {
      name: "shutdown",
      memberName: "shutdown",
      group: "botadmin",
      description: "none of your business",
      clientPermissions: [],
      argsType: "multiple",
      ownerOnly: true
    });
  }

  /**
   * @param {CommandoMessage} message
   */

  run(message) {
    this.client.statcord.postCommand(this.name, message.author.id, this.client);
    const RestartEmbed = new MessageEmbed()
      .setTitle("Are you sure you want to shutdown?")
      .setThumbnail(this.client.user.avatarURL())
      .setFooter(
        `${message.author.tag} (${message.author.id})`,
        message.author.avatarURL()
      )
      .setTimestamp()
      .setDescription(
        oneLine`
        This will shut down the bot completely. 
        Do you want to continue? This message will be ignored after 30 seconds.`
      );

    message.channel.send(RestartEmbed).then(async (msg) => {
      msg.react("✅").then(() => msg.react("❌"));

      const filter = (reaction, user) => {
        return (
          ["✅", "❌"].includes(reaction.emoji.name) &&
          user.id === message.author.id
        );
      };

      msg
        .awaitReactions(filter, { max: 1, time: 30000, errors: ["time"] })
        .then(async (collected) => {
          const reaction = collected.first();

          if (reaction.emoji.name === "✅") {
            message.channel.send("Shutting down...").then(() => {
              this.client.destroy();
            });
          } else {
            message.channel.send("Action canceled.");
          }
        })
        .catch((collected) => {
          message.channel.send("Exceeded 30 second threshold.");
        });
    });
  }
};
