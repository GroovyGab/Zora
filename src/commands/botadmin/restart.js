/* eslint-disable no-unused-vars */
const { Command, CommandoMessage } = require("discord.js-commando");
const { MessageEmbed } = require("discord.js");
const { TOKEN } = require("../../../config");
const { oneLine } = require("common-tags");

module.exports = class RestartCommand extends Command {
  constructor(client) {
    super(client, {
      name: "restart",
      memberName: "restart",
      group: "botadmin",
      description: "none of your business",
      clientPermissions: [],
      argsType: "multiple",
      ownerOnly: true
    });
  }

  /**
   * @param {CommandoMessage} message
   * @param {String} args
   */

  run(message) {
    const RestartEmbed = new MessageEmbed()
      .setTitle("Are you sure you want to restart?")
      .setThumbnail(this.client.user.avatarURL())
      .setDescription(
        oneLine`
        This could affect the user experience and there is a risk that the internal structure of the bot will fail. 
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
        .then((collected) => {
          const reaction = collected.first();

          if (reaction.emoji.name === "✅") {
            message.channel.send(
              "Attempting a restart... (This could take a while)"
            );

            this.client.destroy();
            const hrStart = Date.now();
            this.client.login(TOKEN).then(() => {
              const hrDiff = Date.now();
              const time = hrDiff - hrStart;

              message.channel.send(
                `The reboot has been completed successfully. Took ${
                  time / 1000
                } seconds.`
              );
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
